
---

# 📘 Multiple Root Layouts in Next.js (Visual Enhanced)

---

## ❓ Problem Statement / Use Case

Next.js में अक्सर हम चाहते हैं कि अलग-अलग sections या domains के लिए **completely अलग root layout** हो।

उदाहरण:

* `/app` → Main website layout (Header, Footer)
* `/admin` → Admin dashboard layout (Sidebar, Admin header)
* `/auth` → Authentication pages layout (Centered login form, no navbar)

**Problem:**

* Single root layout से हर page wrap होगा → unwanted components appear होंगे
* Different sections के लिए layout customize करना मुश्किल हो जाता है

---

## 💡 What is Multiple Root Layout?

Next.js 13+ में आप **multiple root layouts** create कर सकते हैं।

**Key Points:**

* हर **top-level folder** (जैसे `app/admin`, `app/auth`) में अपनी `layout.tsx` रख सकते हो
* URLs automatically उस layout से wrap होंगे
* Root layouts independent होती हैं → अलग styling, components

---

## 🛠️ Folder Structure Example

```
src
 └── app
     ├── layout.tsx         // Main root layout
     ├── page.tsx           // Home page
     ├── admin
     │    ├── layout.tsx    // Admin root layout
     │    └── dashboard
     │          └── page.tsx
     └── auth
          ├── layout.tsx    // Auth root layout
          └── login
                └── page.tsx
```

---

## 📝 Example Code

### 1️⃣ Main Root Layout (`app/layout.tsx`)

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>Main Header</header>
        <main>{children}</main>
        <footer>Main Footer</footer>
      </body>
    </html>
  );
}
```

---

### 2️⃣ Admin Root Layout (`app/admin/layout.tsx`)

```tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex' }}>
        <aside>Sidebar</aside>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

---

### 3️⃣ Auth Root Layout (`app/auth/layout.tsx`)

```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>{children}</div>
      </body>
    </html>
  );
}
```

---

### 4️⃣ Page Example (`app/admin/dashboard/page.tsx`)

```tsx
export default function DashboardPage() {
  return <div>Admin Dashboard Content</div>;
}
```

* Automatically wrapped by **AdminLayout**
* Not affected by Main Root Layout

---

## 🪄 Visual Diagrams

### 1️⃣ Mermaid Folder Tree (Route & Layout hierarchy)

```mermaid
graph TD
  A[app] --> B[layout.tsx (Main Layout)]
  A --> C[page.tsx (Home Page)]
  A --> D[admin]
  D --> E[layout.tsx (Admin Layout)]
  D --> F[dashboard/page.tsx]
  A --> G[auth]
  G --> H[layout.tsx (Auth Layout)]
  G --> I[login/page.tsx]
```


## 🌍 Real-World Analogy

सोचो एक **multi-building campus**:

* Main building → General visitors, info center (Main layout)
* Admin building → Staff-only section, sidebar navigation (Admin layout)
* Auth building → Login/Registration lobby, no header/footer (Auth layout)

हर building का **root structure अलग**, लेकिन internal rooms (pages) normal render होते हैं।

---

## ✅ Why This is Useful

* Different sections के लिए independent layouts
* Code maintainable और clean रहती है
* Large apps में section-specific UI आसानी से manage होती है
* Global components unwanted sections में appear नहीं होते

---

## 🔗 Best Practices

1. हर top-level folder में `layout.tsx` रखें
2. Shared components (Header/Footer) सिर्फ relevant root layout में add करें
3. Nested pages automatically उस root layout के अंदर render होंगे

---

