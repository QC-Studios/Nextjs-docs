---

# 📘 Client Only in Next.js 15

---

## ❓ Problem Statement / Use Case

Next.js में **default rendering Server-Side होती है**।
लेकिन कभी-कभी हमें ऐसा code लिखना पड़ता है जो सिर्फ **browser/client पर ही चले**:

* `window`, `document`, या `localStorage` का use
* UI libraries (जैसे chart.js, three.js)
* Event listeners (scroll, resize, click outside)
* State management (Redux, Zustand)

👉 अगर ये code server पर execute हो गया → **error** आएगा (`window is not defined`)।

---

## 💡 What is Client-Only Rendering?

Next.js हमें `"use client"` directive देता है।
जब आप किसी file की पहली line में `"use client"` लिखते हो:

* वो file एक **Client Component** बन जाती है
* Server उस code को render नहीं करेगा
* वो component सिर्फ **browser bundle** में जाता है

---

## 🛠️ Implementation

### 1️⃣ Client Only Component

```tsx
// app/components/LocalStorageExample.tsx
"use client";

import { useState, useEffect } from "react";

export default function LocalStorageExample() {
  const [name, setName] = useState("");

  useEffect(() => {
    // ✅ This runs only on client
    const saved = localStorage.getItem("name");
    if (saved) setName(saved);
  }, []);

  return (
    <div>
      <h2>👋 Hello, {name || "Guest"}</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          localStorage.setItem("name", e.target.value);
        }}
        placeholder="Enter your name"
      />
    </div>
  );
}
```

👉 `"use client"` directive डालने से यह component client-only हो गया।

---

### 2️⃣ Use in a Page (Server + Client Mix)

```tsx
// app/page.tsx (Server Component by default)
import LocalStorageExample from "./components/LocalStorageExample";

export default function HomePage() {
  return (
    <div>
      <h1>🏠 Home Page</h1>
      <LocalStorageExample />
    </div>
  );
}
```

👉 Page अभी भी server rendered है, लेकिन उसमें embedded client component है।

---

## 🌍 Real World Analogy

सोचो आप **office building** में हो:

* Server Components = Backend office staff (जो internal काम करते हैं)
* Client Components = Reception desk (जो directly visitor से interact करता है)

👉 Reception पर सिर्फ वही लोग बैठ सकते हैं जो **client facing काम** जानते हैं।

---

## ✅ Best Practices

1. केवल ज़रूरत पड़ने पर `"use client"` लिखें (unnecessary client components performance slow करते हैं)।
2. Heavy UI libraries को client-only बनाएं।
3. Business logic और data fetching server components में रखें।
4. Client components को **छोटा और interactive UI पर focus** रखें।

---

क्या आप चाहोगे कि मैं आपको एक **combined example (Server + Client Only + Server Only)** बनाकर दिखाऊँ, जिससे पूरा flow clear हो जाए?
