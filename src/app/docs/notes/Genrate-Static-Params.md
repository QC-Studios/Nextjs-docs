
# 📘 Generate Static Params in Next.js 15

---

## ❓ Problem Statement / Use Case

Next.js में जब हम **Dynamic Routes** बनाते हैं (जैसे `[id]` या `[slug]`), तो हमें static pages generate करने के लिए यह पता होना चाहिए कि कौन-कौन से params पहले से generate करने हैं।

👉 Example:
अगर हमारे पास blog posts हैं और उनकी IDs `1, 2, 3` हैं, तो Next.js को बताना होगा कि build time पर इन IDs के लिए static pages generate कर दे।

**Problem:**
अगर हम ये params Next.js को नहीं देंगे, तो वो पता ही नहीं कर पाएगा कि कौन-कौन से pages build time पर generate करने हैं।

---

## 💡 What is `generateStaticParams`?

* यह Next.js का एक **special function** है।
* यह dynamic routes के लिए **static parameters list** return करता है।
* Next.js इन parameters के basis पर static HTML pages build कर देता है।

---

## 📂 Example Folder Structure

```
app/
 └── blog/
      └── [id]/
           └── page.tsx
```

---

## 🛠️ Implementation Steps

### 1️⃣ Define `generateStaticParams`

```tsx
// app/blog/[id]/page.tsx

type BlogParams = {
  id: string;
};

// Step 1: generateStaticParams function
export async function generateStaticParams(): Promise<BlogParams[]> {
  // Normally fetch from DB / API
  const blogIds = ["1", "2", "3"];

  return blogIds.map((id) => ({ id }));
}

// Step 2: Page Component
export default function BlogPage({ params }: { params: BlogParams }) {
  return (
    <div>
      <h1>📝 Blog ID: {params.id}</h1>
      <p>This is the content for blog {params.id}</p>
    </div>
  );
}
```

---

## 🔎 कैसे काम करता है?

1. `generateStaticParams` Next.js को बताता है → **किन params के लिए static pages बनाना है।**
2. Build time पर `/blog/1`, `/blog/2`, `/blog/3` **HTML generate** हो जाएंगे।
3. जब user `/blog/1` खोलेगा → Next.js pre-rendered static page serve करेगा।

---

## 📝 Example Request/Response (Postman Style)

### 🔹 Request

```http
GET https://yourdomain.com/blog/1
```

### 🔹 Response (Build Time Generated Static Page)

```html
<div>
  <h1>📝 Blog ID: 1</h1>
  <p>This is the content for blog 1</p>
</div>
```

---

## 🌍 Real World Analogy

सोचो आपके पास एक **printing press** है।
आप पहले से जानते हो कि आपको **3 किताबें (1,2,3)** print करनी हैं।
तो आप पहले ही उनका **ready stock** बना देते हो।
जब कोई customer आता है → आप उसे **turant ready-made copy** दे देते हो।

👉 यही काम Next.js में `generateStaticParams` करता है।

---

## ✅ Best Practices

1. हमेशा `generateStaticParams` use करो अगर params limited और पहले से पता हों।
2. IDs को DB या API से fetch कर सकते हो।
3. Rarely changing data के लिए ये best है (जैसे blog posts, products)।
4. Dynamic content जो बार-बार बदलता है → उसके लिए `ISR` (Incremental Static Regeneration) या SSR better है।

---

