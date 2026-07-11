import { useEffect, useState } from "react"
import api from "../api/axios"
import RecipeCard from "../components/RecipeCard"

const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState({ category: "All", difficulty: "All", sort: "" })

    useEffect(() => {
        api.get("/category").then(res => setCategories(res.data)).catch(console.error)
    }, [])

    useEffect(() => {
        const params = new URLSearchParams()
        if (filters.category !== "All") params.append("category", filters.category)
        if (filters.difficulty !== "All") params.append("difficulty", filters.difficulty)
        if (filters.sort) params.append("sort", filters.sort)

        api.get(`/recipe?${params.toString()}`)
            .then(res => setRecipes(res.data.recipes))
            .catch(console.error)
    }, [filters])

    return (
        <div className="px-8 py-6">
            <div className="flex gap-4 mb-6">
                <select
                    className="border rounded-lg px-3 py-2"
                    onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
                >
                    <option value="All">All Categories</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>

                <select
                    className="border rounded-lg px-3 py-2"
                    onChange={e => setFilters(f => ({ ...f, difficulty: e.target.value }))}
                >
                    <option value="All">All Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                <select
                    className="border rounded-lg px-3 py-2"
                    onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
                >
                    <option value="">Sort By: Latest</option>
                    <option value="rating">Sort By: Rating</option>
                    <option value="time">Sort By: Time</option>
                </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recipes.map(r => <RecipeCard key={r._id} recipe={r} />)}
            </div>
            {recipes.length === 0 && <p className="text-gray-500">No recipes found.</p>}
        </div>
    )
}

export default Recipes
