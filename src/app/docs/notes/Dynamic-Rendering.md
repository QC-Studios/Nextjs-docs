
---

# 🔵 Dynamic Rendering in Next.js 15

## 📌 Problem Statement / Use Case

कभी-कभी पेज ka data **हर request पर change hota hai** – जैसे:

* Logged-in user ka dashboard
* Stock prices / crypto values
* Personalized recommendations
* Frequently updating database data

ऐसे case me **Static Rendering काम नहीं करेगा** क्योंकि data पुराना हो सकता है।
इसलिए हम **Dynamic Rendering** use करते हैं → हर request par **server-side fetch** होता है aur fresh HTML serve hota hai.

---

## ⚙️ How It Works in Next.js 15

1. `fetch()` call me caching disable kiya jata hai (`cache: "no-store"`).
2. Har request par **server** call hota hai aur fresh HTML generate hota hai.
3. Response prebuild nahi hota → per-request dynamic hota hai.

---

## 📂 Example Project Structure

```
app/
 └── dashboard/
      └── page.tsx
```

---

## 💻 Code Example: `app/dashboard/page.tsx`

```tsx
// app/dashboard/page.tsx
async function getUserData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store", // ⬅️ Dynamic Rendering ke liye important
  });
  return res.json();
}

export default async function DashboardPage() {
  const user = await getUserData();

  return (
    <div>
      <h1>👤 User Dashboard (Dynamic Rendering)</h1>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Company:</b> {user.company.name}</p>
    </div>
  );
}
```

---

## 🛠️ Postman-Style Testing

### 🔹 Request

```http
GET https://yourdomain.com/dashboard
```

### 🔹 Response (Fresh HTML Every Request)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>👤 User Dashboard</title>
  </head>
  <body>
    <h1>👤 User Dashboard (Dynamic Rendering)</h1>
    <p><b>Name:</b> Leanne Graham</p>
    <p><b>Email:</b> Sincere@april.biz</p>
    <p><b>Company:</b> Romaguera-Crona</p>
  </body>
</html>
```

👉 Agar API me data change hota hai, to har refresh me **naya data** milega (unlike static rendering).

---

