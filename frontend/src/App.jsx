import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"

import Home from "./pages/Home"
import Recipes from "./pages/Recipes"
import RecipeDetails from "./pages/RecipeDetails"
import AddRecipe from "./pages/AddRecipe"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Favorites from "./pages/Favorites"
import Search from "./pages/Search"
import Categories from "./pages/Categories"

import AdminDashboard from "./pages/admin/AdminDashboard"
import ManageUsers from "./pages/admin/ManageUsers"
import ManageRecipes from "./pages/admin/ManageRecipes"
import ManageCategories from "./pages/admin/ManageCategories"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Logged-in user pages */}
          <Route path="/add-recipe" element={
            <ProtectedRoute><AddRecipe /></ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute><Favorites /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          {/* Admin dashboard */}
          <Route path="/admin" element={
            <AdminRoute><AdminDashboard /></AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute><ManageUsers /></AdminRoute>
          } />
          <Route path="/admin/recipes" element={
            <AdminRoute><ManageRecipes /></AdminRoute>
          } />
          <Route path="/admin/categories" element={
            <AdminRoute><ManageCategories /></AdminRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={
            <div className="text-center py-24 text-gray-500">Page not found</div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
