import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-secondary text-white mt-16">
            <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                    <p className="text-lg font-bold mb-2">
                        Flavor<span className="text-primary">Fusion</span>
                    </p>
                    <p className="text-sm text-purple-200">
                        Discover, cook & share delicious recipes from home cooks and chefs around the world.
                    </p>
                </div>
                <div className="text-sm text-purple-200 flex flex-col gap-2">
                    <Link to="/recipes">Recipes</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/add-recipe">Share a Recipe</Link>
                </div>
                <div className="text-sm text-purple-200">
                    <p>&copy; {new Date().getFullYear()} FlavorFusion. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
