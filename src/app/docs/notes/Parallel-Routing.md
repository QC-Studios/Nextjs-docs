
---

# 📘 Parallel Routes in Next.js 15

---

## ❓ Problem Statement / Use Case

कभी-कभी हमें एक ही page पर **multiple sections** render करने की ज़रूरत होती है, और हर section का अपना route / data flow होना चाहिए।

उदाहरण:

* एक **Dashboard** page जिसमें sidebar, main content और notifications panel हों।
* एक ही URL पर रहते हुए अलग-अलग sections independently load और navigate कर सकें।

👉 Normal nested routing में ये possible नहीं है क्योंकि हर folder → single `page.tsx` से bind होता है।
इसको solve करने के लिए Next.js ने **Parallel Routes** introduce किया।

---

## 💡 What are Parallel Routes?

Parallel routes allow you to define **multiple named slots** inside a layout, और हर slot independently render हो सकता है।

* Slots को **`@folderName`** syntax से define किया जाता है।
* Layout file में इन slots को props की तरह access करके render करते हैं।
* हर slot का अपना route tree होता है।

---

## 📂 Example Folder Structure

```bash
app/
 ├── dashboard/
 │    ├── layout.tsx
 │    ├── @analytics/
 │    │    └── page.tsx
 │    ├── @team/
 │    │    └── page.tsx
 │    └── @activity/
 │         └── page.tsx
```

---

## 🛠️ Implementation

### 1️⃣ Layout with Slots

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  analytics,
  team,
  activity,
}: {
  analytics: React.ReactNode;
  team: React.ReactNode;
  activity: React.ReactNode;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
      <div>
        <h2>📊 Analytics</h2>
        {analytics}
      </div>
      <div>
        <h2>👥 Team</h2>
        {team}
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <h2>📝 Activity</h2>
        {activity}
      </div>
    </div>
  );
}
```

---

### 2️⃣ Slot Pages

```tsx
// app/dashboard/@analytics/page.tsx
export default function AnalyticsPage() {
  return <p>Analytics data goes here</p>;
}
```

```tsx
// app/dashboard/@team/page.tsx
export default function TeamPage() {
  return <p>Team members list goes here</p>;
}
```

```tsx
// app/dashboard/@activity/page.tsx
export default function ActivityPage() {
  return <p>Recent activity feed goes here</p>;
}
```

---

## 🧑‍💻 Result

जब आप `/dashboard` visit करेंगे:

* `layout.tsx` render होगा
* साथ ही तीनों slots (`@analytics`, `@team`, `@activity`) अपने content के साथ load होंगे

---

## 🌍 Real World Analogy

सोचो एक **newspaper** का front page:

* Left column = headlines
* Right column = ads
* Bottom section = sports news

👉 हर section independent source से आता है, लेकिन एक ही page पर दिखता है। Parallel Routes भी ऐसा ही काम करते हैं।

---

## 🔗 Best Practices

1. Slots का नाम meaningful रखें (`@analytics`, `@team`, etc.)
2. Layout को flexible design करें ताकि slots adjust हो सकें।
3. Combine with **Intercepting Routes** (e.g., modal for activity details)।

---


