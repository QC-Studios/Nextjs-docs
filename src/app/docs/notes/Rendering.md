
---

# ⚡ Rendering in Next.js

## 📝 Problem Statement

Next.js में जब भी कोई पेज load होता है तो ये decide करना ज़रूरी होता है कि data कहाँ से आएगा और rendering कहाँ होगी — **Server** या **Client** पर।
गलत rendering strategy चुनने से performance, SEO, और user experience पर असर पड़ता है।

इसलिए Next.js ने multiple rendering strategies दी हैं ताकि developer use case के हिसाब से best चुन सके।

---

## 🔑 Rendering Types in Next.js

### 1. **Static Site Generation (SSG)**

* पेज **build time** पर generate होता है।
* बार-बार बदलने वाला data नहीं है तो ये सबसे fast और cheap option है।
* HTML पहले से generate होता है और CDN से serve होता है।

**Use Case:** Blogs, Documentation, Marketing pages

**Code Example:**

```tsx
// app/posts/[id]/page.tsx
import { getPost } from "@/lib/api";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);
  return <div>{post.title}</div>;
}
```

---

### 2. **Server-Side Rendering (SSR)**

* पेज **हर request पर** server से generate होता है।
* Fresh और frequently changing data के लिए।
* SEO friendly क्योंकि server पर HTML बनकर जाता है।

**Use Case:** Dashboard, Dynamic content, User-specific data

**Code Example:**

```tsx
// app/products/[id]/page.tsx
import { getProduct } from "@/lib/api";

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return <div>{product.name}</div>;
}
```

---

### 3. **Incremental Static Regeneration (ISR)**

* Static pages को regenerate करने की सुविधा देता है।
* पहली बार page build time पर generate होगा, और फिर **revalidate** समय के बाद background में नया HTML generate होगा।

**Use Case:** ई-commerce products, News sites

**Code Example:**

```tsx
// app/posts/[id]/page.tsx
import { getPost } from "@/lib/api";

export const revalidate = 60; // 60 seconds बाद नया HTML generate

export default async function PostPage({ params }) {
  const post = await getPost(params.id);
  return <div>{post.title}</div>;
}
```

---

### 4. **Client-Side Rendering (CSR)**

* Page पहले server से blank HTML लेता है और फिर **JavaScript data fetch करके render करता है**।
* SEO friendly नहीं होता, लेकिन interactive UIs के लिए ज़रूरी है।

**Use Case:** Authenticated dashboards, Real-time apps

**Code Example:**

```tsx
"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;
  return <div>{data.message}</div>;
}
```

---

### 5. **Streaming (React Server Components)**

* Next.js 13+ में **React Server Components (RSC)** की वजह से possible है।
* Server पर components render होते हैं और client पर stream होकर आते हैं।
* User को fast **partial UI** दिखता है (loading state + actual data later)।

**Use Case:** Large data fetching pages, Progressive rendering

**Code Example:**

```tsx
// app/page.tsx
import Posts from "./Posts";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      {/* Suspense streaming */}
      <Posts />
    </div>
  );
}
```

```tsx
// app/Posts.tsx
export default async function Posts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return (
    <ul>
      {posts.slice(0, 5).map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

---

## ⚖️ Comparison Table

| Rendering Type | When Render Happens | SEO Friendly | Performance            |
| -------------- | ------------------- | ------------ | ---------------------- |
| **SSG**        | Build time          | ✅ Yes        | ⚡ Fastest              |
| **SSR**        | Every request       | ✅ Yes        | ❌ Slower               |
| **ISR**        | Build + Background  | ✅ Yes        | ⚡ Balanced             |
| **CSR**        | Client runtime      | ❌ No         | ⚡ Fast after load      |
| **Streaming**  | Server + Client mix | ✅ Yes        | ⚡⚡ Best for large apps |

---

👉 तो अब तुम्हारे पास clear idea है कि किस case में कौन सी rendering चुननी है।

---


