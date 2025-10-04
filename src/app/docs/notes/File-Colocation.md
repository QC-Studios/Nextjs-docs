
---

# 📘 File Colocation in Next.js

---

## ❓ Problem Statement / Use Case

Next.js में कई बार आपके पास एक **feature या component** होता है जिसमें:

* Page logic
* Styles (CSS/SCSS)
* API calls / server actions
* Subcomponents

इन सभी को अलग-अलग folders/files में रखने से project structure **complex और scattered** हो जाता है।

👉 Solution: **File Colocation**

* Related files को एक ही folder में रखें।
* हर feature या page के लिए code centralized हो।
* Navigation और maintenance आसान हो जाता है।

---

## 💡 What is File Colocation?

File Colocation मतलब: **एक folder के अंदर सभी related files रखना**।

Example structure for a page called `Dashboard`:

```
src
 └── app
     └── dashboard
         ├── page.tsx        // Page component
         ├── Dashboard.module.css  // Styles
         ├── actions.ts      // Server actions / API calls
         └── components
             └── Widget.tsx  // Subcomponents
```

---

## 🛠️ Benefits

1. **Better organization** → हर page/feature के लिए सभी files एक जगह
2. **Easier maintenance** → किसी feature पर काम करना आसान
3. **Less import confusion** → relative paths short
4. **Scalable** → Large apps में feature folder आसानी से manage हो जाता है

---

## 📝 Example Code

### 1️⃣ Page Component (`page.tsx`)

```tsx
import React from "react";
import styles from "./Dashboard.module.css";
import Widget from "./components/Widget";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <Widget />
    </div>
  );
}
```

### 2️⃣ Component (`components/Widget.tsx`)

```tsx
export default function Widget() {
  return <div>Widget Content</div>;
}
```

### 3️⃣ Styles (`Dashboard.module.css`)

```css
.container {
  padding: 20px;
  background-color: #f0f0f0;
}
```

---

## 🌍 Real-World Analogy

सोचो एक **office project folder** में हर department का folder है:

```
Finance
 ├── budget.xlsx
 ├── reports.docx
 └── charts.pptx

Marketing
 ├── campaign.docx
 ├── ads.png
 └── strategy.pdf
```

* हर department की सभी related files एक ही जगह
* जल्दी locate कर सकते हो, कोई confusion नहीं

File Colocation भी उसी तरह **feature-based grouping** है।

---

## ⚡ Best Practices

1. Page/feature folder के अंदर ही **subcomponents, styles, API files** रखो।
2. Naming consistent रखो (`page.tsx`, `actions.ts`, `ComponentName.tsx`)
3. Avoid global CSS in favor of **module CSS / colocation CSS**

---

