
---

# 📘 Layouts in Next.js

---

## ❓ Problem Statement / Use Case

जब आप Next.js में multiple pages बनाते हो, तो अक्सर **common UI structure** होता है, जैसे:

* Header / Navbar
* Footer
* Sidebar
* Shared styling or components

**Problem:**

* अगर हर page में manually header/footer add करो → code repetitive और hard to maintain हो जाएगा
* Large apps में consistency maintain करना मुश्किल हो जाता है

---

## 💡 What is a Layout?

Layout एक **Next.js feature** है जो आपको **shared UI structure** provide करता है।

**Key Points:**

* Layout folder/page automatically pages के लिए wrap करता है
* Nested layouts possible हैं
* Code DRY (Don’t Repeat Yourself) principle follow करता है

---

## 🛠️ Steps to Implement

### 1️⃣ Folder Structure Example

```
src
 └── app
     ├── layout.tsx       // Root layout
     ├── page.tsx         // Home page
     └── dashboard
          ├── layout.tsx  // Nested layout for dashboard
          └── page.tsx
```

---

### 2️⃣ Root Layout (`layout.tsx`)

```tsx
// src/app/layout.tsx
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

* `children` → Page content automatically render होगा
* Header/Footer हर page में appear होगा

---

### 3️⃣ Nested Layout (`dashboard/layout.tsx`)

```tsx
// src/app/dashboard/layout.tsx
import Sidebar from './components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
```

* Nested pages जैसे `/dashboard/analytics` इस layout के अंदर render होंगे

---

### 4️⃣ Page (`dashboard/page.tsx`)

```tsx
export default function DashboardPage() {
  return <div>Welcome to Dashboard!</div>;
}
```

* Automatically wrapped by **DashboardLayout**
* Also wrapped by **RootLayout**

---

## 🌍 Real-World Analogy

सोचो एक **office building**:

* Ground floor → Main entrance, lobby (Root Layout)
* Floor 2 → Dashboard department (Dashboard Layout)
* Rooms inside → Individual pages
* Visitors see common layout (Header/Sidebar), specific page content अलग

---

## 🪄 Why This is Useful

✅ Common UI components **reusable** रहते हैं
✅ Nested layouts से **large apps** scalable बनते हैं
✅ Code repetition कम होता है
✅ Pages automatically wrap होते हैं layouts से

---

## 🔗 Best Practices

1. Root layout में सिर्फ global/common components रखें
2. Nested layout में feature-specific components रखें
3. Always use `children` prop to render page content

---


