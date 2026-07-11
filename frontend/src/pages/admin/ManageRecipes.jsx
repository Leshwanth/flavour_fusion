import { useEffect, useState } from "react"
import api from "../../api/axios"

const ManageRecipes = () => {
    const [recipes, setRecipes] = useState([])

    const load = () => api.get("/recipe?limit=100").then(res => setRecipes(res.data.recipes)).catch(console.error)
    useEffect(() => { load() }, [])

    const remove = async (id) => {
        if (!confirm("Delete this recipe?")) return
        await api.delete(`/recipe/${id}`)
        load()
    }

    return (
        <div className="px-8 py-6">
            <h1 className="text-2xl font-bold mb-6">Manage Recipes</h1>
            <table className="w-full text-sm border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left p-2">Title</th>
                        <th className="text-left p-2">Author</th>
                        <th className="text-left p-2">Rating</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map(r => (
                        <tr key={r._id} className="border-t">
                            <td className="p-2">{r.title}</td>
                            <td className="p-2">{r.ownerId?.username}</td>
                            <td className="p-2">⭐ {r.rating}</td>
                            <td className="p-2">
                                <button onClick={() => remove(r._id)} className="text-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageRecipes
