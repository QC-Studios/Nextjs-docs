
---

# 📘 Private Folder in Next.js

---

## ❓ Problem Statement / Use Case

Next.js में कई बार हमें कुछ files या folders ऐसे चाहिए होते हैं जो **directly user browser से access न कर सके**।
जैसे:

* Server-side helper functions
* Secret configuration files
* Private API logic
* Utility modules

अगर ये files `public` folder या pages/app folder में रखेंगे, तो user सीधे URL से access कर सकता है।

👉 Solution: **Private Folder**

* Files सिर्फ **server-side import** के लिए हो
* Browser में expose न हों
* Security और maintainability improve हो

---

## 💡 What is a Private Folder?

Private Folder एक convention है, Next.js में **server-only files** रखने का तरीका।

**Key Points:**

* कोई भी `.ts` या `.js` file जो **directly page/component नहीं है** उसे `app` folder के अंदर या root level पर private folder में रख सकते हो।
* ये files **import only** होती हैं, कभी भी client bundle में नहीं जाती।
* Browser से direct access impossible।

---

## 🛠️ Steps to Implement

### 1️⃣ Folder Structure Example

```
src
 └── app
     ├── dashboard
     │    └── page.tsx
     └── _private
          ├── utils.ts
          └── auth.ts
```

> `_private` folder का नाम conventionally underscore से शुरू किया गया है, ताकि clearly पता चले कि यह **server-only** है।

---

### 2️⃣ Using Private Files in Pages/Components

```ts
// src/app/_private/auth.ts
export function isAuthenticated(userId: string) {
  // Server-side logic
  return userId === "admin";
}
```

```tsx
// src/app/dashboard/page.tsx
import { isAuthenticated } from "../_private/auth";

export default function Dashboard({ params }: { params: { userId: string } }) {
  const auth = isAuthenticated(params.userId);

  if (!auth) {
    return <div>Access Denied</div>;
  }

  return <div>Welcome Admin!</div>;
}
```

---

## ⚡ Behavior

* `_private/auth.ts` **browser में include नहीं होगा**
* सिर्फ **server-side rendering / server actions** में import होगा
* Direct URL access `/app/_private/auth.ts` → ❌ Not accessible

---

## 🌍 Real-World Analogy

सोचो एक **office building** है:

* Front Desk → सभी visitor देख सकते हैं (public pages)
* Server Room → सिर्फ authorized staff जा सकते हैं (private folder)

Private folder वही Server Room है, जहां user direct नहीं जा सकता, लेकिन server अंदर से use कर सकता है।

---

## 🪄 Why This is Useful

✅ Sensitive logic और helpers **client bundle से hidden** रहते हैं
✅ Project structure **clean और organized** रहती है
✅ Security breach का risk कम होता है
✅ Easily reusable across pages/components without exposing

---

## 🔗 Best Practices

1. **Underscore `_` prefix** रखें, जैसे `_private`, `_utils`
2. **Server-only functions** ही रखें, client-side code यहाँ मत डालो
3. **Never import private folder in client components**

---


