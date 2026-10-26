// Orbit local server: serves index.html and relays the film-writing request to the Anthropic API.
// Needs Node 18+ and ANTHROPIC_API_KEY. No npm packages.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8080);
const MODEL = process.env.ORBIT_MODEL || 'claude-sonnet-5-5';
const KEY = process.env.ANTHROPIC_API_KEY;

const send = (res, code, body, type = 'application/json') => { res.writeHead(code, { 'content-type': type }); res.end(typeof body === 'string' ? body : JSON.stringify(body)); };

http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) return send(res, 200, await readFile(join(here, 'index.html')), 'text/html; charset=utf-8');
    if (req.method === 'GET' && req.url === '/api/health') return send(res, 200, { ok: true, model: MODEL, key: !!KEY });
    if (req.method === 'POST' && req.url === '/api/generate') {
      if (!KEY) return send(res, 500, { error: 'ANTHROPIC_API_KEY is not set. Set it and restart the server.' });
      let raw = ''; for await (const c of req) { raw += c; if (raw.length > 262144) return send(res, 413, { error: 'Request too large.' }); }
      const { prompt } = JSON.parse(raw || '{}');
      if (!prompt || typeof prompt !== 'string') return send(res, 400, { error: 'Missing prompt.' });
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model: MODEL, max_tokens: 8000, messages: [{ role: 'user', content: prompt }] })
      });
      const j = await r.json();
      if (!r.ok) return send(res, r.status, { error: j?.error?.message || 'Anthropic API error ' + r.status });
      return send(res, 200, { text: (j.content || []).filter(b => b.type === 'text').map(b => b.text).join('') });
    }
    send(res, 404, { error: 'Not found' });
  } catch (e) { send(res, 500, { error: String(e?.message || e) }); }
}).listen(PORT, '127.0.0.1', () => console.log(`Orbit is running at http://localhost:${PORT}  (model ${MODEL}${KEY ? '' : ', WARNING: ANTHROPIC_API_KEY not set'})`));
