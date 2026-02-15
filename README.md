# 📝 Summify – Secure AI Powered Private Notes

Summify is a full-stack web application that allows users to create password-protected private notes and generate AI-powered summaries.

It is built using the MERN stack (MongoDB, Express, React, Node.js) and deployed using Render (backend) and Vercel (frontend).

---

## 🚀 Live Deployment

Deployed Url: 
👉 [Summify App](https://summify-app.vercel.app/)

Swagger API Docs:  
👉 [API Docs](https://summify-app.onrender.com/api-docs/)

---

## 📌 Features

- Create secure private notes
- Automatic random password generation
- Shareable note URL
- Password verification before viewing
- AI-powered note summarization
- Copy-to-clipboard functionality
- Clean UI using Tailwind CSS
- Fully deployed production-ready app

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt (password hashing)
- OpenAI API (AI summarization)
- Swagger (API documentation)
- CORS
- MVC Architecture

---
---

## 🚀 Potential Future Improvements

These are some potential future improvement we can implement.

### 1. Add User Authentication with JWT

Currently, anyone with a note link and password can access a note.  
As a future enhancement, this project can be improved by implementing full user authentication using JWT (JSON Web Tokens).

#### 🔐 Features to Add

- User Registration (Sign Up)
- User Login (Sign In)
- Password hashing using bcrypt
- JWT token generation on successful login
- Authentication middleware to protect routes
- Link notes to specific users
- User dashboard to manage personal notes

---

### 2. One-Time View Notes (Very Easy to Implement)
Allow notes to be viewed only once.

### 3. Input Validation Layer
Add request validation middleware.

Implementation idea:
- Use `express-validator`
- Validate:
  - Note text length
  - Password format
  - MongoDB ObjectId format

Improves API robustness.

---

### 4. Note Expiration Timer (Auto Self-Destruct)
Currently, notes can have a TTL (Time-To-Live) in the database.
Future enhancement:
- Allow users to choose expiry duration (10 min, 1 hour, 24 hours).
- Display countdown timer on the frontend.
- Automatically delete note after first view (one-time read).

---

### 5. Rate Limiting (Security Enhancement)
Prevent brute-force password attempts.

Implementation idea:
- Use `express-rate-limit`
- Limit requests per IP (e.g., 5 unlock attempts per minute)

Benefits:
- Protects against abuse
- Improves backend security

---

### 6. Centralized Axios Instance
Improve frontend code quality.

Implementation idea:
- Create `api.js`
- Configure baseURL once
- Add interceptors for error handling

Improves scalability.

---

### 7. Dark Mode Support
Simple UI enhancement.

Implementation idea:
- Add Tailwind dark class
- Store theme in localStorage

Easy to implement in interview if asked.

---

## 8. Scalability Considerations

For large-scale production:

- Use Redis for caching summaries
- Use CDN for frontend
- Implement logging (Winston/Morgan)
- Add centralized error monitoring (Sentry)
- Move AI calls to background worker queue

---

## 9. Security Considerations

- Helmet middleware
- Strict CORS policy
- Environment-based config
- Hide internal error messages in production
- Input sanitization to prevent injection attacks

---



