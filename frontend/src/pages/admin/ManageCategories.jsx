import { useEffect, useState } from "react"
import api, { IMAGE_BASE_URL } from "../../api/axios"

const ManageCategories = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [error, setError] = useState("")

    const load = () => api.get("/category").then(res => setCategories(res.data)).catch(console.error)
    useEffect(() => { load() }, [])

    const addCategory = async (e) => {
        e.preventDefault()
        setError("")
        if (!name.trim()) { setError("Category name is required"); return }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        if (image) formData.append("image", image)

        try {
            await api.post("/category", formData, { headers: { "Content-Type": "multipart/form-data" } })
            setName(""); setDescription(""); setImage(null)
            load()
        } catch (err) {
            setError(err.response?.data?.message || "Could not add category")
        }
    }

    const remove = async (id) => {
        if (!confirm("Delete this category?")) return
        await api.delete(`/category/${id}`)
        load()
    }

    return (
        <div className="px-8 py-6">
            <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

            <form onSubmit={addCategory} className="border rounded-xl p-4 mb-8 flex flex-wrap gap-3 items-end">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm" placeholder="e.g. Breakfast" />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Description</label>
                    <input value={description} onChange={e => setDescription(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm" placeholder="Optional" />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Image</label>
                    <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}
                        className="text-sm" />
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">Add Category</button>
            </form>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <table className="w-full text-sm border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left p-2">Image</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Recipes</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(c => (
                        <tr key={c._id} className="border-t">
                            <td className="p-2">
                                <img
                                    src={c.image ? `${IMAGE_BASE_URL}/${c.image}` : "https://placehold.co/40x40"}
                                    alt={c.name}
                                    className="w-10 h-10 rounded object-cover"
                                />
                            </td>
                            <td className="p-2">{c.name}</td>
                            <td className="p-2">{c.recipeCount}</td>
                            <td className="p-2">
                                <button onClick={() => remove(c._id)} className="text-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageCategories
