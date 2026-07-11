import { Link } from "react-router-dom"
import { IMAGE_BASE_URL } from "../api/axios"

const RecipeCard = ({ recipe }) => {
    return (
        <Link
            to={`/recipes/${recipe._id}`}
            className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow"
        >
            <img
                src={recipe.coverImage ? `${IMAGE_BASE_URL}/${recipe.coverImage}` : "https://placehold.co/300x200"}
                alt={recipe.title}
                className="w-full h-40 object-cover"
            />
            <div className="p-3">
                <h3 className="font-semibold text-sm">{recipe.title}</h3>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>⏱ {recipe.preparationTime} min</span>
                    <span>⭐ {recipe.rating || "New"}</span>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard
