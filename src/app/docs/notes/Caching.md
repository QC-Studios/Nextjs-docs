
---

# 📌 Problem Statement / Use Case

जब हम **API बनाते हैं Route Handlers से** (जैसे `/api/users`), तो हर बार request पर fresh response देना ज़रूरी नहीं होता।
कभी-कभी:

* Data कम change होता है → तो response cache करना better है
* Sensitive/private data → तो caching disable करनी चाहिए
* CDN/Browser performance improve करना → तो caching headers set करने पड़ते हैं

Next.js 15 आपको **server-level caching + HTTP headers** के जरिए पूरा control देता है।

---

# 🏗️ Steps

### 1. Default Behavior

By default, Next.js route handlers **no-store** caching use करते हैं (मतलब हर बार fresh fetch होगा)।
इसलिए हमें खुद specify करना पड़ता है अगर cache चाहिए।

---

### 2. Response Headers के साथ Cache-Control

```ts
// app/api/cache-example/route.ts
export async function GET() {
  const data = { time: new Date().toISOString() };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
  });
}
```

🔎 Explanation:

* **public** → cache shared (browser + CDN)
* **s-maxage=60** → 60 seconds तक cache valid
* **stale-while-revalidate=30** → अगर cache expire हो जाए तो भी 30 sec तक पुराना serve कर सकता है और background में नया fetch होगा

📌 Postman में हर बार call करने पर same timestamp ~60 sec तक दिखेगा।

---

### 3. No-Cache (Sensitive Data)

अगर आपको data हमेशा fresh चाहिए (जैसे users, payments, auth data), तो:

```ts
export async function GET() {
  return new Response(JSON.stringify({ secret: "live-data" }), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
```

📌 हर request पर नया response मिलेगा।

---

### 4. Revalidate API (On-Demand)

Next.js **revalidatePath** और **revalidateTag** देता है dynamic data invalidate करने के लिए।

Example:

```ts
import { revalidatePath } from "next/cache";

export async function POST() {
  // मान लो DB update हुआ
  await revalidatePath("/api/cache-example"); 

  return Response.json({ revalidated: true });
}
```

अब जब भी DB update होगा, आप इस POST API को hit कर सकते हो → और cached version invalidate हो जाएगा।

---

### 5. Example With Database Query

```ts
// app/api/users/route.ts
import { usersData } from "@/lib/usersData";

export async function GET() {
  return new Response(JSON.stringify(usersData), {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=120, stale-while-revalidate=60",
    },
  });
}
```

📌 Users list अब 2 minute तक cache होगी और background में refresh होती रहेगी।

---

# ✅ Summary

* **Cache-Control headers** = caching behavior control करने का तरीका
* **no-store** → sensitive data (default)
* **s-maxage / max-age** → performance improve करने के लिए
* **stale-while-revalidate** → पुराने cache से भी fast serve कर सकते हैं
* **revalidatePath / revalidateTag** → dynamic invalidation

---


