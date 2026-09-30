# 🖋️ Mini Blog Website — Full-Stack Developer Platform

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2B%20Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Author](https://img.shields.io/badge/Author-Khushi%20Tyagi-8A2BE2)](https://github.com/TKhushi12)

> A full-stack, responsive publishing platform and tech journal engineered with **React, Node.js, Express, and MongoDB**. Designed with an authentic **Editorial & Tactile Paper aesthetic**, featuring complete post management (CRUD), real-time client state updates without page reload, dynamic keyword search, category filtering, reading time calculation, and resilient error/loading handling.

---

## 🌟 Key Features

* **Full-Stack Post Management (CRUD)**: Create, read, edit, and delete articles with instantaneous client-side UI updates.
* **Refined Editorial Aesthetic**: Designed with a warm ivory paper canvas (`#FAF8F5`), high-contrast serif headlines (`Newsreader`), deep charcoal typography, and subtle card elevation to create an authentic publication feel.
* **Dynamic Search & Category Filtering**: Real-time multi-field querying across post titles, content, categories, and tags.
* **React 18 Reactive State Architecture**: State co-location using native `useState`, `useEffect`, and `useCallback` hooks for optimistic UI updates, clap/like reactions, and modal workflows without page reloads.
* **Automated Content Analytics**: Pre-save Mongoose middleware dynamically generates URL slugs and calculates reading times based on word density (e.g., *"4 min read"*).
* **Robust Error & Loading States**: Skeleton placeholder screens, toast alerts, error banners, and empty search states.
* **Dual MongoDB Engine**: Connects to cloud MongoDB Atlas or gracefully spawns an in-memory database (`mongodb-memory-server`) for instant, zero-configuration local execution.

---

## 🏗️ Architecture & Data Flow

```
                      Client Browser (React 18 + Vite)
                                    │
                                    ▼ Axios
                         Express REST API (Port 5000)
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
       Post CRUD & Search Handlers      Mongoose Data Schema
         (controllers/postController)        (models/Post.js)
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                         MongoDB / In-Memory DB
```

---

## 📡 RESTful API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/posts` | Fetch all articles with optional `?search=` and `?category=` filters |
| `GET` | `/api/posts/:id` | Fetch single article by MongoDB ID or slug |
| `POST` | `/api/posts` | Create and publish a new blog post |
| `PUT` | `/api/posts/:id` | Update an existing blog post |
| `DELETE` | `/api/posts/:id` | Remove a blog post by ID |
| `POST` | `/api/posts/:id/like` | Increment like / applause counter |
| `GET` | `/api/posts/meta/categories` | Get category breakdown and post counts |

---

## 🗄️ Database Schema (`models/Post.js`)

```javascript
{
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: { type: String, maxlength: 300 },
  author: { type: String, default: "Khushi Tyagi" },
  category: { 
    type: String, 
    enum: ["Web Development", "React & Node", "Software Architecture", "Career & Growth", "Personal Journal", "Design & UI"] 
  },
  tags: [String],
  readTime: { type: String, default: "3 min read" },
  coverColor: { type: String, default: "stone" },
  likes: { type: Number, default: 0 },
  timestamps: true
}
```

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)

### 1-Click Launch (Windows)
Simply double-click **`start.bat`** in the root directory. It will boot both the Express server (Port 5000) and the React frontend (Port 5173), then open your browser at **`http://localhost:5173`**.

### Manual Command Line Setup
```bash
# 1. Clone repository
git clone https://github.com/TKhushi12/MiniBlog.git
cd MiniBlog

# 2. Start Backend
cd backend
npm install
npm start

# 3. In a second terminal, start Frontend
cd ../frontend
npm install
npm run dev
```

---

## 🌐 Free Production Deployment

1. **Database**: Create a free **M0 Cluster** on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and copy the connection string.
2. **Backend**: Deploy on [Render.com](https://render.com/) as a Web Service (Root: `backend`, Build: `npm install`, Start: `npm start`, Env: `MONGODB_URI`).
3. **Frontend**: Deploy on [Vercel.com](https://vercel.com/) (Root: `frontend`, Build: `npm run build`, Env: `VITE_API_URL=https://your-backend.onrender.com/api`).

---

## 👩‍💻 Author & Attribution

**Khushi Tyagi**
* **GitHub**: [@TKhushi12](https://github.com/TKhushi12)
* **Email**: [khushi.t9525@gmail.com](mailto:khushi.t9525@gmail.com)
* **Role**: Full-Stack Developer
