
---

# 📘 Folder Convention in Next.js 15

---

## ❓ Problem Statement / Use Case

Next.js App Router में हर file और folder का **special meaning** होता है।
App Router **filesystem-based routing** use करता है — इसका मतलब है कि **folder और file का नाम ही route structure define करता है**।

**Problem:**

* Agar random folders/file names use karo → URL aur layout behavior unpredictable ho jaata hai
* Nested layouts aur dynamic routing correctly handle nahi hote
* Large apps maintain karna difficult हो जाता है

---

## 💡 What is Folder Convention?

* हर folder/file का एक defined purpose है
* Naming और placement dictate करते हैं कि कौन सा route, layout या API कब और कैसे render होगा

**Key Points:**

* `page.js` → route UI component
* `layout.js` → shared layout (header/footer etc.)
* `loading.js` → route load hone पर fallback UI
* `error.js` → route-specific error UI
* `not-found.js` → 404 page
* `(group)` → route grouping without affecting URL
* `[param]` → dynamic routes
* `[...param]` → catch-all routes
* `route.js` → API routes

---

## 🗂️ Basic Structure

```
app/
 ├── layout.js
 ├── page.js
 ├── about/
 │    └── page.js
 └── contact/
      └── page.js
```

* `/` → `app/page.js` se render hota hai
* `/about` → `app/about/page.js` se render hota hai
* `/contact` → `app/contact/page.js` se render hota hai

---

## 🧩 Special Files

| File           | Purpose                                                  |
| -------------- | -------------------------------------------------------- |
| `page.js`      | Route ke main UI component ke liye                       |
| `layout.js`    | Common layout define karta hai (header/footer jese)      |
| `loading.js`   | Route load hone ke time pe fallback UI                   |
| `error.js`     | Route ke error handle karne ke liye                      |
| `not-found.js` | 404 page ke liye                                         |
| `template.js`  | Unique layout per render (unlike persistent `layout.js`) |

---

## 🧱 Nested Layouts

```
app/
 ├── layout.js          ← root layout
 └── dashboard/
      ├── layout.js     ← nested layout
      └── page.js       ← child page
```

* `dashboard/layout.js` sirf `dashboard` ke andar ke routes pe apply hoga
* Root `layout.js` har page pe apply hota hai

> Multi-level UI design without prop drilling possible

---

## 📦 Grouping Routes (Without affecting URL)

```
app/
 ├── (marketing)/
 │     ├── home/
 │     │    └── page.js
 │     └── about/
 │          └── page.js
 ├── (dashboard)/
 │     ├── users/
 │     │    └── page.js
 │     └── settings/
 │          └── page.js
 └── layout.js
```

URL structure:

```
/home
/about
/users
/settings
```

> `(marketing)` और `(dashboard)` URL में **appear नहीं होंगे**, सिर्फ internal organization के लिए

---

## 🔁 Dynamic Routes

* `[param]` notation से dynamic routes बनते हैं
* Example:

```
app/blog/[slug]/page.js
```

URL:

```
/blog/first-post
/blog/nextjs-routing
```

Access params in page:

```js
export default function Blog({ params }) {
  return <h1>{params.slug}</h1>;
}
```

---

## ⚙️ Route Handlers / API Routes

* API routes के लिए `route.js` use होता है

```
app/api/users/route.js
```

Example:

```js
export async function GET() {
  return Response.json({ message: "Hello from API!" });
}
```

> Creates `/api/users` endpoint

---

## 🪄 Optional & Catch-All Routes

| Type               | Syntax      | Example          | URL Match                    |
| ------------------ | ----------- | ---------------- | ---------------------------- |
| Dynamic            | `[id]`      | `/app/[id]`      | `/app/123`                   |
| Catch-all          | `[...id]`   | `/app/[...id]`   | `/app/a/b/c`                 |
| Optional catch-all | `[[...id]]` | `/app/[[...id]]` | `/app`, `/app/a`, `/app/a/b` |

---

## 🧠 Summary

| Concept       | Folder/File               | Purpose                     |
| ------------- | ------------------------- | --------------------------- |
| Page          | `page.js`                 | Defines route UI            |
| Layout        | `layout.js`               | Shared layout               |
| Group         | `(group)`                 | Organize without URL change |
| Dynamic Route | `[param]`                 | Variable path segment       |
| API Route     | `route.js`                | API endpoint                |
| Loading/Error | `loading.js` / `error.js` | State handling              |

---

## ✅ Best Practices

1. `(group)` से related routes organize करें
2. Dynamic routes `[param]` descriptive रखें
3. Catch-all `[...param]` only when deeply nested paths हों
4. Layouts reuse करें और maintainable structure बनाएँ
5. API routes separate रखें for clean architecture

---

**In short:**
Next.js App Router में हर folder और file clear purpose follow करती है।
In conventions ko follow करने से project structure **clean**, **scalable**, और **maintainable** बनता है।

---
