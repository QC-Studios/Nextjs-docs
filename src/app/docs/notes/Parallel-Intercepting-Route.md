
* **Parallel Routes** → dashboard ke multiple independent sections
* **Intercepting Routes** → modal me detail open karna
* **Default.tsx** → jab slot empty ho tab fallback UI

---

# 📘 Combined Example – Dashboard with Modal

---

## 📂 Folder Structure

```bash
app/
 ├── dashboard/
 │    ├── layout.tsx
 │    ├── page.tsx
 │    ├── @team/
 │    │    ├── page.tsx
 │    │    └── default.tsx
 │    └── @modal/
 │         ├── default.tsx
 │         └── (..)member/
 │              └── [id]/
 │                   └── page.tsx
 └── member/
      └── [id]/
           └── page.tsx
```

---

## 🛠️ Step by Step

### 1️⃣ Dashboard Layout

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  team,
  modal,
}: {
  children: React.ReactNode;
  team: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
      <div>
        <h1>📊 Dashboard</h1>
        {children}
      </div>
      <div>
        <h2>👥 Team</h2>
        {team}
      </div>

      {/* Modal slot (overlay style) */}
      {modal}
    </div>
  );
}
```

---

### 2️⃣ Dashboard Page

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return <p>Welcome to your dashboard!</p>;
}
```

---

### 3️⃣ Team Slot (Parallel Route + Default)

```tsx
// app/dashboard/@team/page.tsx
export default function TeamPage() {
  return (
    <ul>
      <li><a href="/member/1">Member 1</a></li>
      <li><a href="/member/2">Member 2</a></li>
    </ul>
  );
}
```

```tsx
// app/dashboard/@team/default.tsx
export default function DefaultTeam() {
  return <p>No team loaded yet</p>;
}
```

---

### 4️⃣ Member Detail (Normal Route)

```tsx
// app/member/[id]/page.tsx
export default function MemberPage({ params }: { params: { id: string } }) {
  return <h2>Full Member Profile – {params.id}</h2>;
}
```

👉 अगर user `/member/1` direct visit करेगा → पूरा dedicated member profile page खुलेगा।

---

### 5️⃣ Intercepted Member Detail (Modal on Dashboard)

```tsx
// app/dashboard/@modal/(..)member/[id]/page.tsx
export default function InterceptedMember({ params }: { params: { id: string } }) {
  return (
    <div style={{
      position: "fixed",
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "white",
      padding: "20px",
      border: "2px solid black",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
    }}>
      <h3>👤 Member {params.id} (Modal View)</h3>
      <p>This is an intercepted modal inside Dashboard</p>
      <a href="/dashboard">❌ Close</a>
    </div>
  );
}
```

```tsx
// app/dashboard/@modal/default.tsx
export default function DefaultModal() {
  return null; // no modal open by default
}
```

---

## 🧑‍💻 Behavior

1. `/dashboard` → Dashboard + "No team loaded" message (default.tsx)
2. `/dashboard` + Team slot → Shows team list
3. Click `Member 1` → Instead of leaving dashboard, modal opens (`Intercepting Route`)
4. Directly open `/member/1` → Full profile page (not modal)

---

## ✅ Why This is Powerful

* **Parallel Routes** → dashboard ke multiple sections independently load hote hain
* **Default.tsx** → fallback UI jab koi slot empty ho
* **Intercepting Routes** → modal ke through context preserve karte hain, bina page leave kiye



## 🟢 Problem Statement (Use Case)

कभी-कभी हमें **किसी route को open करना होता है लेकिन पूरा navigation change नहीं करना** चाहिए।
जैसे:

* User profile `/user/[id]` पर click करो तो वो **modal (popup)** में open हो।
* लेकिन अगर directly `/user/123` URL पर जाओ तो वो **full page** में open हो।

👉 मतलब: **same route अलग-अलग तरीके से render होना चाहिए depending on navigation context.**
इसीको Next.js में कहते हैं **Intercepting Routes**.

---

## 🟢 Concept

Next.js में हम यह achieve करते हैं **special folder naming convention** से:

* `(..)` → एक level ऊपर की route को intercept करना
* `(..)(..)` → दो level ऊपर की route को intercept करना
* `(...)` → पूरे app की root से intercept करना

---

## 🟢 Example

मान लो हमारी app में है:

```
app/
 ├── feed/
 │    ├── page.tsx        // Feed page
 │    ├── @modal/         // Parallel route (for modals)
 │    └── @modal/(..)user/[id]/page.tsx   // Intercepted route
 ├── user/
 │    └── [id]/
 │         └── page.tsx   // Normal user profile page
```

---

### 1. Normal Navigation

* अगर user `/user/123` URL पर direct जाता है →
  पूरा profile page render होगा (जैसे default behavior).

---

### 2. Feed से Navigation

* अगर user `/feed` पर है और किसी profile link (`/user/123`) पर click करता है →
  Instead of replacing the whole page, Next.js `(..)user/[id]/page.tsx` load करेगा
  और उसे **modal slot (`@modal`)** में render करेगा।

---

## 🟢 Benefits

* Same component दो context में use होता है:

  * Full page
  * Modal popup
* कोई duplicate code नहीं
* UX smooth रहता है (Twitter, Instagram जैसे apps में यही होता है).

---


