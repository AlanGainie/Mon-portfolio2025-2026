import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Role = "admin" | "user" | "demo";

function isLoginPath(pathname: string): boolean {
  return pathname === "/";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: Role;
}) {
  const { isAuthenticated, user, previewRole } = useAuth();
  const location = useLocation();

  const isSuperadmin = previewRole === "superadmin";

  console.groupCollapsed("🛡️ [ProtectedRoute]");
  console.log("pathname =", location.pathname);
  console.log("isAuthenticated =", isAuthenticated);
  console.log("user =", user);
  console.log("user.role =", user?.role);
  console.log("previewRole =", previewRole);
  console.log("isSuperadmin =", isSuperadmin);
  console.log("requiredRole =", requiredRole);
  console.groupEnd();

  if (isSuperadmin) {
    return <>{children}</>;
  }

  if (isLoginPath(location.pathname)) {
    return <>{children}</>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!requiredRole) {
    return <>{children}</>;
  }

  if (user.role === "admin") {
    return <>{children}</>;
  }

  // demo a les mêmes permissions que user
  const hasUserAccess =
    requiredRole === "user" && (user.role === "user" || user.role === "demo");

  if (hasUserAccess) {
    return <>{children}</>;
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
}