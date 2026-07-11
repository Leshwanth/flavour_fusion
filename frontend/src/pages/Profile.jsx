import { useEffect, useState } from "react"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"
import RecipeCard from "../components/RecipeCard"

const Profile = () => {
    const { user } = useAuth()
    const [myRecipes, setMyRecipes] = useState([])
    const [favorites, setFavorites] = useState([])
    const [tab, setTab] = useState("My Recipes")

    useEffect(() => {
        if (!user) return
        api.get(`/recipe/user/${user._id}`).then(res => setMyRecipes(res.data))
        api.get("/favorite").then(res => setFavorites(res.data))
    }, [user])

    if (!user) return null

    return (
        <div className="px-8 py-6">
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={user.profileImage || "https://placehold.co/80x80"}
                    alt={user.username}
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-xl font-bold">{user.username}</h1>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                    <p className="text-gray-600 text-sm mt-1">{user.bio}</p>
                </div>
            </div>

            <div className="flex gap-8 mb-6 text-center">
                <div><p className="text-xl font-bold">{myRecipes.length}</p><p className="text-xs text-gray-500">Recipes</p></div>
                <div><p className="text-xl font-bold">{favorites.length}</p><p className="text-xs text-gray-500">Favorites</p></div>
            </div>

            <div className="flex gap-4 border-b mb-4">
                {["My Recipes", "Favorites"].map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`pb-2 ${tab === t ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500"}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(tab === "My Recipes" ? myRecipes : favorites).map(r => <RecipeCard key={r._id} recipe={r} />)}
            </div>
        </div>
    )
}

export default Profile
