
---

# Partial Prerendering (PPR) in Next.js 15

## Problem Statement / Use Case

Traditional rendering strategies in Next.js like **Static Rendering** and **Dynamic Rendering** have trade-offs:

* **Static Rendering** is very fast but cannot handle personalized or frequently updated data without revalidation.
* **Dynamic Rendering** always waits for server data, making it slower for users.

👉 The challenge is to combine the **speed of static pages** with the **flexibility of dynamic data**.

This is where **Partial Prerendering** comes in.

---

## What is Partial Prerendering?

Partial Prerendering (PPR) is a **hybrid rendering strategy** in Next.js 15 where:

* The **static shell** (layout, common UI, non-dynamic parts) is **prerendered at build time**.
* The **dynamic content** (user data, personalized info, live feeds) is **rendered at request time** and streamed into the page.

⚡ This allows pages to load **instantly with static content**, while **dynamic sections hydrate later** without blocking the whole page.

---

## How It Works

1. **Static parts** → prerendered at build time (fast initial load).
2. **Dynamic parts** → wrapped inside `dynamic = "force-dynamic"` or React Suspense boundaries.
3. At request time → the static shell is served instantly, and dynamic content streams in when ready.

---

## Example: Partial Prerendering in Next.js 15

```tsx
// app/page.tsx
import { Suspense } from "react";

async function StaticHeader() {
  return <h1>🚀 Welcome to Next.js 15</h1>;
}

async function DynamicUser() {
  // Simulating dynamic data fetching
  const res = await fetch("https://api.example.com/user", { cache: "no-store" });
  const user = await res.json();

  return <p>Hello, {user.name} 👋</p>;
}

export default function Home() {
  return (
    <div>
      {/* Static part (pre-rendered at build time) */}
      <StaticHeader />

      {/* Dynamic part (rendered at request time) */}
      <Suspense fallback={<p>Loading user...</p>}>
        <DynamicUser />
      </Suspense>
    </div>
  );
}
```

---

## Benefits of Partial Prerendering

✅ Combines best of **Static** + **Dynamic** rendering.
✅ Improves **performance** (fast TTFB with static shell).
✅ Supports **personalization** and **real-time data** without losing speed.
✅ Works seamlessly with **React Server Components** and **Streaming**.

---

