import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
            <Link to="/" className="text-xl font-bold text-secondary">
                Flavor<span className="text-primary">Fusion</span>
            </Link>

            <div className="flex gap-6 text-gray-700 font-medium">
                <Link to="/">Home</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/favorites">Favorites</Link>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/search" className="text-gray-500">Search</Link>
                {user ? (
                    <>
                        <Link to="/add-recipe" className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                            Share Recipe
                        </Link>
                        <Link to="/profile">
                            <img
                                src={user.profileImage || "https://placehold.co/32x32"}
                                alt={user.username}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </Link>
                        {user.role === "admin" && (
                            <Link to="/admin" className="text-sm text-secondary font-semibold">Admin</Link>
                        )}
                        <button onClick={() => { logout(); navigate("/") }} className="text-sm text-gray-500">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-sm">Login</Link>
                        <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
