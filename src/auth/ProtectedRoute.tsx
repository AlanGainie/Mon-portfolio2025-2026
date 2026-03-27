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

  // ✅ LOGIQUE CORRIGÉE
  const hasAccess =
    !requiredRole ||
    user.role === requiredRole ||
    (user.role === "admin" && requiredRole === "user");

  if (!hasAccess) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/user"}
        replace
      />
    );
  }

  return <>{children}</>;
}