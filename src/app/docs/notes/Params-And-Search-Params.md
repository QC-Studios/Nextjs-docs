
---

# 📘 Params and Search Params in Next.js 15

---

## ❓ Problem Statement / Use Case

जब हम web apps बनाते हैं तो हमें दो तरह के data URL से निकालने की जरूरत पड़ती है:

1. **Params (Dynamic Segments)**

   * Example: `/products/123` → यहाँ `123` एक **param** है (productId).
   * Useful for **dynamic routing** (user profiles, blog posts, products).

2. **Search Params (Query Strings)**

   * Example: `/search?query=books&page=2` → यहाँ `query=books` और `page=2` **search params** हैं।
   * Useful for **filters, pagination, sorting**.

**Problem:**

* अगर हम manually `window.location` या `URLSearchParams` use करें तो code messy हो जाता है।
* Server-side rendered apps में params extract करना inconsistent होता है।

---

## 💡 What are Params and Search Params?

Next.js 15 हमें **params** और **searchParams** को page components के props के रूप में देता है।

**Key Points:**

* `params` → `[id]`, `[...slug]` जैसी folders से मिलते हैं
* `searchParams` → URL query string से मिलते हैं
* दोनों **server components** में directly available होते हैं

---

## 🛠️ Steps to Implement

### 1️⃣ Folder Structure Example

```
src
 └── app
     └── products
          └── [id]
               └── page.tsx
```

---

### 2️⃣ Accessing `params`

```tsx
// src/app/products/[id]/page.tsx
export default function ProductPage({ params }: { params: { id: string } }) {
  return <h1>Product ID: {params.id}</h1>;
}
```

👉 URL `/products/123` → Output: **Product ID: 123**

---

### 3️⃣ Accessing `searchParams`

```tsx
// src/app/search/page.tsx
export default function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  return (
    <div>
      <h1>Search Query: {searchParams.query}</h1>
      <h2>Page: {searchParams.page}</h2>
    </div>
  );
}
```

👉 URL `/search?query=books&page=2` → Output:

* Search Query: books
* Page: 2

---

### 4️⃣ Combining Both

```tsx
// src/app/users/[id]/page.tsx
export default function UserPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tab?: string };
}) {
  return (
    <div>
      <h1>User ID: {params.id}</h1>
      <p>Active Tab: {searchParams.tab ?? "overview"}</p>
    </div>
  );
}
```

👉 URL `/users/42?tab=settings` →

* User ID: 42
* Active Tab: settings

👉 URL `/users/42` →

* User ID: 42
* Active Tab: overview

---

## 🌍 Real-World Analogy

* **Params**: सोचो आप library में गए हो और किसी specific किताब का ID है → `/books/123`.
* **Search Params**: अब आप उस किताब को filter कर रहे हो edition या language से → `/books/123?lang=hindi&edition=2`.

---

## ✅ Why This is Useful

* Clear और structured तरीके से URL data access करना
* Dynamic और filter-based pages आसानी से बनाना
* SEO-friendly routes और query parameters
* Server components में direct usage → boilerplate कम

---

## 🔗 Best Practices

1. हमेशा `params` को folder structure से sync रखें।
2. `searchParams` optional हो सकते हैं → null checks करें।
3. SEO के लिए meaningful query params रखें (`?page=2` better है `?p=2` से)।
4. Sensitive data कभी भी query params में ना भेजें।
5. Large apps में params types को strongly type करें → maintainability बढ़ती है।

---

