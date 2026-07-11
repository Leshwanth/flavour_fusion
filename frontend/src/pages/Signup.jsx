import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Signup = () => {
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" })
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        if (form.password !== form.confirmPassword) {
            return setError("Passwords do not match")
        }
        try {
            await signup(form.username, form.email, form.password)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed")
        }
    }

    return (
        <div className="max-w-md mx-auto py-16 px-4">
            <h1 className="text-2xl font-bold mb-1">Create Account</h1>
            <p className="text-gray-500 mb-6">Join FlavorFusion today</p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="grid gap-4">
                {["username", "email", "password", "confirmPassword"].map(field => (
                    <div key={field}>
                        <label className="text-sm font-medium capitalize">
                            {field === "confirmPassword" ? "Confirm Password" : field}
                        </label>
                        <input
                            type={field.includes("password") ? "password" : "text"}
                            placeholder={`Enter your ${field}`}
                            value={form[field]}
                            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                            required
                            className="border rounded-lg px-3 py-2 w-full mt-1"
                        />
                    </div>
                ))}
                <button className="bg-primary text-white py-3 rounded-lg font-medium">Sign Up</button>
            </form>

            <p className="text-center text-sm mt-4">
                Already have an account? <Link to="/login" className="text-primary">Login</Link>
            </p>
        </div>
    )
}

export default Signup
