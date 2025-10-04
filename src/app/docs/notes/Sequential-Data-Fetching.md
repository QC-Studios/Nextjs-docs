
# 📘 Sequential Data Fetching in Next.js 15

---

## ❓ Problem Statement / Use Case

कई बार pages पर हमें **multiple API calls** करने पड़ते हैं, और कुछ calls **dusre ke data pe depend** करते हैं।

**Problem:**

* Agar calls parallel me run kiye → dependent data miss हो सकता है
* Sequential execution control karna hard hota hai without async/await

**Use Case:**

* User details fetch → fir uske orders fetch
* Product fetch → fir uske reviews fetch
* Authentication token fetch → fir private data fetch

---

## 💡 What is Sequential Data Fetching?

* Multiple fetch calls **step-by-step** execute होते हैं
* Pehle ka result dusre fetch me use hota hai
* Server Components + async/await ke sath easy implement

---

## 🛠️ Implementation

### 1️⃣ Example: Fetch User → Fetch Orders

```ts
// app/users/[id]/page.tsx
interface Params {
  params: { id: string };
}

async function getUser(id: string) {
  const res = await fetch(`https://fakestoreapi.com/users/${id}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}

async function getUserOrders(userId: string) {
  const res = await fetch(`https://fakestoreapi.com/orders?userId=${userId}`);
  if (!res.ok) throw new Error("Orders not found");
  return res.json();
}

export default async function UserPage({ params }: Params) {
  // 1️⃣ First fetch user
  const user = await getUser(params.id);

  // 2️⃣ Then fetch user's orders
  const orders = await getUserOrders(user.id);

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <h2>Orders:</h2>
      <ul>
        {orders.map((o: any) => (
          <li key={o.id}>{o.productTitle} - ${o.price}</li>
        ))}
      </ul>
    </div>
  );
}
```

> Sequential fetching ensures **data dependencies are respected**.

---

### 2️⃣ Sequential vs Parallel

| Fetch Pattern | Pros                    | Cons                               |
| ------------- | ----------------------- | ---------------------------------- |
| Sequential    | Correct data dependency | Slower total execution             |
| Parallel      | Fastest                 | Cannot use dependent data directly |

---

## 🌍 Real-World Analogy

* Sequential = Pehle chef prepares appetizer, fir main course, fir dessert
* Parallel = Chef tries sari dishes ek saath cook kare → timing mismatch ho sakta hai

---

## ✅ Best Practices

1. Only sequential fetch use kare **jab dependency ho**
2. Independent APIs → parallel fetch use kare (`Promise.all`)
3. Always error handling kare har step me
4. Server Components ke sath async/await naturally support

---

