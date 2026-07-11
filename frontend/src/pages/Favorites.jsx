import { useEffect, useState } from "react"
import api from "../api/axios"
import RecipeCard from "../components/RecipeCard"

const Favorites = () => {
    const [favorites, setFavorites] = useState([])

    const load = () => api.get("/favorite").then(res => setFavorites(res.data)).catch(console.error)
    useEffect(() => { load() }, [])

    const remove = async (recipeId) => {
        await api.delete(`/favorite/${recipeId}`)
        setFavorites(prev => prev.filter(r => r._id !== recipeId))
    }

    return (
        <div className="px-8 py-6">
            <h1 className="text-2xl font-bold mb-6">Favorites</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {favorites.map(r => (
                    <div key={r._id} className="relative">
                        <RecipeCard recipe={r} />
                        <button
                            onClick={() => remove(r._id)}
                            title="Remove from favorites"
                            className="absolute top-2 right-2 bg-white/90 rounded-full w-7 h-7 flex items-center justify-center text-primary shadow"
                        >
                            ♥
                        </button>
                    </div>
                ))}
            </div>
            {favorites.length === 0 && <p className="text-gray-500">No favorites yet.</p>}
        </div>
    )
}

export default Favorites
