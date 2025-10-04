
---

# 🔵 Server-Side Rendering (SSR) in Next.js 15

## 📌 Problem Statement / Use Case

* Kuch pages ko **real-time data** ke saath render karna hota hai (jaise stock prices, live scores, dashboard).
* Agar static render kare to data पुराना हो सकता है।
* **Server-Side Rendering (SSR)** ensure करता है कि **हर request पर fresh HTML** generate हो.

👉 SSR का use तब करना चाहिए जब:

* Data har request pe change hota है.
* Personalized content serve करना है (jaise user dashboard, auth-based pages).
* SEO चाहिए with **always fresh data**.

---

## ⚙️ How SSR Works in Next.js 15

1. User request karta hai → Next.js server ko call hota hai.
2. Server **API call ya DB query** karta hai.
3. Data ke saath **HTML generate karke** client ko bhejta hai.
4. Browser pe page render hota hai → user ko fresh data milta hai.

---

## 📂 Example Project Structure

```
app/
 └── products/
      └── page.tsx
```

---

## 💻 Code Example

### 🔹 `app/products/page.tsx`

```tsx
export const dynamic = "force-dynamic"; 
// 🔹 Ensures page is rendered on every request (SSR)

async function getProducts() {
  // Fake API (simulate delay)
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { id: 1, name: "Laptop", price: "$1200" },
    { id: 2, name: "Headphones", price: "$150" },
    { id: 3, name: "Keyboard", price: "$80" },
  ];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>🛒 Product List (SSR Example)</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🛠️ Testing SSR in Postman

### 🔹 Request

```http
GET http://localhost:3000/products
```

### 🔹 Response (HTML rendered on server)

```html
<div>
  <h1>🛒 Product List (SSR Example)</h1>
  <ul>
    <li>Laptop - $1200</li>
    <li>Headphones - $150</li>
    <li>Keyboard - $80</li>
  </ul>
</div>
```

👉 Notice: Client ko **HTML ready milta hai** (not just JSON).

---

## ✅ Key Points to Remember

* `export const dynamic = "force-dynamic"` → page hamesha SSR se render hoga.
* SSR **SEO-friendly** hai kyunki search engines ko HTML milta hai.
* SSR pages har request ke saath **slow ho sakte hain** (API delay = render delay).
* Agar caching chahiye → **ISR** (Incremental Static Regeneration) better option hai.

---

