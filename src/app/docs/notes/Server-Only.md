---

# 📘 Server Only in Next.js 15

---

## ❓ Problem Statement / Use Case

Next.js में कुछ code ऐसा होता है जिसे **client पर कभी भी expose नहीं होना चाहिए**:

* Database queries (Prisma, Mongoose)
* API keys (Stripe, OpenAI, etc.)
* File system access
* Authentication logic

👉 अगर गलती से ये code client bundle में चला जाए → **security risk** हो सकता है।

इस problem को solve करने के लिए Next.js ने **`server-only`** package दिया है।

---

## 💡 What is `server-only`?

* `server-only` एक lightweight package है जो ensure करता है कि आपका code सिर्फ **server पर run होगा**।
* अगर कोई file जिसमें `server-only` import हुआ है accidentally client component में use हो जाए → Next.js तुरंत **error throw कर देगा**।
* इससे आपका **secret data और server logic safe रहता है**।

---

## 📦 Installation

```bash
npm install server-only
```

---

## 🛠️ Implementation

### 1️⃣ Create a server-only utility

```tsx
// lib/db.ts
import 'server-only'

export async function getUserFromDB(userId: string) {
  // Imagine this is a DB call
  return {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
  };
}
```

👉 यहाँ `import 'server-only'` ensure करेगा कि यह file सिर्फ **server पर use हो**।

---

### 2️⃣ Use in a Server Component ✅

```tsx
// app/profile/page.tsx
import { getUserFromDB } from "@/lib/db";

export default async function ProfilePage() {
  const user = await getUserFromDB("101");

  return (
    <div>
      <h1>👤 Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

✅ यह valid है क्योंकि `page.tsx` by default एक **Server Component** है।

---

### 3️⃣ Mistaken Use in a Client Component ❌

```tsx
// app/profile/ClientProfile.tsx
"use client";

import { getUserFromDB } from "@/lib/db";

export default function ClientProfile() {
  // ❌ ERROR: server-only module cannot be imported in client components
  return <p>This will throw error</p>;
}
```

👉 Next.js build time पर error देगा और बताएगा कि **server-only को client में use नहीं कर सकते**।

---

## 🌍 Real World Analogy

सोचो एक **restaurant kitchen**:

* Kitchen staff (Server code) → सिर्फ kitchen में काम करते हैं।
* Waiter (Client code) → सिर्फ खाना serve करता है।

👉 अगर waiter को kitchen tools (database access, gas stove) दे दिए जाएं → accident हो सकता है।
`server-only` ensure करता है कि kitchen tools सिर्फ kitchen (server) में use हों।

---

## ✅ Best Practices

1. हमेशा sensitive code files में `import 'server-only'` डालें।
2. Database queries, API keys, और authentication logic हमेशा server-only files में रखें।
3. Client components से सिर्फ **safe props** pass करें, direct server code import ना करें।

---

👉 अब आप सुरक्षित तरीके से server और client boundaries maintain कर सकते हो।

क्या आप चाहोगे कि मैं इसी example को **middleware + cookies + server-only** combine करके एक full authentication flow बना दूँ?
