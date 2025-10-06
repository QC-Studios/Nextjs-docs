
---

# 📘 Project Setup in Next.js 15

---

## ❓ Problem Statement / Use Case

Next.js 15 के साथ नया प्रोजेक्ट शुरू करते समय beginners अक्सर confuse हो जाते हैं:

* कौन सा command चलाना है?
* App Router और Pages Router में फर्क क्या है?
* कौन-कौन से default folders बनते हैं?
* TypeScript setup कैसे करें?

**Goal:** एक structured, maintainable और scalable project foundation बनाना।

---

## ⚙️ Step 1: Create a New Next.js App

Terminal में चलाएँ:

```bash
npx create-next-app@latest my-next-app
```

> यह command ready-to-use Next.js boilerplate project create करता है।

---

## 📦 Step 2: Choose Configuration Options

CLI आपसे options पूछेगा:

```
✔ TypeScript? … Yes
✔ ESLint? … Yes
✔ Tailwind CSS? … Yes
✔ src/ directory? … Yes
✔ App Router (recommended)? … Yes
✔ Import alias? … @/*
```

✅ Recommended options:

| Option       | Recommended | Why                         |
| ------------ | ----------- | --------------------------- |
| TypeScript   | ✅ Yes       | Better type safety          |
| ESLint       | ✅ Yes       | Clean code practices        |
| Tailwind CSS | ✅ Yes       | Fast styling                |
| App Router   | ✅ Yes       | Latest Next.js architecture |
| Import Alias | `@/*`       | Clean imports               |

---

## 📂 Step 3: Folder Structure Overview

Next.js automatically creates:

```
my-next-app/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── favicon.ico
├── public/
│   ├── next.svg
│   └── vercel.svg
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🧩 Step 4: App Router Structure Explained

| File / Folder   | Purpose                                  |
| --------------- | ---------------------------------------- |
| **app/**        | App Router directory (replaces `pages/`) |
| **page.tsx**    | Defines a route (like `/`)               |
| **layout.tsx**  | Shared UI layout across routes           |
| **loading.tsx** | Optional fallback UI while fetching data |
| **error.tsx**   | Optional route-specific error UI         |
| **route.ts**    | Optional API route handler               |
| **public/**     | Static assets (images, fonts, icons)     |

---

## 🧠 Step 5: App Router vs Pages Router

| Feature        | App Router (`app/`)                | Pages Router (`pages/`)                |
| -------------- | ---------------------------------- | -------------------------------------- |
| Rendering      | Server + Client Components         | Client Components only                 |
| Routing Style  | File-based + React conventions     | File-based                             |
| Layouts        | Nested layouts supported           | Not supported                          |
| Data Fetching  | `fetch`, `async`, `server actions` | `getStaticProps`, `getServerSideProps` |
| Future Support | ✅ Default in Next.js 15            | ⚠️ Deprecated soon                     |

> 💡 Recommendation: हमेशा **App Router** का use करें।

---

## 🎨 Step 6: Run Your App

```bash
cd my-next-app
npm run dev
```

Browser में open करें:

```
http://localhost:3000
```

Default Next.js page दिखेगा।

---

## 🧠 Step 7: Optional — Git & Deployment

**Git initialize करें:**

```bash
git init
git add .
git commit -m "Initial Next.js setup"
```

**Vercel deploy:**

```bash
npx vercel
```

> Few steps follow करें और app live हो जाएगा।

---

## 🌍 Real-World Analogy

* `app/` → Building structure
* `layout.tsx` → Common design/layout
* `page.tsx` → अलग-अलग rooms (routes)
* `public/` → Decorative materials (assets)

> Strong foundation → Stable & scalable app

---

## 🪄 Summary

✅ ध्यान रखने वाली मुख्य बातें:

1. Always use **App Router**
2. Enable **TypeScript + Tailwind**
3. Understand **folder roles** clearly

> अब आप आगे `App-Router.md` या `Folder-Convention.md` पढ़ सकते हैं ताकि हर file की role detail में समझ सकें।

---

