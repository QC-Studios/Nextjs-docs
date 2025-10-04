
# 📘 Data Fetching in Client Components (Next.js 15)



## ❓ Problem Statement / Use Case

Next.js 15 में **Server Components** automatically server-side fetch कर सकते हैं, लेकिन कभी-कभी हमें **client-side interactivity और dynamic updates** चाहिए:

* User-specific data (profile, cart, settings)
* Filterable/searchable lists
* Live updates without full page reload

**Problem:**

* Server-side fetch केवल page load पर होता है
* Client interactivity के लिए data को browser में fetch और update करना पड़ता है

---

## 💡 What is Client-Side Data Fetching?

* Client components में fetch करना → browser में execute होता है
* React hooks (`useEffect`, `useState`) का use होता है
* Real-time user interaction support करता है

**Key Points:**

* `"use client"` directive जरूरी है
* Server Components के data fetching के साथ combine किया जा सकता है
* API routes या external endpoints से data fetch कर सकते हैं

---

## 🛠️ Steps / Implementation

### 1️⃣ Create Client Component

```tsx
// app/components/ClientUsers.tsx
"use client";

import { useEffect, useState } from "react";

export default function ClientUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users") // Next.js API route
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Client-Side Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.Name} - {u.Email} - {u.Occupation}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 2️⃣ Embed Client Component in Server Component

```tsx
// app/page.tsx (Server Component)
import ClientUsers from "./components/ClientUsers";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <ClientUsers />
    </div>
  );
}
```

> ✅ Server component HTML serve करेगा, **ClientUsers** browser में interactive fetch करेगा

---

### 3️⃣ Dynamic / Live Updates Example

```tsx
"use client";

import { useEffect, useState } from "react";

export default function LiveTime() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>Current Time: {time}</p>;
}
```

> Client-side data fetching + live update handled entirely in browser

---

## 🌍 Real-World Analogy

* Server Component = Shop owner preparing stock list
* Client Component = Cashier checking real-time cart, discounts, or offers for each customer

> Inventory (server data) fixed, but cashier dynamically updates per customer actions

---

## ✅ Best Practices

1. Use **client components** only when necessary → interactive / user-driven features
2. Keep **API routes** separate for security and maintainability
3. Avoid heavy data fetching in client if static/server fetch possible
4. Combine **server-side fetch + client-side fetch** for best performance

---

