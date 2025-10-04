
---

# 🟢 Static Rendering in Next.js 15

## 📌 Problem Statement / Use Case

जब आपका पेज data **build time** पर fix हो सकता है (जैसे ब्लॉग पोस्ट की public list, marketing page, FAQ, आदि), तब हर request पर server call करना ज़रूरी नहीं।
ऐसे पेज को **Static Rendering** में compile time पर generate किया जाता है और फिर CDN पर cache हो जाता है → super fast delivery 🚀

---

## ⚙️ How It Works in Next.js 15

1. `app/` directory में आप normal React component लिखते हो।
2. अगर उस component में कोई `fetch()` call है तो वो **build time पर run** होगा।
3. Page HTML + JSON दोनों prebuild होकर **Vercel Edge Network/CDN** पर deploy हो जाते हैं।
4. हर request पर वही prebuilt HTML serve होगा।

---

## 📂 Example Project Structure

```
app/
 └── blog/
      └── page.tsx
```

---

## 💻 Code Example: `app/blog/page.tsx`

```tsx
// app/blog/page.tsx
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache", // ⬅️ Static Rendering ke liye important
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>📚 Blog (Static Rendering)</h1>
      <ul>
        {posts.slice(0, 5).map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🛠️ Postman-Style Testing

### 🔹 Request

```http
GET https://yourdomain.com/blog
```

### 🔹 Response (Static Prebuilt HTML)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>📚 Blog (Static Rendering)</title>
  </head>
  <body>
    <h1>📚 Blog (Static Rendering)</h1>
    <ul>
      <li>sunt aut facere repellat provident occaecati...</li>
      <li>qui est esse</li>
      <li>ea molestias quasi exercitationem repellat...</li>
      <li>eum et est occaecati</li>
      <li>nesciunt quas odio</li>
    </ul>
  </body>
</html>
```

⚡ हर बार response same रहेगा जब तक आप build को दुबारा deploy नहीं करते।

---

