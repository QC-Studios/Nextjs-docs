
---

# 🔀 Redirects in Route Handlers (Next.js 15)

---

## ❓ Problem Statement / Use Case

कभी-कभी API या server logic में हमें यूज़र को किसी और route पर भेजना होता है।
जैसे:

* अगर user login नहीं है → `/login` पर redirect कर दो
* किसी पुरानी API को call किया जाए → नई API route पर redirect कर दो
* Form submit के बाद success page पर redirect करना

👉 इसके लिए Next.js App Router में `redirect()` helper आता है।

---

## 🛠️ Using `redirect`

Next.js में `redirect` import होता है:

```ts
import { redirect } from "next/navigation";
```

---

## 🟢 Example 1: Basic Redirect

```
app/api/old/route.ts
```

```ts
import { redirect } from "next/navigation";

export async function GET() {
  // Purana API -> naya API
  redirect("/api/new");
}
```

👉 `/api/old` hit करने पर request directly `/api/new` पर चली जाएगी।

---

## 🟢 Example 2: Conditional Redirect

```
app/api/dashboard/route.ts
```

```ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const session = cookies().get("session");

  if (!session) {
    // Agar login nahi hai -> /login bhej do
    redirect("/login");
  }

  return Response.json({ success: true, message: "Welcome to dashboard!" });
}
```

👉 अगर user के पास `session` cookie नहीं है → उसको `/login` पर redirect कर देंगे।

---

## 🟢 Example 3: POST Redirect (After Form Submission)

```
app/api/submit/route.ts
```

```ts
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const body = await req.json();
  
  // Dummy save logic
  console.log("Form submitted:", body);

  // Save hone ke baad /thank-you par redirect
  redirect("/thank-you");
}
```

👉 Form submit करने के बाद user को **thank-you page** पर ले जाएगा।

---

## 🟢 Example 4: Dynamic Redirect

```
app/api/users/[id]/route.ts
```

```ts
import { redirect } from "next/navigation";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  if (params.id === "1") {
    redirect("/special-user");
  }

  return Response.json({ success: true, userId: params.id });
}
```

👉 अगर user ID `1` है → उसको `/special-user` पर redirect कर दो।

---

## 🧪 Testing with Postman / cURL

### Old → New redirect

```bash
curl -i http://localhost:3000/api/old
```

📌 Response:

```
HTTP/1.1 307 Temporary Redirect
location: /api/new
```

---

### Redirect when no cookie

```bash
curl -i http://localhost:3000/api/dashboard
```

📌 Response:

```
HTTP/1.1 307 Temporary Redirect
location: /login
```

---

### POST redirect

```bash
curl -X POST http://localhost:3000/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Abhay"}' \
  -i
```

📌 Response:

```
HTTP/1.1 303 See Other
location: /thank-you
```

---

## ✅ Summary

* `redirect()` → यूज़र को किसी और route पर भेजने के लिए
* Server-side पर काम करता है (client पर नहीं)
* SEO और API migrations के लिए useful
* By default `307` (temporary) redirect होता है, लेकिन form submissions के बाद `303` भी use हो सकता है

---

