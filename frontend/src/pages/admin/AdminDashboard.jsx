import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../api/axios"

const AdminDashboard = () => {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        api.get("/admin/stats").then(res => setStats(res.data)).catch(console.error)
    }, [])

    if (!stats) return <div className="p-8">Loading...</div>

    return (
        <div className="px-8 py-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="border rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    <p className="text-xs text-gray-500">Total Users</p>
                </div>
                <div className="border rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold">{stats.totalRecipes}</p>
                    <p className="text-xs text-gray-500">Total Recipes</p>
                </div>
                <div className="border rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold">{stats.totalCategories}</p>
                    <p className="text-xs text-gray-500">Total Categories</p>
                </div>
                <div className="border rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold">{stats.totalComments}</p>
                    <p className="text-xs text-gray-500">Total Comments</p>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <Link to="/admin/users" className="border px-4 py-2 rounded-lg">Manage Users</Link>
                <Link to="/admin/recipes" className="border px-4 py-2 rounded-lg">Manage Recipes</Link>
                <Link to="/admin/categories" className="border px-4 py-2 rounded-lg">Manage Categories</Link>
            </div>

            <h2 className="font-bold mb-2">Top Recipes</h2>
            <table className="w-full text-sm border">
                <thead className="bg-gray-50">
                    <tr><th className="text-left p-2">Title</th><th className="text-left p-2">Rating</th></tr>
                </thead>
                <tbody>
                    {stats.topRecipes.map(r => (
                        <tr key={r._id} className="border-t">
                            <td className="p-2">{r.title}</td>
                            <td className="p-2">⭐ {r.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminDashboard
