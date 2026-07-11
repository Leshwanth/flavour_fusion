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
                headers: { "Content-Type": "multipart/form-data" }
            })
            navigate(`/recipes/${res.data._id}`)
        } catch (err) {
            alert(err.response?.data?.message || "Failed to publish recipe")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="px-8 py-6 max-w-3xl mx-auto grid gap-4">
            <h1 className="text-2xl font-bold">Add New Recipe</h1>

            <input name="title" placeholder="Recipe title" value={form.title} onChange={handleChange} required className="border rounded-lg px-3 py-2" />

            <div className="grid grid-cols-2 gap-4">
                <select name="category" value={form.category} onChange={handleChange} className="border rounded-lg px-3 py-2">
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
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
