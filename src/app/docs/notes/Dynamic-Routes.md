
---

# 📘 Dynamic Routes in Next.js 15

---

## ❓ Problem Statement / Use Case

Next.js में कभी-कभी हमें **dynamic URLs** की ज़रूरत होती है, जहां path हर बार बदल सकता है।

उदाहरण:

* `/blog/1`
* `/blog/2`
* `/user/123/profile`

**Problem:**

* Static pages के लिए हर URL define करना possible नहीं
* Dynamic content जैसे blog post, user profile, product page हर बार अलग ID के साथ आएगा
* URL को clean, readable और SEO-friendly रखना ज़रूरी है

---

## 💡 What are Dynamic Routes?

* Dynamic Routes allow you to **capture URL parameters** और उनके आधार पर page render करना
* Syntax: `[paramName]`

**Key Points:**

* Folder/file name को **square brackets `[ ]`** में रखें
* Next.js automatically उस param को **params object** में pass करता है
* Nested dynamic routes भी support होते हैं

---

## 📂 Folder Structure Example

```bash
app/
 ├── blog/
 │    ├── [id]/
 │    │     └── page.tsx   # /blog/1, /blog/2 etc.
 └── user/
      ├── [userId]/
      │     └── profile/
      │          └── page.tsx   # /user/123/profile
```

---

## 🛠️ Implementation

### 1️⃣ Single Dynamic Route (`blog/[id]/page.tsx`)

```tsx
// app/blog/[id]/page.tsx
interface BlogPageProps {
  params: { id: string };
}

export default function BlogPage({ params }: BlogPageProps) {
  const { id } = params;

  // Simulate fetching blog post by ID
  const blogPost = { id, title: `Blog Post ${id}`, content: `Content of post ${id}` };

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
    </div>
  );
}
```

> `/blog/1` visit → Blog Post 1 show होगा
> `/blog/2` visit → Blog Post 2 show होगा

---

### 2️⃣ Nested Dynamic Route (`user/[userId]/profile/page.tsx`)

```tsx
// app/user/[userId]/profile/page.tsx
interface ProfileProps {
  params: { userId: string };
}

export default function ProfilePage({ params }: ProfileProps) {
  const { userId } = params;

  // Simulate user data fetch
  const user = { id: userId, name: "John Doe", email: "john.doe@email.com" };

  return (
    <div>
      <h1>Profile of {user.name}</h1>
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

> `/user/123/profile` → John Doe profile show होगा
> `/user/456/profile` → दूसरे user का profile show होगा

---

## 🔹 Catch-All Dynamic Routes

* Syntax: `[...param]`
* किसी भी nested path को capture कर सकते हैं

```bash
app/
 └── docs/
      └── [...slug]/page.tsx   # /docs/a, /docs/a/b, /docs/a/b/c
```

```tsx
// app/docs/[...slug]/page.tsx
interface DocsProps {
  params: { slug: string[] };
}

export default function DocsPage({ params }: DocsProps) {
  return <p>Docs Path: {params.slug.join("/")}</p>;
}
```

> `/docs/a/b/c` → "Docs Path: a/b/c" show होगा

---

## 🌍 Real-World Analogy

* `[id]` → जैसे हर product का barcode
* `[userId]` → user का unique profile identifier
* `[...slug]` → flexible multi-level document path

---

## ✅ Best Practices

1. **Use descriptive param names** → `[postId]` instead of `[id]`
2. **Nested routes** organize करें ताकि folder structure clean रहे
3. **Catch-all routes** only when deep nesting required
4. Data fetch हमेशा server-side करें → SEO और performance के लिए

---

## 🔗 Key Takeaways

* Dynamic routes = flexible URLs with params
* Nested & catch-all routes fully supported
* params object automatically available in page components
* Perfect for blogs, products, users, multi-level docs

---

