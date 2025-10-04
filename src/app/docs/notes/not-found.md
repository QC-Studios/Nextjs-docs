
---

# 📘 Handling `Not Found` Pages in Next.js

## 🛑 Problem Statement

कई बार हमें ऐसी situation आती है जहाँ user कोई ऐसा page open करता है जो exist ही नहीं करता।
जैसे:

* गलत URL type कर दिया
* किसी route पर data ही नहीं मिला
* किसी ID या slug के लिए backend ने empty response भेज दिया

👉 ऐसे में हमें **Not Found Page** दिखाना होता है ताकि user को clear indication मिले कि requested content available नहीं है।

Next.js इसके लिए **built-in support** देता है।

---

## 🎯 Use Cases

1. **Static 404 Page** → जब user किसी भी non-existent route पर जाता है।
2. **Dynamic Data Validation** → जब कोई route तो exist करता है लेकिन उसके लिए data नहीं मिलता (जैसे `/product/123` लेकिन DB में ऐसा product नहीं है)।

---

## 🛠️ Steps to Implement

### 1️⃣ Default 404 Page बनाना

Next.js में बस एक `not-found.tsx` file बनानी होती है।

👉 Location:

```bash
src > app > not-found.tsx
```

### 2️⃣ Dynamic Routes के अंदर Custom Handling

अगर किसी dynamic route (`[id]`, `[slug]` आदि) में data नहीं मिलता, तो आप **`notFound()` function** call कर सकते हो।
यह function automatically user को आपके `not-found.tsx` page पर redirect कर देगा।

---

## 📝 Example Code

### 📄 `src/app/not-found.tsx`

```tsx
export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
```

---

### 📄 Dynamic Route Example

`src/app/products/[id]/page.tsx`

```tsx
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  // Dummy example: यहां आप DB/API call कर सकते हो
  const products = ["101", "102"];
  if (!products.includes(id)) return null;
  return { id, name: `Product ${id}` };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    // अगर product नहीं मिला तो user को not-found page पर भेज दो
    notFound();
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>This is the detail page for product {product.id}</p>
    </div>
  );
}
```

---

## ⚡ Final Behavior

* `/random-url` → सीधे `not-found.tsx` render होगा
* `/products/101` → valid product → normal render
* `/products/999` → invalid product → **redirect to `not-found.tsx`**

---

## ✅ Why This is Useful?

* User को **clear feedback** मिलता है instead of blank screen.
* आप multiple routes के लिए अलग-अलग 404 page बनाने से बच सकते हो।
* Same 404 handling काम करेगा चाहे user गलत URL खोले या database में data न मिले।

---

