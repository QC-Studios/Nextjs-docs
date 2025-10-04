
---

# 📌 Problem Statement / Use Case

किसी भी app में error आ सकते हैं —

* API call fail हो जाए
* कोई component crash कर जाए
* Server-side data fetch में problem हो

👉 अगर हम error को handle नहीं करते, तो user को सिर्फ **blank screen या crash** दिखेगा, जो खराब UX है।
इसको solve करने के लिए Next.js **`error.tsx` और `global-error.tsx`** provide करता है।

---

# 🚀 Next.js Error Handling System

Next.js 15 में error handling React **Error Boundaries** के ऊपर बनी है।

1. **`error.tsx` (Route level error UI)**

   * किसी भी route folder के अंदर `error.tsx` file रख सकते हो।
   * अगर उस route (या उसके अंदर nested routes) में error आता है → यह file render होगी।

2. **`global-error.tsx` (App level error UI)**

   * `app/` root folder में define करते हैं।
   * यह पूरे app का **fallback error UI** है (जब कहीं और error.tsx ना हो)।

---

# 📂 Folder Structure Example

```bash
app/
 ├── dashboard/
 │    ├── page.tsx
 │    ├── error.tsx        # केवल dashboard route errors handle करेगा
 │    └── settings/
 │         ├── page.tsx
 │         └── error.tsx   # केवल settings route errors handle करेगा
 ├── global-error.tsx      # पूरे app का fallback error UI
 └── layout.tsx
```

---

# 🧑‍💻 Example Code

### 1️⃣ Route-Level Error (`error.tsx`)

```tsx
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>❌ Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

👉 Key Points

* `error` → जो actual error object आया है
* `reset()` → re-render trigger करता है (useful जब user दोबारा try करे)

---

### 2️⃣ Simulating an Error (`page.tsx`)

```tsx
export default function DashboardPage() {
  // Simulate error
  throw new Error("Dashboard data failed to load!");

  return <h1>Welcome to Dashboard</h1>;
}
```

👉 अब जब `/dashboard` visit करेंगे → `error.tsx` render होगा।

---

### 3️⃣ Global Error (`global-error.tsx`)

```tsx
"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h1>🌍 Global Error</h1>
          <p>{error.message}</p>
          <button onClick={() => reset()}>Reload</button>
        </div>
      </body>
    </html>
  );
}
```

👉 अगर किसी route का अपना `error.tsx` नहीं है → तो Next.js इस global error UI को use करेगा।

---

# 🧐 Key Behaviors

* हर `error.tsx` **अपने route तक सीमित** है।
* Nested routes के लिए **closest error.tsx** use होगा।
* अगर कहीं `error.tsx` नहीं है → **global-error.tsx** fallback होगा।
* Error boundaries automatically reset हो जाते हैं जब user नई navigation करता है।

---

# ✅ Real Use Cases

1. **Dashboard error** → "Dashboard data could not be loaded"
2. **Settings error** → "Unable to update settings, please try again"
3. **Global error** → "Something went wrong, please refresh the page"

---


