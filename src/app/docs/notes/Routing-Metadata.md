Perfect 👌 Abhay, मैंने आपके दिए हुए डॉक्यूमेंटेशन में अभी **title (string + object usage)** वाली detail भी include कर दी है। अब ये पूरा और complete है 👇

---

# 📘 Routing Metadata in Next.js

---

## ❓ Problem Statement / Use Case

Next.js में जब हम pages या routes बनाते हैं, तो अक्सर हमें चाहिए:

* Page title और description set करना (SEO के लिए)
* Social media previews (Open Graph / Twitter cards)
* Cache / revalidation settings
* Custom route behavior

**Problem:**

* हर page में manually `<head>` tag modify करना repetitive और error-prone होता है
* Large apps में SEO और metadata consistency maintain करना मुश्किल

---

## 💡 What is Routing Metadata?

Next.js 13+ (और अब v15 तक) में हर **route / page** के लिए आप **metadata object** export कर सकते हो।

**Key Points:**

* Page-specific metadata automatically `<head>` में inject हो जाता है
* Supports `title`, `description`, `openGraph`, `robots`, `icons`, और custom fields
* Server-side और client-side दोनों के लिए काम करता है

---

## 🛠️ Steps to Implement

### 1️⃣ Folder Structure Example

```
src
 └── app
     ├── page.tsx
     └── about
          └── page.tsx
```

---

### 2️⃣ Adding Metadata to Page

```ts
// src/app/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page | My Website",
  description: "Welcome to my website built with Next.js 15",
  openGraph: {
    title: "Home Page | My Website",
    description: "Welcome to my website built with Next.js 15",
    url: "https://mywebsite.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

```tsx
export default function HomePage() {
  return <h1>Welcome to Home Page</h1>;
}
```

* `metadata` object automatically page `<head>` में merge हो जाता है
* Open Graph और SEO tags auto-generate होंगे

---

### 3️⃣ Dynamic Metadata (Optional)

```ts
// src/app/products/[id]/page.tsx
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id); // DB call
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://mywebsite.com/products/${params.id}`,
    },
  };
}
```

* Dynamic metadata के लिए `generateMetadata` function export करें
* हर page visit पर metadata dynamically set होगा

---

## 🔎 Special Focus → Title Usage

`title` को दो तरीके से define किया जा सकता है:

### ✅ 1. String Usage (Basic)

```ts
export const metadata = {
  title: "Home Page",
};
```

👉 Output: `<title>Home Page</title>`

---

### ✅ 2. Object Usage (Advanced)

#### a) Default + Template

```ts
export const metadata = {
  title: {
    default: "My Website",
    template: "%s | My Website",
  },
};
```

👉 `/about` → `<title>About | My Website</title>`
👉 `/` → `<title>My Website</title>`

---

#### b) Only Template

```ts
export const metadata = {
  title: {
    template: "%s | Abhay’s App",
  },
};
```

👉 `/dashboard` → `<title>Dashboard | Abhay’s App</title>`

---

#### c) Absolute Override

```ts
export const metadata = {
  title: {
    absolute: "Admin Dashboard - Abhay",
  },
};
```

👉 `/admin` → `<title>Admin Dashboard - Abhay</title>`
(template ignore हो जाएगा)

---

### ⚖️ Title Precedence Rules

1. अगर page-level `metadata.title` string है → template apply होगा
2. अगर page-level `metadata.title` object है और `absolute` है → template ignore होगा
3. अगर कुछ define नहीं किया गया → parent layout का `default` title use होगा

---

## 🌍 Real-World Analogy

सोचो website pages **book pages** हैं:

* हर page के header में title, summary, thumbnail और index info होती है
* Routing metadata वही info है जो browser और search engines automatically पढ़ते हैं

---

## ✅ Why This is Useful

* SEO और social media sharing optimized रहता है
* Repetitive `<head>` code नहीं लिखना पड़ता
* Large apps में metadata consistency maintain होती है
* Dynamic pages के लिए metadata auto-generate हो सकता है

---

## 🔗 Best Practices

1. हर page के लिए meaningful `title` और `description` set करें
2. Open Graph images use करें (1200x630 recommended)
3. Dynamic pages में `generateMetadata` function use करें
4. Avoid duplicate titles/descriptions
5. Title के लिए advanced object usage adopt करें → scalable apps में ज्यादा control मिलता है

---