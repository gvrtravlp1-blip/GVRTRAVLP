// Vercel Serverless Function — adapts TanStack Start's fetch-based server for Vercel
import { Readable } from 'node:stream';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

let serverMod;

async function getServer() {
  if (serverMod) return serverMod;
  // In Vercel serverless, dist/server is included via `includeFiles`
  const serverPath = join(process.cwd(), 'dist', 'server', 'server.js');
  serverMod = await import(serverPath);
  return serverMod;
}

export default async function handler(req, res) {
  // Build a standard Request from Node's IncomingMessage
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const url = new URL(req.url, `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
  }

  let body = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    body = Buffer.concat(chunks);
  }

  const request = new Request(url.toString(), {
    method: req.method,
    headers,
    body,
  });

  try {
    const mod = await getServer();
    const server = mod.default;
    const response = await server.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      const reader = response.body.getReader();
      const push = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) { res.end(); break; }
          res.write(value);
        }
      };
      await push();
    } else {
      const text = await response.text();
      res.end(text);
    }
  } catch (error) {
    console.error('SSR Error:', error);
    res.statusCode = 500;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end(`<!doctype html><html><head><title>Error</title></head><body><h1>Something went wrong</h1><p>Please try again.</p></body></html>`);
  }
}
