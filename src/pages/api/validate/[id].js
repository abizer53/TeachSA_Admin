// pages/api/validate/[id].js
export default async function handler(req, res) {
  const { id } = req.query;
  const API_KEY = 'ck_live_23a1ba535ba4ff74194dc06738cbfd9e29702c703d5dd1c31f51ae771b425ef9';

  if (!API_KEY) return res.status(500).json({ error: "Missing API key" });

  try {
    const r = await fetch(`https://api.checkid.co.za/api/v1/validate/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const contentType = r.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await r.json();
      return res.status(r.status).json(data);
    } else {
      const text = await r.text();
      res.status(r.status).send(text);
    }
  } catch (err) {
    console.error("proxy error:", err);
    res.status(500).json({ error: "Proxy request failed" });
  }
}
// lib/checkid.js
export async function validateId(id) {
  if (!id) throw new Error("id required");
  const res = await fetch(`/api/validate/${id}`);
  if (!res.ok) {
    // try to read error info
    let body;
    try { body = await res.json(); } catch { body = await res.text(); }
    throw new Error(`Validation failed: ${res.status} ${JSON.stringify(body)}`);
  }
  return await res.json();
}
