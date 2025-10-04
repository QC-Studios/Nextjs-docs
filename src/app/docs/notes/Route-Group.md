

---

# 📘 Route Group in Next.js

---

## ❓ Problem Statement / Use Case

Next.js में कभी-कभी हमें **related routes को logically group** करना होता है, बिना route path बदलें।

उदाहरण:

* `/admin/dashboard`
* `/admin/users`
* `/admin/settings`

अगर हम हर feature के लिए अलग folder बनाते हैं, तो path structure लंबा और repetitive हो जाता है।

**Problem:**

* URLs unnecessarily long हो सकते हैं
* Related routes अलग-अलग folder में scattered हो सकते हैं
* Maintainability कम हो जाती है

---

## 💡 What is a Route Group?

Route Group एक **Next.js feature** है जो हमें **folders को group करने** देता है, **लेकिन URL path में reflect नहीं होने देता**।

**Key Points:**

* Route group folder **parentheses `(groupName)`** में लिखा जाता है
* Folder structure में organize रहता है, URL clean रहता है
* Server/client behavior पर कोई effect नहीं पड़ता

---

## 🛠️ Steps to Implement

### 1️⃣ Folder Structure Example

```
src
 └── app
     ├── (admin)
     │    ├── dashboard
     │    │     └── page.tsx
     │    ├── users
     │    │     └── page.tsx
     │    └── settings
     │          └── page.tsx
     └── home
          └── page.tsx
```

> Notice: `(admin)` → यह **URL में नहीं दिखाई देगा**, लेकिन internally folder group कर रहा है।

---

### 2️⃣ URL vs Folder

| Folder Path                  | URL Path     |
| ---------------------------- | ------------ |
| `(admin)/dashboard/page.tsx` | `/dashboard` |
| `(admin)/users/page.tsx`     | `/users`     |
| `(admin)/settings/page.tsx`  | `/settings`  |
| `home/page.tsx`              | `/home`      |

> Folder group internally organized है, लेकिन URL clean और simple है।

---

## 📝 Example Code

```tsx
// src/app/(admin)/dashboard/page.tsx

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage your users, settings, and reports here.</p>
    </div>
  );
}
```

```tsx
// src/app/(admin)/users/page.tsx

export default function AdminUsers() {
  return (
    <div>
      <h1>Users</h1>
      <p>List of all users.</p>
    </div>
  );
}
```

---

## 🌍 Real-World Analogy

सोचो एक **office building**:

* `(admin)` → Admin department floor
* `dashboard`, `users`, `settings` → अलग rooms
* Visitor को URL में floors नहीं दिखते, लेकिन internal structure organized है

---

## 🪄 Why This is Useful

✅ Related routes **single folder/group में manage** हो सकते हैं
✅ URL structure **clean और user-friendly** रहती है
✅ Project structure **maintainable और scalable** बन जाता है
✅ Useful for large apps with multiple sections

---

## 🔗 Best Practices

1. Route group folder हमेशा **parentheses `(name)`** में रखें
2. Sub-routes को group के अंदर रखें
3. Naming consistent रखें ताकि navigation आसानी से समझ आए



