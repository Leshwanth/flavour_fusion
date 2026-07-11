import { createContext, useContext, useState, useEffect } from "react"
import api from "../api/axios"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("ff_token")
        if (!token) { setLoading(false); return }

        api.get("/user/me")
            .then(res => setUser(res.data))
            .catch(() => localStorage.removeItem("ff_token"))
            .finally(() => setLoading(false))
    }, [])

    const login = async (email, password) => {
        const res = await api.post("/login", { email, password })
        localStorage.setItem("ff_token", res.data.token)
        setUser(res.data.user)
        return res.data.user
    }

    const signup = async (username, email, password) => {
        const res = await api.post("/signup", { username, email, password })
        localStorage.setItem("ff_token", res.data.token)
        setUser(res.data.user)
        return res.data.user
    }

    const logout = () => {
        localStorage.removeItem("ff_token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
