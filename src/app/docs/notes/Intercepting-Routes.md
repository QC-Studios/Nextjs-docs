
---

# 📘 Intercepting Routes in Next.js 15

---

## ❓ Problem Statement / Use Case

कई बार हमें चाहिए कि user एक ही page पर रहे लेकिन **कुछ routes को intercept करके अलग UI दिखाएँ**।

उदाहरण:

* किसी dashboard पर रहते हुए user detail modal open करना
* किसी feed पर रहते हुए post का detail modal open करना
* Page छोड़कर navigate करने की बजाय, उसी context में नया content दिखाना

👉 Normal routing में ये possible नहीं है क्योंकि हर बार नया page load हो जाता है।
इसी problem को solve करने के लिए Next.js ने **Intercepting Routes** introduce किया।

---

## 💡 What are Intercepting Routes?

* Intercepting Routes allow you to **render a route in place of another route**।
* आप किसी route को intercept करके उसे modal, drawer या inline component की तरह दिखा सकते हो।
* Syntax: `(..)`

---

## 📂 Folder Structure Example

```bash
app/
 ├── feed/
 │    ├── page.tsx
 │    ├── @modal/
 │    │    ├── (..)post/
 │    │    │     └── [id]/
 │    │    │          └── page.tsx
 └── post/
      └── [id]/
           └── page.tsx
```

---

## 🛠️ Implementation

### 1️⃣ Feed Page

```tsx
// app/feed/page.tsx
export default function FeedPage() {
  return (
    <div>
      <h1>Social Feed</h1>
      <ul>
        <li><a href="/post/1">Post 1</a></li>
        <li><a href="/post/2">Post 2</a></li>
      </ul>
    </div>
  );
}
```

---

### 2️⃣ Post Detail (Normal Route)

```tsx
// app/post/[id]/page.tsx
export default function PostPage({ params }: { params: { id: string } }) {
  return <h2>Full Post View – Post {params.id}</h2>;
}
```

👉 अगर आप `/post/1` visit करेंगे → पूरा page load होगा और Feed छूट जाएगा।

---

### 3️⃣ Intercepting Post Detail in Modal

```tsx
// app/feed/@modal/(..)post/[id]/page.tsx
export default function InterceptedPost({ params }: { params: { id: string } }) {
  return (
    <div style={{
      position: "fixed",
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "20px",
      background: "white",
      border: "1px solid gray",
      borderRadius: "10px",
    }}>
      <h2>📝 Post {params.id} (Modal View)</h2>
    </div>
  );
}
```

👉 अब अगर आप `/feed` पर हों और किसी post link पर क्लिक करें → वो **modal के रूप में open होगा** (feed intact रहेगा)।

---

## ✅ Key Points

1. `( .. )` का मतलब है **parent tree से बाहर का route intercept करना**।
2. यह अक्सर **Parallel Routes** (`@modal`) के साथ use होता है।
3. User का context बना रहता है → जैसे feed open ही रहता है और modal ऊपर आ जाता है।
4. अगर user direct `/post/1` खोले → normal full-page view show होगा।
5. अगर user `/feed` के अंदर से खोले → intercepted modal show होगा।

---

## 🌍 Real World Analogy

सोचो आप **Instagram** पर scroll कर रहे हैं:

* Feed चलता रहता है
* किसी photo पर tap करने पर modal खुलता है
* लेकिन अगर आप उस photo का direct link खोलें → पूरा dedicated page load होगा

👉 यही काम Next.js intercepting routes से होता है।

---

## 🔗 Best Practices

* हमेशा modal/drawer के लिए intercepting routes use करें
* Normal navigation के लिए original routes रखें
* Parallel routes (`@modal`) के साथ combine करें
* UX design में clarity रखें कि कौन सा route intercept होगा और कौन सा normal

---


