import { useEffect, useState } from "react"
import api from "../../api/axios"

const ManageUsers = () => {
    const [users, setUsers] = useState([])

    const load = () => api.get("/admin/users").then(res => setUsers(res.data)).catch(console.error)
    useEffect(() => { load() }, [])

    const toggleRole = async (u) => {
        const newRole = u.role === "admin" ? "user" : "admin"
        await api.put(`/admin/users/${u._id}/role`, { role: newRole })
        load()
    }

    const remove = async (id) => {
        if (!confirm("Delete this user?")) return
        await api.delete(`/admin/users/${id}`)
        load()
    }

    return (
        <div className="px-8 py-6">
            <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
            <table className="w-full text-sm border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Role</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id} className="border-t">
                            <td className="p-2">{u.username}</td>
                            <td className="p-2">{u.email}</td>
                            <td className="p-2">{u.role}</td>
                            <td className="p-2 flex gap-2">
                                <button onClick={() => toggleRole(u)} className="text-blue-600">Toggle Role</button>
                                <button onClick={() => remove(u._id)} className="text-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageUsers
