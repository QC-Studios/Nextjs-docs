
---

# ⚛️ React Server Components (RSC) in Next.js 15

---

## ❓ Problem Statement / Use Case

Traditional React apps me:

* **Client Components** → browser me render होते हैं (JS bundle download, hydrate होता है).
* Problem → Large apps me JS bundle बहुत बड़ा हो जाता है → performance slow हो जाती है.

👉 हमें चाहिए:

* Server pe code चले ताकि **bundle chhota ho**.
* Client pe sirf वही JS आए jo **interactive UI** ke liye zaruri ho.

---

## 💡 What are React Server Components?

React Server Components (RSC) allow you to:

* Components ko **server pe render karo** without sending extra JS to browser.
* **Data fetching directly server pe** ho sakta hai (no API needed between client & server).
* Client side pe **smaller bundle** aata hai (fast load times).

---

## ⚙️ Key Points

* Default Next.js 15 ke **`app/`** directory me jo bhi components bante hain → **Server Components hote hain by default**.
* Agar aapko browser interactivity (state, hooks, event handlers) chahiye → explicitly `"use client"` likhna padta hai.
* Server Components **async** ho sakte hain → directly `await fetch()` kar sakte hain.

---

## 📂 Example Folder Structure

```
app/
 ├── page.tsx         // Server Component
 ├── dashboard/
 │    ├── page.tsx    // Server Component
 │    └── Chart.tsx   // Client Component
```

---

## 💻 Example

### 🔹 Server Component (`page.tsx`)

```tsx
// app/page.tsx
export default async function HomePage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <div>
      <h1>👋 Welcome to React Server Components</h1>
      <ul>
        {users.slice(0, 5).map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <p className="text-gray-500">This page was rendered on the server.</p>
    </div>
  );
}
```

✅ कोई `"use client"` नहीं → ये Server Component है.
✅ Data **direct server pe fetch** हुआ.

---

### 🔹 Client Component (`Chart.tsx`)

```tsx
// app/dashboard/Chart.tsx
"use client"; // explicitly mark client component
import { useState } from "react";

export default function Chart() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>📊 Client Side Chart</h2>
      <p>Clicks: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

✅ `"use client"` likhne se React hooks aur event handlers kaam karenge.
✅ Sirf is component ka JS client pe send hoga.

---

### 🔹 Mixing Both in `dashboard/page.tsx`

```tsx
// app/dashboard/page.tsx
import Chart from "./Chart";

export default function DashboardPage() {
  return (
    <div>
      <h1>📊 Dashboard</h1>
      <Chart /> {/* Client Component */}
    </div>
  );
}
```

✅ `DashboardPage` ek **Server Component** hai.
✅ Isme `Chart` Client Component import hua.
✅ Result: Fast SSR + Client-side interactivity.

---

## 🌍 Real World Analogy

* Server Components = **Restaurant kitchen** → food prepare hota hai but customer ko kitchen nahi dikhaya jata.
* Client Components = **Table-side service** → jo cheez customer ko interactive chahiye (chatbot, form, dropdown).

---

## ✅ Why RSC is Useful

1. **Performance boost** → Smaller client bundle.
2. **Direct server access** → Fetch data from DB/API without API routes.
3. **Streaming support** → Large UI ko parts me render kar sakte ho.
4. **Mix and match** → Server Components + Client Components = Best balance.

---

## 🔗 Best Practices

* By default **Server Components** use karo.
* Sirf interactive UI ke liye `"use client"` lagao.
* Server Components ko async banao for data fetching.
* Avoid overusing client components → bundle size explode ho jayega.

---

