import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const AddRecipe = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [form, setForm] = useState({
        title: "", category: "", cuisine: "", difficulty: "Easy",
        preparationTime: "", cookingTime: "", servings: "",
        ingredients: "", instructions: "", description: ""
    })
    const [file, setFile] = useState(null)
    // let token = localStorage.getItem('token');
    useEffect(() => {
        api.get("/category").then(res => setCategories(res.data)).catch(console.error)
    }, [])

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        Object.entries(form).forEach(([key, value]) => data.append(key, value))
        if (file) data.append("coverImage", file)

        try {
            const res = await api.post("/recipe", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate(`/recipes/${res.data._id}`)
        } catch (err) {
            alert(err.response?.data?.message || "Failed to publish recipe")
        }
    }



    const categoryOptions = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert",
        "Snacks",
        "Beverages",
        "Vegetarian",
        "Non-Vegetarian",
        "Salads",
        "Soups",
        "Fast Food",
        "Healthy"
    ];

    return (
        <form onSubmit={handleSubmit} className="px-8 py-6 max-w-3xl mx-auto grid gap-4">
            <h1 className="text-2xl font-bold">Add New Recipe</h1>

            <input name="title" placeholder="Recipe title" value={form.title} onChange={handleChange} required className="border rounded-lg px-3 py-2" />

            <div className="grid  gap-4">
                <div className="relative">
                {/* <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">🍽️ Select Category</option>
                    <option value="Breakfast">🍳 Breakfast</option>
                    <option value="Lunch">🍛 Lunch</option>
                    <option value="Dinner">🍽️ Dinner</option>
                    <option value="Dessert">🍰 Dessert</option>
                    <option value="Snacks">🍟 Snacks</option>
                    <option value="Beverages">🥤 Beverages</option>
                    <option value="Vegetarian">🥗 Vegetarian</option>
                    <option value="Non-Vegetarian">🍗 Non-Vegetarian</option>
                    <option value="Healthy">🥑 Healthy</option>
                    <option value="Fast Food">🍔 Fast Food</option>
                </select> */}
                </div>
                <input name="cuisine" placeholder="e.g. Italian, Indian" value={form.cuisine} onChange={handleChange} className="border rounded-lg px-3 py-2" />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <select name="difficulty" value={form.difficulty} onChange={handleChange} className="border rounded-lg px-3 py-2">
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                </select>
                <input name="preparationTime" type="number" placeholder="Prep time (min)" value={form.preparationTime} onChange={handleChange} className="border rounded-lg px-3 py-2" />
                <input name="cookingTime" type="number" placeholder="Cook time (min)" value={form.cookingTime} onChange={handleChange} className="border rounded-lg px-3 py-2" />
            </div>

            <input name="servings" type="number" placeholder="Servings" value={form.servings} onChange={handleChange} className="border rounded-lg px-3 py-2" />

            <textarea name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} required className="border rounded-lg px-3 py-2" rows={3} />

            <textarea name="instructions" placeholder="Instructions (one step per line)" value={form.instructions} onChange={handleChange} required className="border rounded-lg px-3 py-2" rows={5} />

            <textarea name="description" placeholder="Short description" value={form.description} onChange={handleChange} className="border rounded-lg px-3 py-2" rows={2} />

            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />

            <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium w-fit">Publish Recipe</button>
        </form>
    )
}

export default AddRecipe
