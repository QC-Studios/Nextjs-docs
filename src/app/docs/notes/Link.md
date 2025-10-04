

---

# 🔗 Using `Link` in Next.js 15

---

## ❓ Problem Statement / Use Case

जब हम React/Next.js से web apps बनाते हैं, तो हमें **pages के बीच navigation** करना होता है।

**Problem:**

* अगर हम `<a href="/about">About</a>` use करें तो browser **full page reload** करता है।
* इससे performance slow होती है और **client state (React states, context, cache)** reset हो जाता है।
* Large apps में ये UX के लिए खराब है।

हमें चाहिए:
✔️ Fast navigation (client-side routing)
✔️ State preserved रहे
✔️ SEO friendly `<a>` tags बने

---

## 💡 What is `Link`?

Next.js `Link` component देता है जो **client-side navigation** enable करता है।

**Key Points:**

* HTML `<a>` tag generate करता है → SEO friendly
* Navigation client-side होता है → तेज़ और smooth
* Prefetching by default → अगला page background में load हो जाता है

---

## 🛠️ Steps to Implement

### 1️⃣ Basic Usage

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/about">Go to About</Link>
    </div>
  );
}
```

👉 यहाँ `<Link>` internally `<a>` tag generate करता है
👉 Navigation बिना full reload के होगा

---

### 2️⃣ With Child `<a>` (Optional)

Earlier Next.js versions में `<Link>` के अंदर `<a>` देना ज़रूरी था।
Next.js 15 में **optional** है:

```tsx
<Link href="/about">
  <a>About Page</a>
</Link>
```

या simply:

```tsx
<Link href="/about">About Page</Link>
```

दोनों valid हैं ✅

---

### 3️⃣ Passing Dynamic Routes

```tsx
<Link href={`/blog/${post.id}`}>
  {post.title}
</Link>
```

👉 Dynamic routes (जैसे `/blog/[id]`) के लिए values pass कर सकते हैं।

---

### 4️⃣ Prefetching

By default, Next.js links को viewport में आते ही prefetch कर देता है।

Disable करने के लिए:

```tsx
<Link href="/about" prefetch={false}>About</Link>
```

---

### 5️⃣ Replace vs Push

Default: `push` → history में नया entry add करता है।

```tsx
<Link href="/dashboard" replace>
  Dashboard
</Link>
```

👉 `replace` का use करें जब आप user को वापस previous page पर नहीं ले जाना चाहते।

---

### 6️⃣ Open in New Tab

```tsx
<Link href="/about" target="_blank" rel="noopener noreferrer">
  About
</Link>
```

---

### 7️⃣ Scroll Behavior

Default: top पर scroll होता है।

Disable करने के लिए:

```tsx
<Link href="/about" scroll={false}>
  About
</Link>
```

---

## 🌍 Real-World Analogy

सोचो आप एक **shopping mall** में घूम रहे हो।

* Normal `<a>` tag मतलब: हर बार mall से बाहर निकलना और दूसरे mall में entry लेना → slow.
* `<Link>` मतलब: आप mall के अंदर ही floors बदल रहे हो escalator से → fast और smooth.

---

## ✅ Why This is Useful

* **Better UX** → बिना reload navigation
* **SEO Friendly** → `<a>` tags बने रहते हैं
* **Performance Boost** → prefetching pages
* **Control** → replace, scroll, prefetch options

---

## 🔗 Best Practices

1. हमेशा navigation के लिए `<Link>` use करें, `<a>` सिर्फ external links के लिए।
2. Prefetch unnecessary pages को disable करें → bandwidth बचता है।
3. External links पर `target="_blank"` + `rel="noopener noreferrer"` ज़रूर दें।
4. Dynamic routes में हमेशा `href` सही बनाएं।
5. Navigation history control के लिए `replace` use करें।

---


