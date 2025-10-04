
---

# 📌 Problem Statement / Use Case

जब हम किसी page या route पर जाते हैं, तो कई बार **data fetch होने में time लगता है** (API call, DB query, server-side work आदि)।
ऐसे case में user को blank page दिखाना अच्छा UX नहीं है।
👉 हमें एक **loading UI** चाहिए, जो automatically तब दिखे जब page data load हो रहा हो।

Next.js 15 हमें इसके लिए **`loading.tsx` file** provide करता है।

---

# 🚀 Loading.tsx क्या है?

* यह एक **special file** है जिसे आप किसी भी route folder में बना सकते हो।
* जब भी उस route (या उसके अंदर nested routes) load हो रहे हों, Next.js automatically `loading.tsx` render करेगा।
* जैसे ही data load complete हो जाता है, `page.tsx` replace हो जाएगा।
* मतलब आपको manually कुछ नहीं करना — बस file बनानी है और Next.js बाकी handle करेगा।

---

# 📂 Folder Structure Example

```bash
app/
 ├── dashboard/
 │    ├── page.tsx
 │    ├── loading.tsx   # जब dashboard load होगा, यह पहले दिखेगा
 │    └── settings/
 │         ├── page.tsx
 │         └── loading.tsx
 └── auth/
      ├── login/
      │    ├── page.tsx
      │    └── loading.tsx
```

---

# 🧑‍💻 Example Code

### `app/dashboard/loading.tsx`

```tsx
export default function Loading() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>⏳ Loading Dashboard...</p>
    </div>
  );
}
```

### `app/dashboard/page.tsx`

```tsx
async function getData() {
  // Simulate slow API
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { message: "Welcome to Dashboard!" };
}

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
}
```

👉 Behavior:

* जब user `/dashboard` खोलेगा → पहले **Loading UI** (loading.tsx) दिखेगा।
* 3 seconds बाद API resolve होगी → actual **Dashboard Page** दिखेगा।

---

# 🧐 Key Points

* `loading.tsx` file **route segment level** पर काम करता है।
* अगर किसी parent folder में भी `loading.tsx` है तो वो भी तब तक show होगा जब तक उसके अंदर वाले children load हो रहे हों।
* `loading.tsx` केवल **suspense boundary** की तरह काम करता है (React Suspense का Next.js version)।

---

# ✅ Real Use Cases

* Dashboard load होने पर **skeleton screen** दिखाना।
* Auth page load होते समय **spinner** दिखाना।
* Blog post load होते समय **placeholder content** दिखाना।

---

