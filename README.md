# 📝 Medium-Style Blogging Platform (Full Stack, AI-Powered)

A full-stack blogging platform inspired by Medium, built with the MERN stack. It combines a rich-text writing experience with performance-focused backend design and AI-assisted features.

🔗 **Live Demo:** [your-link-here](#)

## ✨ Highlights

- **Rich-text editor** with content stored as structured JSON (safer than raw HTML)
- **Auth & security:** HTTP-only cookies, short-lived access tokens, refresh-token rotation
- **Optimized MongoDB:** relational Mongoose schemas (User, Post, Comment), indexes on slug, tags, createdAt
- **Trending posts** using MongoDB aggregation pipelines
- **Pagination, filtering & text search** handled on the backend
- **Fast UI:** TanStack Query caching and optimistic like updates with rollback
- **Real-time notifications** for likes and comments via Socket.io
- **Draft auto-save** with debounced updates
- **Image uploads** via Multer and Cloudinary/S3
- **AI features** (through secure backend routes): article summaries, SEO metadata generation, content moderation
- **Semantic search & related articles** using vector embeddings (MongoDB Atlas Vector Search)

## 🛠 Tech Stack

**Frontend:** React, TanStack Query, Editor.js/Quill
**Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io
**Services:** Cloudinary/S3, OpenAI/Claude/Gemini API
**Deployment:** Vercel, Render

## 🚀 Getting Started

```bash
git clone https://github.com/anupamyadav01/<repo-name>.git
cd <repo-name>

# backend
cd backend && npm install && npm run dev

# frontend
cd ../frontend && npm install && npm run dev
```

Add a `.env` file in `/backend` (see `.env.example`) with your MongoDB URI, JWT secrets, Cloudinary keys, and AI API key.

## 📸 Screenshots

_Add 3-4 screenshots here (home feed, editor, post page, AI summary)._
