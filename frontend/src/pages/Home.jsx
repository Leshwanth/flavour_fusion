import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"
import RecipeCard from "../components/RecipeCard"

const Home = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        api.get("/recipe?sort=rating&limit=8")
            .then(res => setRecipes(res.data.recipes))
            .catch(console.error)
    }, [])

    return (
        <div>
            <section className="text-center py-20 px-4">
                <h1 className="text-4xl font-bold mb-4">
                    Discover, Cook & Share <span className="text-primary">Delicious Recipes</span>
                </h1>
                <p className="text-gray-500 max-w-xl mx-auto mb-6">
                    Explore thousands of amazing recipes from talented home cooks and chefs around the world.
                </p>
                <Link to="/add-recipe" className="bg-primary text-white px-6 py-3 rounded-lg font-medium">
                    Share Your Recipe
                </Link>
            </section>

            <section className="px-8 pb-16">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Featured Recipes</h2>
                    <Link to="/recipes" className="text-primary text-sm">View All</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recipes.map(r => <RecipeCard key={r._id} recipe={r} />)}
                </div>
            </section>
        </div>
    )
}

export default Home
