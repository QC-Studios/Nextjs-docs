
---

# 🔵 Streaming Rendering in Next.js 15

## 📌 Problem Statement / Use Case

Normal static ya dynamic rendering में पूरा HTML generate होने के बाद ही user को response मिलता है।
लेकिन **heavy data pages** या **multiple slow API calls** में user को wait करना पड़ता है।

👉 **Streaming Rendering** इस problem को solve करता है:

* Page ke parts (chunks) **incrementally render** hote हैं.
* User को **fast feedback** मिलता है (पहले header, फिर list, फिर बाकी).
* Specially useful for:

  * News feed
  * Product listings
  * Dashboards with widgets
  * Long-running APIs

---

## ⚙️ How Streaming Works in Next.js

1. `Suspense` boundaries define karte hain.
2. Har boundary ke andar ka UI alag stream hota hai.
3. Server pahle fast-rendering parts bhejta hai, slow API data aane par baad me bhejta hai.
4. User ko progressively page dikhta hai → pura wait nahi karna padta.

---

## 📂 Example Project Structure

```
app/
 └── news/
      ├── page.tsx
      ├── LatestNews.tsx
      └── TrendingNews.tsx
```

---

## 💻 Code Example

### 🔹 `app/news/LatestNews.tsx`

```tsx
export default async function LatestNews() {
  // Slow API call simulate
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div>
      <h2>📰 Latest News</h2>
      <ul>
        <li>Breaking: Market hits new high!</li>
        <li>Sports: Team A wins championship</li>
        <li>Weather: Sunny across the country</li>
      </ul>
    </div>
  );
}
```

### 🔹 `app/news/TrendingNews.tsx`

```tsx
export default async function TrendingNews() {
  // Simulate another API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div>
      <h2>🔥 Trending Now</h2>
      <ul>
        <li>Celebrity wedding shocks fans</li>
        <li>New iPhone release leaks</li>
      </ul>
    </div>
  );
}
```

### 🔹 `app/news/page.tsx`

```tsx
import { Suspense } from "react";
import LatestNews from "./LatestNews";
import TrendingNews from "./TrendingNews";

export default function NewsPage() {
  return (
    <div>
      <h1>📰 News Portal (Streaming Rendering)</h1>

      {/* Suspense boundaries allow streaming */}
      <Suspense fallback={<p>Loading Trending News...</p>}>
        <TrendingNews />
      </Suspense>

      <Suspense fallback={<p>Loading Latest News...</p>}>
        <LatestNews />
      </Suspense>
    </div>
  );
}
```

---

## 🛠️ Postman-Style Testing

### 🔹 Request

```http
GET https://yourdomain.com/news
```

### 🔹 Response (Incremental Streaming Example)

1️⃣ Immediately user sees:

```html
<h1>📰 News Portal (Streaming Rendering)</h1>
<p>Loading Trending News...</p>
<p>Loading Latest News...</p>
```

2️⃣ After 2 sec (TrendingNews ready):

```html
<div>
  <h2>🔥 Trending Now</h2>
  <ul>
    <li>Celebrity wedding shocks fans</li>
    <li>New iPhone release leaks</li>
  </ul>
</div>
```

3️⃣ After 3 sec (LatestNews ready):

```html
<div>
  <h2>📰 Latest News</h2>
  <ul>
    <li>Breaking: Market hits new high!</li>
    <li>Sports: Team A wins championship</li>
    <li>Weather: Sunny across the country</li>
  </ul>
</div>
```

👉 User ko pura page ek saath wait nahi karna padta → pehle parts show ho jaate hain, baaki progressively stream hote hain.

---

