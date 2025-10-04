
---

# 📘 Templates in Next.js 15

---

## ❓ Problem Statement / Use Case

जब हम Next.js apps बनाते हैं, तो अक्सर कुछ UI parts (जैसे header, footer, sidebar) हर page पर repeat होते हैं।

इसके लिए हम **Layouts** use कर सकते हैं।
लेकिन problem ये है कि:

* Layout **persist** होता है जब pages change होते हैं → मतलब state, DOM और UI re-use होते हैं।
* कई बार हमें चाहिए कि page change होते ही **पूरे UI का fresh re-render** हो (जैसे modals, forms, animations reset हों)।

**Problem:**

* केवल Layout से हर बार fresh render करना possible नहीं है।
* Persistent layout unwanted state carry कर सकता है।

---

## 💡 What are Templates?

Next.js 15 में **Templates** Layout जैसे ही होते हैं, लेकिन:

👉 हर बार route बदलते ही **Template re-render होता है** (Layout persistent रहता है)।

**Key Points:**

* Templates = Non-persistent layouts
* हर page navigation पर नया DOM tree render होता है
* Useful for pages जहाँ UI state reset होना जरूरी है

---

## 🛠️ Steps to Implement

### 1️⃣ Folder Structure Example

```
src
 └── app
     ├── dashboard
     │    ├── template.tsx
     │    └── page.tsx
     └── settings
          ├── template.tsx
          └── page.tsx
```

---

### 2️⃣ Creating a Template

```tsx
// src/app/dashboard/template.tsx
export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>📊 Dashboard Header</header>
      <main>{children}</main>
      <footer>Footer info</footer>
    </div>
  );
}
```

👉 अब हर बार जब dashboard के अंदर कोई route change होगा, ये template fresh render होगा।

---

### 3️⃣ Example with Form Reset

```tsx
// src/app/settings/template.tsx
export default function SettingsTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>User Settings</h1>
      <section>{children}</section>
    </div>
  );
}
```

```tsx
// src/app/settings/profile/page.tsx
"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");

  return (
    <form>
      <label>Name: </label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </form>
  );
}
```

👉 जब आप `/settings/profile` से `/settings/security` पर जाएंगे → Template re-render होगा → form reset हो जाएगा।

---

## 🌍 Real-World Analogy

सोचो आप एक **exam paper** solve कर रहे हो।

* **Layout** = वही exam hall → आप question बदलते हो तो hall वही रहता है।
* **Template** = नया exam hall → हर बार hall reset होता है ताकि आप fresh start कर सको।

---

## ✅ Why This is Useful

* Page-level state और UI हर बार reset होता है
* Animations, forms, और modals सही से दोबारा mount होते हैं
* बेहतर UX मिलता है जब हर page fresh लगे
* Layout की तरह दिखता है, लेकिन behavior अलग है

---

## 🔗 Best Practices

1. Templates का use वहीं करें जहाँ UI हर बार reset होना चाहिए।
2. Global navigation या sidebar के लिए Layout use करें, Templates नहीं।
3. Expensive components (जैसे charts, maps) को Template में avoid करें → बार-बार remount costly होगा।
4. Forms, modals, और animations वाले pages Templates के लिए best candidates हैं।

---

