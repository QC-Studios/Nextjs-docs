
---

# 📌 Problem Statement / Use Case

कभी-कभी हमें **request** और **response** के साथ काम करते समय extra metadata चाहिए होता है – जैसे:

* Authentication tokens
* Custom headers (जैसे API keys, client type, request source आदि)
* Response headers (जैसे caching, content-type, cookies आदि)

Next.js के **Route Handlers** में हम आसानी से headers को **read** और **set** कर सकते हैं।

---

# 🏗️ Steps

### 1. Headers को Import करना

```ts
import { headers } from "next/headers";
```

यह आपको request के headers object तक access देता है।

---

### 2. Request Headers Read करना

Example: User agent और custom header पढ़ना

```ts
// app/api/headers-example/route.ts
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  const customHeader = headersList.get("x-custom-header");

  return Response.json({
    message: "Headers fetched successfully",
    userAgent,
    customHeader,
  });
}
```

📌 अब अगर आप Postman में **GET** request मारोगे:

* `http://localhost:3000/api/headers-example`
* Headers में `x-custom-header: abhay-demo` भेजो

Response मिलेगा:

```json
{
  "message": "Headers fetched successfully",
  "userAgent": "PostmanRuntime/7.39.0",
  "customHeader": "abhay-demo"
}
```

---

### 3. Response Headers Set करना

```ts
// app/api/headers-example/route.ts
export async function GET() {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "x-powered-by": "Next.js 15",
      "Cache-Control": "no-store",
    },
  });
}
```

📌 अब response में ये headers दिखेंगे:

```
Content-Type: application/json
x-powered-by: Next.js 15
Cache-Control: no-store
```

---

### 4. Headers With POST Request

```ts
// app/api/headers-example/route.ts
import { headers } from "next/headers";

export async function POST(req: Request) {
  const headersList = headers();
  const apiKey = headersList.get("x-api-key");

  if (apiKey !== "secret123") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();

  return new Response(JSON.stringify({ message: "Data accepted", body }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
```

📌 **Postman Example**:

* URL: `http://localhost:3000/api/headers-example`
* Method: POST
* Headers:

  ```
  x-api-key: secret123
  ```
* Body (JSON):

  ```json
  { "name": "Abhay", "role": "Developer" }
  ```

Response:

```json
{
  "message": "Data accepted",
  "body": {
    "name": "Abhay",
    "role": "Developer"
  }
}
```

अगर गलत API key भेजी तो 401 Unauthorized मिलेगा।

---

# ✅ Summary

* **headers()** → request headers read करने के लिए।
* **Response headers** → response में custom metadata या caching rules देने के लिए।
* Auth, caching, और security ke liye सबसे useful।

---

