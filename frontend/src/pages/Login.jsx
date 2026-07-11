import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await login(form.email, form.password)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="max-w-md mx-auto py-16 px-4">
            <h1 className="text-2xl font-bold mb-1">Welcome Back!</h1>
            <p className="text-gray-500 mb-6">Login to your account</p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="grid gap-4">
                <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        required
                        className="border rounded-lg px-3 py-2 w-full mt-1"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                        required
                        className="border rounded-lg px-3 py-2 w-full mt-1"
                    />
                </div>
                <button className="bg-primary text-white py-3 rounded-lg font-medium">Login</button>
            </form>

            <p className="text-center text-sm mt-4">
                Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
            </p>
        </div>
    )
}

export default Login
