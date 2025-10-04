
# 📘 Parallel Data Fetching in Next.js 15

---

## ❓ Problem Statement / Use Case

कई बार हमें ek hi page pe **multiple APIs se data** fetch karna होता है, लेकिन wo APIs **independent** hote हैं (ek dusre pe depend nahi).

**Problem:**

* Agar sequential fetch karein → har request wait karegi pichhli request ke complete hone ka
* Ye unnecessarily slow ho jata hai

**Solution:**

👉 **Parallel Fetching** use karke hum sabhi APIs ko ek saath trigger kar dete हैं → page fast load hota hai

---

## 💡 What is Parallel Data Fetching?

* Multiple fetch calls **ek hi waqt me execute** hote hain
* Use case: independent APIs (user, products, posts etc.)
* Implement karne ke liye `Promise.all` use hota hai

---

## 🛠️ Implementation

### 1️⃣ Example: Fetch Products + Categories Parallel

```tsx
// app/products/page.tsx
async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function ProductsPage() {
  // Parallel fetching using Promise.all
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      <h1>🛒 Products</h1>
      <h2>Categories</h2>
      <ul>
        {categories.map((c: string) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <h2>All Products</h2>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>
            {p.title} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## ⚡ Performance Difference

### 🔹 Sequential

```ts
const products = await getProducts();
const categories = await getCategories();
```

⏱ Total time = `t1 + t2`

### 🔹 Parallel

```ts
const [products, categories] = await Promise.all([
  getProducts(),
  getCategories(),
]);
```

⏱ Total time = `max(t1, t2)`

👉 Parallel fetching hamesha faster hoti hai jab APIs independent ho.

---

## 🌍 Real-World Analogy

* Sequential = Pehle chai banao → fir sandwich banao
* Parallel = Chai bante bante sandwich bhi ready ho jaye

---

## ✅ Best Practices

1. Jab APIs **independent** ho → hamesha parallel fetch use karein
2. Error handling ke liye `Promise.allSettled` bhi use kar sakte ho
3. Large dashboards, feeds, analytics pages me kaafi useful hai

---


