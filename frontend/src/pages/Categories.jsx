import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api, { IMAGE_BASE_URL } from "../api/axios"

const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        api.get("/category")
            .then(res => {
                console.log("Categories:", res.data);
                setCategories(res.data);
            })
            .catch(console.error);
    }, []);


    

    return (
        <div className="px-8 py-6">
            <h1 className="text-2xl font-bold mb-6">Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map(c => (
                    <Link
                        key={c._id}
                        to={`/recipes?category=${c._id}`}
                        className="border rounded-xl p-4 text-center hover:shadow-md"
                    >
                        <img
                            src={c.image ? `${IMAGE_BASE_URL}/${c.image}` : "https://placehold.co/64x64"}
                            alt={c.name}
                            className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                        />
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.recipeCount} Recipes</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Categories
