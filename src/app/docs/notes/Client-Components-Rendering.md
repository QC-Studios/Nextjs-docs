
---

# 🖥️ Client Components Rendering in Next.js 15

---

## ❓ Problem Statement / Use Case

Next.js 15 by default **Server Components** use करता है (lightweight, fast).
लेकिन कुछ cases में हमें **client-side interactivity** चाहिए:

* State management (`useState`, `useReducer`)
* Effects (`useEffect`)
* Event handlers (onClick, onChange)
* Browser APIs (localStorage, window, document)
* 3rd-party UI libraries (charts, maps, modals)

👉 यानि हमें ऐसे components चाहिए जो **browser me render ho aur JS bundle ke sath hydrate ho**.

---

## 💡 What are Client Components?

* Components that explicitly start with `"use client"` directive.
* Browser ke andar render hote हैं aur interactivity provide karte हैं.
* Server Components ke andar **nest** ho sakte हैं.

---

## 📂 Example Folder Structure

```
app/
 ├── page.tsx            // Server Component
 ├── components/
 │    ├── Counter.tsx    // Client Component
 │    └── ThemeSwitcher.tsx // Client Component
```

---

## 💻 Example

### 🔹 Client Component (`Counter.tsx`)

```tsx
"use client"; // client component directive
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>🔢 Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>➕ Increment</button>
    </div>
  );
}
```

✅ `"use client"` directive → अब ये client-side bundle me jaayega.
✅ React hooks (`useState`) aur events handle honge.

---

### 🔹 Server Component Using Client Component (`page.tsx`)

```tsx
import Counter from "./components/Counter";

export default function HomePage() {
  return (
    <div>
      <h1>👋 Welcome to Client Components Rendering</h1>
      <Counter /> {/* Client Component */}
    </div>
  );
}
```

✅ `HomePage` ek **Server Component** hai.
✅ Iske andar `Counter` (Client Component) render hua.
✅ Server + Client combo ready.

---

### 🔹 Another Client Component (Browser API)

```tsx
"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <h2>🎨 Theme Switcher</h2>
      <button onClick={() => setTheme("light")}>☀️ Light</button>
      <button onClick={() => setTheme("dark")}>🌙 Dark</button>
    </div>
  );
}
```

✅ Browser API (`document.body`) client-side ke liye perfect hai.

---

## 🌍 Real World Analogy

* **Server Components** = Kitchen me cooking (user ko sirf output milega).
* **Client Components** = Table-side salt/pepper shakers (user khud interact karega).

---

## ✅ Why Client Components are Useful

* User interactivity enable karte hain (forms, buttons, modals).
* Hooks aur effects chalane ke liye zaroori.
* External libraries ke sath integrate karne ke liye (Charts.js, Leaflet, etc.).

---

## 🔗 Best Practices

1. **Default server components use karo** → better performance.
2. Sirf wahi components `"use client"` banao jinko actual browser interactivity chahiye.
3. Heavy UI logic ko server side hi rakho, client bundle lightweight rakho.
4. Client components ko server components ke andar nest karna best approach hai.

---

