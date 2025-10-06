
---

# 📘 App Router in Next.js 15

---

## ❓ Problem Statement / Use Case

Next.js 15 में traditional `pages` folder की जगह **App Router** introduce हुआ है।

**Problem it solves:**

* Server और Client Components का better separation
* Layouts, templates, nested routes, error handling centralized
* Advanced data fetching और streaming support
* Dynamic routing simplified

---

## 💡 What is App Router?

* `app/` folder से Next.js को route, layout और data fetch instructions मिलती हैं
* Server Components default, client components `"use client"` directive के साथ
* Nested routes और parallel routes आसानी से manage हो जाते हैं

**Key Points:**

* हर route folder में `page.tsx` होना चाहिए
* Optional layouts → `layout.tsx`
* Error handling → `error.tsx`, `not-found.tsx`
* Loading → `loading.tsx`

---

## 📂 Folder Structure Example

```bash
app/
 ├── layout.tsx
 ├── page.tsx
 ├── dashboard/
 │    ├── layout.tsx
 │    ├── page.tsx
 │    └── settings/
 │         └── page.tsx
 └── blog/
      ├── [id]/
      │     └── page.tsx
      └── page.tsx
```

---

## 🛠️ Example Usage

```tsx
// app/page.tsx
export default function HomePage() {
  return <h1>Welcome to Home</h1>;
}

// app/dashboard/page.tsx
export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}

// app/dashboard/settings/page.tsx
export default function SettingsPage() {
  return <h1>Settings</h1>;
}
```

> Nested routes automatic handle होते हैं, layouts inherit होते हैं

---

## ✅ Best Practices

1. App Router के साथ **Server Components default** रखें
2. Client Components only interactive parts में use करें
3. Nested layouts से reusable design बनाएँ
4. Error boundaries और loading components हमेशा define करें
