
---

# 📘 CRUD Example with Route Handlers (Next.js 15)

---

## ⚡ Problem Statement / Use Case

आपके पास पहले से **usersData** नाम का JSON dataset है।
आपको Next.js App Router में एक **API system** बनाना है जो:

* **GET /api/users** → सभी users return करे
* **POST /api/users** → नया user add करे
* **GET /api/users/[id]** → specific user fetch करे
* **PUT /api/users/[id]** → user update करे
* **DELETE /api/users/[id]** → user delete करे

👉 यानी पूरा CRUD flow Next.js **Route Handlers** से cover हो।

---

## 🛠️ Step 1: Static Data File

```
lib/usersData.ts
```

```ts
export interface User {
  id: number;
  Name: string;
  Email: string;
  Age: number;
  Location: string;
  Occupation: string;
}

export let usersData: User[] = [
  {
    id: 1,
    Name: "John Smith",
    Email: "john.smith@email.com",
    Age: 28,
    Location: "New York, USA",
    Occupation: "Software Engineer",
  },
  {
    id: 2,
    Name: "Priya Sharma",
    Email: "priya.sharma@email.com",
    Age: 34,
    Location: "Mumbai, India",
    Occupation: "Marketing Manager",
  },
  {
    id: 3,
    Name: "Alex Johnson",
    Email: "alex.j@email.com",
    Age: 19,
    Location: "London, UK",
    Occupation: "Student",
  },
  {
    id: 4,
    Name: "Maria Gonzalez",
    Email: "maria.gonzalez@email.com",
    Age: 45,
    Location: "Madrid, Spain",
    Occupation: "Teacher",
  },
  {
    id: 5,
    Name: "Chen Wei",
    Email: "chen.wei@email.com",
    Age: 30,
    Location: "Beijing, China",
    Occupation: "Graphic Designer",
  },
];
```

---

## 🛠️ Step 2: Collection Route Handler (`/api/users`)

```
app/api/users/route.ts
```

```ts
import { usersData, User } from "@/lib/usersData";

// GET: Fetch all users
export async function GET() {
  return Response.json({ success: true, users: usersData });
}

// POST: Add new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newUser: User = {
      id: usersData.length + 1,
      ...body,
    };
    usersData.push(newUser);
    return Response.json({ success: true, user: newUser });
  } catch (error) {
    return Response.json({ success: false, error: "Invalid data" }, { status: 400 });
  }
}
```

---

## 🛠️ Step 3: Dynamic Route Handler (`/api/users/[id]`)

```
app/api/users/[id]/route.ts
```

```ts
import { usersData, User } from "@/lib/usersData";

// GET: Fetch single user by id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = usersData.find((u) => u.id === Number(params.id));
  if (!user) {
    return Response.json({ success: false, error: "User not found" }, { status: 404 });
  }
  return Response.json({ success: true, user });
}

// PUT: Update user
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const idx = usersData.findIndex((u) => u.id === Number(params.id));
  if (idx === -1) {
    return Response.json({ success: false, error: "User not found" }, { status: 404 });
  }

  const body = await req.json();
  usersData[idx] = { ...usersData[idx], ...body };
  return Response.json({ success: true, user: usersData[idx] });
}

// DELETE: Remove user
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const idx = usersData.findIndex((u) => u.id === Number(params.id));
  if (idx === -1) {
    return Response.json({ success: false, error: "User not found" }, { status: 404 });
  }

  const deletedUser = usersData.splice(idx, 1);
  return Response.json({ success: true, user: deletedUser[0] });
}
```

## ✅ Testing the Routes (with Postman)


### 1️⃣ GET all users

**Request:**

```
GET http://localhost:3000/api/users
```

**Response (200 OK):**

```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "Name": "John Smith",
      "Email": "john.smith@email.com",
      "Age": 28,
      "Location": "New York, USA",
      "Occupation": "Software Engineer"
    },
    {
      "id": 2,
      "Name": "Priya Sharma",
      "Email": "priya.sharma@email.com",
      "Age": 34,
      "Location": "Mumbai, India",
      "Occupation": "Marketing Manager"
    }
  ]
}
```

---

### 2️⃣ POST new user

**Request:**

```
POST http://localhost:3000/api/users
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "Name": "Abhay Ramteke",
  "Email": "abhay@email.com",
  "Age": 25,
  "Location": "Nagpur, India",
  "Occupation": "Full Stack Developer"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "id": 6,
    "Name": "Abhay Ramteke",
    "Email": "abhay@email.com",
    "Age": 25,
    "Location": "Nagpur, India",
    "Occupation": "Full Stack Developer"
  }
}
```

---

### 3️⃣ GET single user

**Request:**

```
GET http://localhost:3000/api/users/3
```

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "id": 3,
    "Name": "Alex Johnson",
    "Email": "alex.j@email.com",
    "Age": 19,
    "Location": "London, UK",
    "Occupation": "Student"
  }
}
```

**Error (404):**

```json
{
  "success": false,
  "error": "User not found"
}
```

---

### 4️⃣ PUT update user

**Request:**

```
PUT http://localhost:3000/api/users/3
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
  "Age": 22,
  "Occupation": "Intern"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "id": 3,
    "Name": "Alex Johnson",
    "Email": "alex.j@email.com",
    "Age": 22,
    "Location": "London, UK",
    "Occupation": "Intern"
  }
}
```

---

### 5️⃣ DELETE user

**Request:**

```
DELETE http://localhost:3000/api/users/2
```

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "id": 2,
    "Name": "Priya Sharma",
    "Email": "priya.sharma@email.com",
    "Age": 34,
    "Location": "Mumbai, India",
    "Occupation": "Marketing Manager"
  }
}
```

**Error (404):**

```json
{
  "success": false,
  "error": "User not found"
}
```

---

👉 अब Postman में आप ये सारे requests बना सकते हो और responses verify कर सकते हो।

---
