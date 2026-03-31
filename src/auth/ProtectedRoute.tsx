import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Role = "admin" | "user";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: Role;
}) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!requiredRole) {
    return <>{children}</>;
  }

  if (user.role === "admin") {
    return <>{children}</>;
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
}