import ProtectedRoute from "./ProtectedRoute"

// Thin wrapper so route definitions read clearly (AdminRoute vs ProtectedRoute)
const AdminRoute = ({ children }) => {
    return <ProtectedRoute adminOnly>{children}</ProtectedRoute>
}

export default AdminRoute
