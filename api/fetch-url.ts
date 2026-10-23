import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lookup } from 'node:dns/promises';
import net from 'node:net';

const isPrivateIp = (ip: string) =>
  net.isIPv4(ip)
    ? /^(10\.|127\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip)
    : /^(::1|fc|fd|fe80)/i.test(ip);

async function assertSafe(raw: string): Promise<URL> {
  const u = new URL(raw);
  if (!['http:', 'https:'].includes(u.protocol)) throw new Error('Invalid protocol');
  const { address } = await lookup(u.hostname);
  if (isPrivateIp(address)) throw new Error('Blocked address');
  return u;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const target = req.query.url;
  if (typeof target !== 'string') return res.status(400).send('Missing url');

  try {
    let current = target;
    for (let hop = 0; hop < 4; hop++) {
      const u = await assertSafe(current);
      const r = await fetch(u, {
        redirect: 'manual',
        signal: AbortSignal.timeout(10_000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ResumeReviewBot/1.0)' },
      });
      if (r.status >= 300 && r.status < 400 && r.headers.get('location')) {
        current = new URL(r.headers.get('location')!, u).toString();
        continue;
      }
      const html = (await r.text()).slice(0, 2_000_000);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    }
    return res.status(508).send('Too many redirects');
  } catch (e) {
    return res.status(502).send(e instanceof Error ? e.message : 'Fetch failed');
  }
}
