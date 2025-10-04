

# 📘 Data Fetching in Server Components (Next.js 15)



## ❓ Problem Statement / Use Case

Next.js 15 में pages by default **Server Components** होते हैं। इसका मतलब:

* Page render होने से पहले **server-side data fetch** कर सकते हैं
* SEO-friendly और fast-loading pages बन सकते हैं
* Database या external API से data fetch करना आसान

**Problem:**

* Client-side fetch सिर्फ browser में execute होता है → SEO impact और initial load slow हो सकता है
* Large apps में consistency maintain करना कठिन हो सकता है

---

## 💡 What is Server-Side Data Fetching?

* Server Component automatically **server पर execute होता है**
* `fetch()` directly server-side hota है
* Data पहले fetch हो जाता है, फिर page browser को serve होता है

**Key Points:**

* `"use client"` directive न लगाने पर component default server-side होता है
* Server Component में async/await data fetching support होती है
* APIs, databases, headless CMS, या external endpoints से data fetch कर सकते हैं

---

## 🛠️ Steps / Implementation

### 1️⃣ Basic Server-Side Fetch

```tsx
// app/products/page.tsx
async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>🛒 Products List (Server-Side Fetch)</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>{p.title} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}
```

> ✅ Page server पर render होगा → browser को fully rendered HTML मिलेगा

---

### 2️⃣ Dynamic Routes + Server Fetch

```tsx
// app/products/[id]/page.tsx
interface Params {
  params: { id: string };
}

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export default async function ProductPage({ params }: Params) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}
```

---

### 3️⃣ Using `generateStaticParams` for Pre-rendering

```ts
// app/products/[id]/page.tsx
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return products.map((p: any) => ({ id: p.id.toString() }));
}
```

> ✅ Next.js build time पर static paths generate होंगे, faster performance और SEO friendly

---

## 🌍 Real-World Analogy

* Server = Chef in a kitchen preparing full meal
* Browser = Customer receives ready-to-eat meal
* Client fetch = Customer fetching ingredients themselves

> Server Components ensure **ready-to-render content** browser में भेजा जाए

---

## ✅ Best Practices

1. Server Components use करें **static pages / SEO-focused content** के लिए
2. Heavy computation और multiple API calls server-side करें
3. Combine **Server + Client Components** for interactivity where needed
4. Error handling जरूरी है → fetch failure पर fallback UI दिखाएँ

---

