# 📘 Data Fetching in Next.js 15

---

## ❓ Problem Statement / Use Case

Next.js में डेटा फेचिंग ज़रूरी है जब हमें डायनामिक कंटेंट दिखाना हो, जैसे:

* API से यूज़र डेटा लाना (उदाहरण: प्रोफाइल डिटेल्स)
* डेटाबेस से प्रोडक्ट्स की लिस्ट दिखाना
* रियल-टाइम डेटा जैसे स्टॉक प्राइस या न्यूज़ अपडेट्स
* SEO के लिए सर्वर-साइड डेटा रेंडर करना

👉 गलत डेटा फेचिंग मेथड यूज़ करने से परफॉर्मेंस खराब हो सकती है, जैसे स्लो लोडिंग या पुराना डेटा दिखना। Next.js 15 में डेटा फेचिंग के लिए ऑप्टिमाइज़्ड तरीके हैं।

---

## 💡 Data Fetching क्या है?

Next.js 15 में डेटा फेचिंग का मतलब है सर्वर या क्लाइंट से डेटा लाकर रेंडर करना। App Router में ये मुख्यतः तीन तरीकों से होता है:

1. **Server-Side Fetching**: Server Components में डेटा फेच करके SSR या SSG करना।
2. **Client-Side Fetching**: `"use client"` components में useEffect या SWR जैसी लाइब्रेरीज़ यूज़ करना।
3. **Server Actions**: फॉर्म्स या इवेंट्स के लिए डेटा फेचिंग और म्यूटेशन।

**Key Point**: Next.js 15 में `fetch` API को React 19 के साथ इंटीग्रेट किया गया है, जो ऑटोमैटिक caching और revalidation सपोर्ट करता है।

---

## 📂 Example Folder Structure

```bash
app/
 ├── dashboard/
 │    ├── page.tsx       // Server Component for fetching data
 │    └── actions.ts     // Server Actions for mutations
 └── components/
      └── ClientData.tsx // Client Component for client-side fetching
```

---

## 🛠️ Implementation

### 1️⃣ Server-Side Fetching (Server Component)

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Server-side data fetching
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store", // डायनामिक रेंडरिंग के लिए
  });
  const user = await res.json();

  return (
    <div>
      <h1>यूज़र डैशबोर्ड</h1>
      <p><b>नाम:</b> {user.name}</p>
      <p><b>ईमेल:</b> {user.email}</p>
      <p><b>कंपनी:</b> {user.company.name}</p>
    </div>
  );
}
```

### 2️⃣ Client-Side Fetching (Client Component)

```tsx
// components/ClientData.tsx
"use client";

import { useState, useEffect } from "react";

export default function ClientData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const result = await res.json();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <p>लोड हो रहा है...</p>;

  return (
    <div>
      <h2>पोस्ट टाइटल</h2>
      <p>{data?.title}</p>
    </div>
  );
}
```

### 3️⃣ Server Actions (For Mutations)

```tsx
// app/dashboard/actions.ts
"use server";

export async function updateUser(formData: FormData) {
  const name = formData.get("name");
  // API call to update user
  const res = await fetch("https://api.example.com/update-user", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}
```

```tsx
// app/dashboard/page.tsx (with Server Action)
import { updateUser } from "./actions";

export default function UpdateForm() {
  return (
    <form action={updateUser}>
      <input type="text" name="name" placeholder="नया नाम दर्ज करें" />
      <button type="submit">अपडेट करें</button>
    </form>
  );
}
```

---

## 🧑‍💻 Result

* **Server-Side Fetching**: `/dashboard` पर विज़िट करने से सर्वर पर डेटा फेच होगा और फ्रेश HTML रेंडर होगा।
* **Client-Side Fetching**: `ClientData` ब्राउज़र में डेटा फेच करेगा और UI अपडेट करेगा।
* **Server Actions**: फॉर्म सबमिट करने पर सर्वर action ट्रिगर होगा और डेटा अपडेट होगा।

---

## 🌍 Real World Analogy

सोचो एक **ऑनलाइन स्टोर**:

* प्रोडक्ट लिस्ट (Server Component) सर्वर से फेच होती है ताकि SEO और फास्ट लोडिंग हो।
* कार्ट में आइटम्स ऐड करना (Client Component) ब्राउज़र में इंटरैक्टिवली होता है।
* ऑर्डर सबमिट करना (Server Action) सर्वर पर प्रोसेस होता है।

👉 हर टास्क के लिए सही डेटा फेचिंग मेथड यूज़ करो।

---

## 🔗 Best Practices

1. **Server-Side First**: जहाँ पॉसिबल हो, Server Components में डेटा फेच करो for better परफॉर्मेंस।
2. **Caching**: `fetch` में `cache: "force-cache"` (SSG) या `cache: "no-store"` (SSR) सही यूज़ करो।
3. **Client-Side for Interactivity**: Client-side fetching तभी यूज़ करो जब इंटरैक्टिविटी चाहिए (जैसे live search)।
4. **Error Handling**: try-catch यूज़ करो और यूज़र को प्रॉपर एरर मैसेज दिखाओ।
5. **Revalidation**: डायनामिक डेटा के लिए `next.revalidate` या `revalidatePath` यूज़ करो।

---

## ⚠️ Common Pitfalls

* **Over-fetching on Client**: ज़रूरत से ज़्यादा client-side fetching से UI स्लो हो सकता है।
* **No Caching**: `cache: "no-store"` का गलत यूज़ करने से सर्वर पर लोड बढ़ सकता है।
* **Server Action Misuse**: Server Actions को सिर्फ mutations (POST, PUT) के लिए यूज़ करो, न कि simple GET रिक्वेस्ट्स के लिए।

---

## 📚 Additional Resources

* [Next.js 15 Documentation: Data Fetching](https://nextjs.org/docs/app-router/building-your-application/data-fetching)
* [React 19 Documentation: fetch](https://react.dev/reference/react-dom/server/fetch) for server-side fetching

---