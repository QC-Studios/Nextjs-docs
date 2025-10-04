
---

# 🟢 Incremental Static Regeneration (ISR) in Next.js 15

## 📌 Problem Statement / Use Case

* Static Rendering fast होता है, लेकिन **data पुराना हो सकता है** (stale data).
* SSR हर बार fresh data देता है, लेकिन **slow** होता है।
* हमें चाहिए **best of both worlds** → fast static pages + background me revalidation.

👉 यही काम करता है **ISR (Incremental Static Regeneration)**:

* Pages **build time pe pre-render** होते हैं (jaise static rendering).
* Lekin agar data बदलता है → Next.js background me **page ko regenerate** करता है.
* User hamesha fast static page देखता है, aur next request pe fresh page serve होता है.

---

## ⚙️ How ISR Works

1. Pehli request pe static page serve hota hai.
2. `revalidate` time ke baad jab koi new request aati hai → Next.js page ko background me re-generate karta hai.
3. Next user ko **updated static page** milega.

---

## 📂 Example Project Structure

```
app/
 └── blog/
      └── page.tsx
```

---

## 💻 Code Example

### 🔹 `app/blog/page.tsx`

```tsx
export const revalidate = 10; 
// 🔹 Page will re-generate at most once every 10 seconds

async function getPosts() {
  // Fake API (simulate fresh data)
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 }, // ensure ISR applies
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>📝 Blog Posts (ISR Example)</h1>
      <ul>
        {posts.slice(0, 5).map((post: any) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
      <p className="text-gray-500">Last updated at: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
```

---

## 🛠️ Testing ISR in Postman

### 🔹 Request

```http
GET http://localhost:3000/blog
```

### 🔹 Response (HTML served)

First request (static page):

```html
<h1>📝 Blog Posts (ISR Example)</h1>
<ul>
  <li><strong>sunt aut facere repellat provident...</strong></li>
  <li><strong>qui est esse</strong></li>
  ...
</ul>
<p>Last updated at: 10:05:30</p>
```

Next request (after 10s, background regeneration):

```html
<h1>📝 Blog Posts (ISR Example)</h1>
<ul>
  <li><strong>new fresh post title...</strong></li>
  ...
</ul>
<p>Last updated at: 10:05:40</p>
```

---

## ✅ Key Points to Remember

* `export const revalidate = X` → ISR enable करता है (X seconds me refresh).
* ISR = **Static + Freshness**.
* SEO-friendly और fast performance देता है.
* API/DB से data fetch karo aur `revalidate` set karo.
* Agar hamesha fresh chahiye → SSR use karo (`dynamic = "force-dynamic"`).

---

