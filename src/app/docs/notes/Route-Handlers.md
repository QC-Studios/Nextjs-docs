
---

## 🟢 Problem Statement (Use Case)

कभी-कभी हमें सिर्फ React pages नहीं चाहिए होते, बल्कि **APIs** भी चाहिए होते हैं app के अंदर:

* Data fetch करने के लिए (`GET`)
* Database में save करने के लिए (`POST`)
* किसी चीज़ को update (`PUT`) या delete (`DELETE`) करने के लिए

👉 पहले हम `pages/api/` folder इस्तेमाल करते थे।
लेकिन App Router (Next.js 13+) में इसके लिए आता है: **Route Handlers**.

---

## 🟢 Concept

* Route Handlers आपको **custom request handlers** define करने देते हैं (API routes जैसा)।
* ये files हमेशा `route.ts` या `route.js` नाम से होती हैं।
* आप हर HTTP method (`GET`, `POST`, `PUT`, `DELETE`) को export कर सकते हो।

---

## 🟢 Example 1 — Simple GET Route

```
app/api/hello/route.ts
```

```ts
export async function GET() {
  return Response.json({ message: "Hello Abhay!" });
}
```

👉 अब जब आप `/api/hello` hit करोगे → आपको JSON response मिलेगा:

```json
{ "message": "Hello Abhay!" }
```

---

## 🟢 Example 2 — Multiple Methods

```
app/api/users/route.ts
```

```ts
export async function GET() {
  return Response.json({ users: ["Aman", "Ravi", "Abhay"] });
}

export async function POST(req: Request) {
  const body = await req.json();
  return Response.json({ user: body, status: "User created!" });
}
```

👉 अब:

* `GET /api/users` → users list देगा
* `POST /api/users` → नया user create करेगा

---

## 🟢 Example 3 — Dynamic Route

```
app/api/users/[id]/route.ts
```

```ts
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return Response.json({ userId: params.id });
}
```

👉 अब `/api/users/123` → `{ "userId": "123" }` return करेगा

---

## 🟢 Benefits

* API और UI code एक ही जगह रहते हैं (no extra Express server).
* TypeScript + modern web APIs का support.
* Edge runtime support (fast + scalable).
* आप आसानी से DB connect करके fullstack बना सकते हो।

---

