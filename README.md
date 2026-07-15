# 🍽️ FlavorFusion

FlavorFusion is a full-stack recipe sharing and blogging platform built with the MERN stack. It allows users to discover, create, and manage recipes while interacting with a vibrant food community.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Secure Profile Management
- Browse Recipes
- Search Recipes
- Filter Recipes by Category
- View Recipe Details
- Add New Recipes
- Edit & Delete Own Recipes
- Upload Recipe Cover Images
- Add Recipes to Favorites
- Rate Recipes
- Comment on Recipes

### 👨‍💼 Admin Features
- Manage Categories
- Manage Users
- Delete Inappropriate Content
- Admin Protected Routes

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Image Upload)

---

## 📂 Project Structure

```
FlavorFusion/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 📸 Screens

- Home Page
- Categories
- Recipe Details
- Add Recipe
- User Profile
- Login & Register
- Admin Dashboard

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Leshwanth/flavour_fusion.git
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

Run backend

```bash
npm start
```

or

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

Backend runs at

```
http://localhost:5000
```

---

## 📦 API Modules

- Authentication
- Users
- Recipes
- Categories
- Comments
- Ratings
- Favorites
- Admin

---

## 🔐 Authentication

JWT-based authentication is implemented.

Protected APIs require:

```
Authorization: Bearer <token>
```

---

## 📁 Image Upload

Recipe cover images are uploaded using **Multer** and stored on the server.

---

## 🎯 Future Enhancements

- AI Recipe Recommendation
- Nutrition Calculator
- Meal Planner
- Recipe Videos
- Social Sharing
- Email Verification
- Password Reset
- Infinite Scroll
- Dark Mode
- Recipe Collections
- Bookmark Folders

---

## 👨‍💻 Author

**Leshwanth**

GitHub: https://github.com/Leshwanth

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
