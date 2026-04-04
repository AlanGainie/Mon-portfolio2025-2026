// src/template/routes/RouteOrganizer.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import ProtectedRoute from "../../auth/ProtectedRoute";
import Home from "./RouteHome";

function LoginRoute() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />;
  }

  return <Home type="login" />;
}

function UserRoute() {
  return (
    <ProtectedRoute requiredRole="user">
      <Home type="user" />
    </ProtectedRoute>
  );
}

function AdminRoute() {
  return (
    <ProtectedRoute requiredRole="admin">
      <Home type="admin" />
    </ProtectedRoute>
  );
}

function NotFoundRoute() {
  return <Navigate to="/" replace />;
}

function RouteOrganizer() {
  return (
    <Routes>
      <Route path="/" element={<LoginRoute />} />
      <Route path="/user" element={<UserRoute />} />
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  );
}

export default RouteOrganizer;