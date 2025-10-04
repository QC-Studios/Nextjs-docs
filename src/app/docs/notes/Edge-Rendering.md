
---

# Edge Rendering in Next.js 15

## Problem Statement / Use Case

When rendering happens only on the **origin server** (like Vercel/Node.js backend), users far from the server may face **high latency**.
👉 The challenge is to **bring rendering closer to the user** while still supporting dynamic data fetching and personalization.

---

## What is Edge Rendering?

**Edge Rendering** means running your Next.js route handlers, pages, or middleware on a **Content Delivery Network (CDN) edge location** instead of a central server.

* Pages are rendered **geographically closer to the user**.
* Reduces **latency** → faster response times globally.
* Best suited for **personalized, dynamic, low-latency experiences** (e.g., dashboards, recommendations, A/B tests).

---

## How It Works in Next.js

1. You configure a page, route handler, or middleware to use the **Edge Runtime**.
2. Next.js deploys it to **edge locations worldwide**.
3. When a user requests the page → it’s rendered at the **nearest edge** instead of the central server.

---

## Example: Edge Rendering Page

```tsx
// app/edge-page/page.tsx
export const runtime = "edge"; // 👈 Run this page at the edge

export default function EdgePage() {
  return (
    <div>
      <h1>🌍 Edge Rendering Example</h1>
      <p>This page is rendered at the nearest edge location.</p>
    </div>
  );
}
```

---

## Example: Edge API Route

```tsx
// app/api/hello/route.ts
export const runtime = "edge"; // 👈 API route on edge

export async function GET() {
  return new Response(
    JSON.stringify({ message: "Hello from the Edge!" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
```

---

## Benefits of Edge Rendering

✅ **Low latency** – runs close to the user.
✅ Great for **personalized** or **real-time data**.
✅ Works with **middleware** for auth, A/B testing, redirects, etc.
✅ Reduces load on origin server.

---

⚡ **Pro Tip:** Use **Edge Rendering** for personalization and auth-sensitive routes, and **Static Rendering** for global, cacheable content.

---

