✅ **Context Providers (Next.js 15 + React 19)**

In Next.js (built on React), **Context Providers** are used to share data across multiple components without manually passing props down the component tree.

---

### 🔹 What are Context Providers?

* A **Context Provider** is created with `React.createContext()` and supplies a value to any nested components (consumers).
* Great for **global state**, like theme, authentication, or user preferences.
* In Next.js, you often wrap providers inside a **Root Layout** (`layout.tsx`) so all pages can access them.

---

### 🔹 Example: Theme Context in Next.js 15

```tsx
// theme-context.tsx
"use client"; // Context must be a client component

import { createContext, useContext, useState, ReactNode } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
```

---

### 🔹 Usage in `layout.tsx`

```tsx
// app/layout.tsx
import { ThemeProvider } from "./theme-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### 🔹 Usage in a Component

```tsx
// app/page.tsx
"use client";
import { useTheme } from "./theme-context";

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>Current theme: {theme}</h1>
      <button onClick={toggleTheme}>Switch Theme</button>
    </div>
  );
}
```

---

⚡ **Key Point in Next.js 15:**

* Context Providers must be **Client Components** (`"use client"`) because they rely on React state/hooks.
* You usually wrap them at the **Root Layout level** so all routes share the same context.

---

Would you like me to also list **all common Context Providers use cases in Next.js apps** (like Auth, Theme, User, Language, etc.)?
