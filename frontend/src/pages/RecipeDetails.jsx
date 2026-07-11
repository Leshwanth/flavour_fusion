import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api, { IMAGE_BASE_URL } from "../api/axios"
import { useAuth } from "../context/AuthContext"

const TABS = ["Ingredients", "Instructions", "Nutrition", "Reviews"]

const RecipeDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const [recipe, setRecipe] = useState(null)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [tab, setTab] = useState("Ingredients")

    const loadRecipe = () => api.get(`/recipe/${id}`).then(res => setRecipe(res.data))
    const loadComments = () => api.get(`/comment/${id}`).then(res => setComments(res.data))

    useEffect(() => { loadRecipe(); loadComments() }, [id])

    const handleFavorite = async () => {
        if (!user) return alert("Please login to save favorites")
        await api.post(`/favorite/${id}`)
        alert("Added to favorites")
    }

    const handleRate = async (rating) => {
        if (!user) return alert("Please login to rate")
        await api.post(`/rating/${id}`, { rating })
        loadRecipe()
    }

    const submitComment = async (e) => {
        e.preventDefault()
        if (!user) return alert("Please login to comment")
        await api.post(`/comment/${id}`, { comment: newComment })
        setNewComment("")
        loadComments()
    }

    if (!recipe) return <div className="text-center py-20">Loading...</div>

    return (
        <div className="px-8 py-6 grid md:grid-cols-2 gap-8">
            <img
                src={recipe.coverImage ? `${IMAGE_BASE_URL}/${recipe.coverImage}` : "https://placehold.co/500x400"}
                alt={recipe.title}
                className="w-full rounded-xl object-cover"
            />

            <div>
                <h1 className="text-3xl font-bold">{recipe.title}</h1>
                <p className="text-sm text-gray-500 mb-2">
                    ⭐ {recipe.rating} ({recipe.ratingCount} reviews) · by {recipe.ownerId?.username}
                </p>
                <p className="text-gray-600 mb-4">{recipe.description}</p>

                <div className="flex gap-3 mb-6">
                    <button onClick={handleFavorite} className="border px-4 py-2 rounded-lg text-sm">
                        ♡ Save to Favorites
                    </button>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(n => (
                            <button key={n} onClick={() => handleRate(n)} className="text-lg">⭐</button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 border-b mb-4">
                    {TABS.map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`pb-2 ${tab === t ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {tab === "Ingredients" && (
                    <ul className="list-disc list-inside space-y-1">
                        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                    </ul>
                )}

                {tab === "Instructions" && (
                    <ol className="list-decimal list-inside space-y-2">
                        {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                )}

                {tab === "Nutrition" && recipe.nutrition && (
                    <ul className="space-y-1">
                        <li>Calories: {recipe.nutrition.calories}</li>
                        <li>Protein: {recipe.nutrition.protein}g</li>
                        <li>Carbs: {recipe.nutrition.carbs}g</li>
                        <li>Fat: {recipe.nutrition.fat}g</li>
                    </ul>
                )}

                {tab === "Reviews" && (
                    <div>
                        <form onSubmit={submitComment} className="flex gap-2 mb-4">
                            <input
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="border rounded-lg px-3 py-2 flex-1"
                            />
                            <button className="bg-primary text-white px-4 py-2 rounded-lg">Post</button>
                        </form>
                        <div className="space-y-3">
                            {comments.map(c => (
                                <div key={c._id} className="border-b pb-2">
                                    <p className="font-medium text-sm">{c.userId?.username}</p>
                                    <p className="text-sm text-gray-600">{c.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecipeDetails
