
---

# 🍪 Cookies in Route Handlers (Next.js 15)

---

## ❓ Problem Statement / Use Case

कई बार हमें **user session / auth tokens / preferences** को server-side पर manage करना होता है।
इसके लिए **cookies** best option हैं, और Next.js App Router (15) में **Route Handlers** cookies को **read / set / delete** कर सकते हैं।

लेकिन सिर्फ cookies set करना काफी नहीं है — हमें कई बार पूरे app (या किसी protected section) पर **middleware** use करके authentication check करना पड़ता है।

---

# 🏗️ Using Cookies in Route Handlers

Next.js में cookies manage करने के लिए 2 helpers हैं:

```ts
import { cookies } from "next/headers";
```

---

## 1. ✅ Reading Cookies

```ts
// app/api/cookie-example/route.ts
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");

  return Response.json({
    success: true,
    token: token?.value || "No token found",
  });
}
```

---

## 2. 🍪 Setting Cookies

```ts
// app/api/cookie-example/route.ts
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  cookieStore.set("auth-token", "abc123", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return Response.json({ success: true, message: "Cookie set successfully!" });
}
```

---

## 3. ❌ Deleting Cookies

```ts
// app/api/cookie-example/route.ts
import { cookies } from "next/headers";

export async function DELETE() {
  const cookieStore = cookies();

  cookieStore.delete("auth-token");

  return Response.json({ success: true, message: "Cookie deleted!" });
}
```

---

# 🔐 Example: Auth with Cookies

```
app/api/login/route.ts
```

```ts
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "1234") {
    cookies().set("session", "admin-session", {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return Response.json({ success: true, message: "Login successful" });
  }

  return Response.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}
```

```
app/api/profile/route.ts
```

```ts
import { cookies } from "next/headers";

export async function GET() {
  const session = cookies().get("session");

  if (!session) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ success: true, user: "Admin", session: session.value });
}
```

---

# 🛡️ Middleware + Cookies (Auth Guard)

👉 अब हम **middleware.ts** file बनाएँगे जो हर **/api/secure/** request पर cookie check करेगा।

```
middleware.ts
```

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");

  // अगर session cookie नहीं है → Unauthorized
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized, please login first" },
      { status: 401 }
    );
  }

  // Cookie valid है → request आगे जाने दो
  return NextResponse.next();
}

// सिर्फ /api/secure/* routes को protect करो
export const config = {
  matcher: ["/api/secure/:path*"],
};
```

---

## 🔒 Secure Route Example

```
app/api/secure/data/route.ts
```

```ts
export async function GET() {
  return Response.json({
    success: true,
    secret: "This is protected data!",
  });
}
```

📌 अब `/api/secure/data` पर call करने के लिए **valid session cookie** ज़रूरी है।

---

# 🧪 Testing with Postman / cURL

### 1. Login (set cookie)

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}' \
  -i
```

📌 Response header में `Set-Cookie: session=admin-session` मिलेगा।

---

### 2. Access secure route without cookie

```bash
curl http://localhost:3000/api/secure/data
```

📌 Output: `{ success: false, error: "Unauthorized, please login first" }`

---

### 3. Access secure route with cookie

```bash
curl http://localhost:3000/api/secure/data \
  --cookie "session=admin-session"
```

📌 Output: `{ success: true, secret: "This is protected data!" }`

---

# ✅ Summary

* `cookies()` → cookies को read / set / delete करने के लिए
* `middleware.ts` → route-level auth enforce करने के लिए
* Combined use-case → login पर cookie set → middleware हर secure route पर verify करता है

---

