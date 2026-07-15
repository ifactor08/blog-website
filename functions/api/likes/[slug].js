// Cloudflare Pages Function — read/increment per-post like counts.
// Routes:  GET  /api/likes/:slug  → { count }
//          POST /api/likes/:slug  → body { delta: 1 | -1 }, returns { count }
// Storage: a KV namespace bound as `LIKES` (set in the Pages dashboard, or via
//          `wrangler pages dev dist --kv LIKES` for local testing).
//
// Note: KV is eventually consistent and increments aren't atomic. For a personal
// blog's like button that's fine; if two people like within the same second one
// tick can be lost. Move to D1 if you ever need exact concurrent counts.

const key = (slug) => `likes:${slug}`;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

async function readCount(env, slug) {
  const raw = await env.LIKES.get(key(slug));
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export async function onRequestGet({ env, params }) {
  const slug = String(params.slug || '');
  if (!slug) return json({ error: 'missing slug' }, 400);
  // Binding not configured yet → degrade gracefully instead of 500.
  if (!env.LIKES) return json({ count: 0, disabled: true });
  return json({ count: await readCount(env, slug) });
}

export async function onRequestPost({ env, params, request }) {
  const slug = String(params.slug || '');
  if (!slug) return json({ error: 'missing slug' }, 400);
  if (!env.LIKES) return json({ count: 0, disabled: true });

  let delta = 1;
  try {
    const body = await request.json();
    if (body && (body.delta === -1 || body.delta === 1)) delta = body.delta;
  } catch (_) {
    /* no/invalid body → default to +1 */
  }

  const next = Math.max(0, (await readCount(env, slug)) + delta);
  await env.LIKES.put(key(slug), String(next));
  return json({ count: next });
}
