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
  const effectiveRole: Role | undefined = isSuperadmin ? "admin" : user?.role;

  console.groupCollapsed("🛡️ [ProtectedRoute]");
  console.log("pathname =", location.pathname);
  console.log("isAuthenticated =", isAuthenticated);
  console.log("user =", user);
  console.log("user.role =", user?.role);
  console.log("previewRole =", previewRole);
  console.log("isSuperadmin =", isSuperadmin);
  console.log("effectiveRole =", effectiveRole);
  console.log("requiredRole =", requiredRole);
  console.groupEnd();

  if (isLoginPath(location.pathname)) {
    return <>{children}</>;
  }

  if (!isSuperadmin && (!isAuthenticated || !user)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!requiredRole) {
    return <>{children}</>;
  }

  if (effectiveRole === "admin") {
    return <>{children}</>;
  }

  const hasUserAccess =
    requiredRole === "user" &&
    (effectiveRole === "user" || effectiveRole === "demo");

  if (hasUserAccess) {
    return <>{children}</>;
  }

  if (effectiveRole !== requiredRole) {
    return <Navigate to="/user" replace />;
  }

  return <>{children}</>;
}