
---

# 📘 Context Providers in Next.js / React

---

## ❓ Problem Statement / Use Case

जब हम React या Next.js में component tree में **state या functions को deeply share** करना चाहते हैं, तो हर level पर props भेजना (prop drilling) tedious और error-prone हो जाता है।

**Example situations:**

* Theme (light/dark) globally access करना
* Authenticated user data हर page/component में use करना
* Cart data या settings share करना

---

## 💡 What are Context Providers?

**React Context API** एक mechanism है जो हमें **state और functions को global level पर provide** करने देता है।

**Key Points:**

* `createContext()` → context बनाता है
* `Provider` → context value set करता है और children components तक पहुँचाता है
* `useContext()` → child components में context access करने के लिए use होता है

---

## 🛠️ Steps / Implementation

### 1️⃣ Create a Context

```tsx
// context/ThemeContext.tsx
import { createContext, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

### 2️⃣ Wrap Your App with Provider

```tsx
// app/layout.tsx
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

> अब **पूरा app** Theme context access कर सकता है।

---

### 3️⃣ Consume Context in Child Component

```tsx
// components/ThemeToggle.tsx
"use client";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeContext must be used within ThemeProvider");

  return (
    <button onClick={context.toggleTheme}>
      Current Theme: {context.theme}
    </button>
  );
}
```

---

## 🌍 Real-World Analogy

* **Context Provider** = Company HR department providing employee info to all departments
* **useContext** = Any department employee accessing the info without asking HR every time

> Shared data centralized → Easy access everywhere

---

## ✅ Best Practices

1. Only put **global or shared state** in context.
2. Avoid putting frequently changing state in global context → performance issue.
3. Use multiple context providers if needed (e.g., AuthContext, ThemeContext).
4. Always wrap components with provider before using `useContext`.

---

## ⚠️ Common Pitfalls

* Forgetting to wrap component with provider → `undefined` error
* Putting large objects or rapidly changing state in context → unnecessary re-renders
* Overusing context for every small state → simpler `useState` is better

---


