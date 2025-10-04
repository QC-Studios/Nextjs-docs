
---

# ⚡ Problem Statement / Use Case

कभी हमें **हर request से पहले logic run करना** पड़ता है – जैसे:

* Authentication check
* Redirect करना (unauthorized users को login पर भेजना)
* Headers / Cookies modify करना
* API security (rate limiting, geo-blocking)

इसके लिए Next.js App Router देता है **Middleware**।

---

# 🏗️ Middleware Basics

### 1. Location

Middleware हमेशा project root में file होती है:

```
middleware.ts
```

---

### 2. Example – Simple Logger

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware triggered:", request.nextUrl.pathname);
  return NextResponse.next(); // आगे route को जाने दो
}
```

📌 जब भी कोई request आएगी → पहले ये middleware चलेगा।

---

### 3. Blocking Unauthorized Access

मान लो `/dashboard` सिर्फ logged-in users के लिए है:

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
```

📌 अगर cookie में `auth-token` नहीं मिला → `/login` पर redirect कर देंगे।

---

### 4. Matching Specific Routes

हर request पर middleware चलाना जरूरी नहीं। आप सिर्फ specific paths match कर सकते हो।

```ts
export const config = {
  matcher: ["/dashboard/:path*", "/api/secure/:path*"],
};
```

📌 अब सिर्फ `/dashboard` और `/api/secure` routes पर ही middleware trigger होगा।

---

### 5. Modify Headers / Response

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Custom header add
  response.headers.set("X-Custom-Header", "Hello-Abhay");

  return response;
}
```

📌 अब हर response में `X-Custom-Header` आ जाएगा।

---

# 🛠 Example: Auth + API Security

```
middleware.ts
```

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Restrict API rate limit (dummy example)
  if (request.nextUrl.pathname.startsWith("/api")) {
    console.log("API Request:", request.nextUrl.pathname);
  }

  // 2. Auth check
  const isLoggedIn = request.cookies.get("session")?.value;
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
```

📌 अब:

* हर `/api` request log होगी
* `/dashboard` पर सिर्फ logged-in users को access मिलेगा

---

# ✅ Summary

* **Middleware** हर request से पहले run होता है
* Auth, logging, headers, redirects → सब handle कर सकते हो
* `matcher` से selective routes पर apply कर सकते हो
* `NextResponse.next()` → request को आगे भेजता है
* `NextResponse.redirect()` → किसी और route पर भेज देता है

---


