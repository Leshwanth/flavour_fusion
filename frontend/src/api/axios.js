import axios from "axios"

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({ baseURL: API_BASE_URL })

// attach token automatically to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("ff_token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export const IMAGE_BASE_URL = `${API_BASE_URL}/images`
export default api
