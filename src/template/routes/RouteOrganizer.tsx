// src/template/routes/RouteOrganizer.tsx
import { useEffect } from "react";
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

function DemoRoute() {
  const { isAuthenticated, user, isBlocked, loginAsDemo } = useAuth();

  useEffect(() => {
    if (isBlocked) return;

    if (!isAuthenticated || user?.role !== "demo") {
      loginAsDemo();
    }
  }, [isBlocked, isAuthenticated, user, loginAsDemo]);

  if (isBlocked) {
    return <Navigate to="/" replace />;
  }

  if (isAuthenticated && user?.role === "demo") {
    return <Navigate to="/user" replace />;
  }

  return (
    <div className="route-loading">
      <div className="route-loader" />
      <p className="route-loading-text">Activation du mode démo...</p>
    </div>
  );
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
      <Route path="/demo" element={<DemoRoute />} />
      <Route path="/user" element={<UserRoute />} />
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  );
}

export default RouteOrganizer;