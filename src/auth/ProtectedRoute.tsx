import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Role = "admin" | "user";

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

  /* =========================
     1. SUPERADMIN PRIORITAIRE
     ========================= */
  if (isSuperadmin) {
    console.log("🚀 Superadmin bypass toutes les protections");
    return <>{children}</>;
  }

  /* =========================
     2. PAGE LOGIN ("/")
     ========================= */
  if (isLoginPath(location.pathname)) {
    console.log("🔓 Page login → accès libre");
    return <>{children}</>;
  }

  /* =========================
     3. NON AUTHENTIFIÉ
     ========================= */
  if (!isAuthenticated || !user) {
    console.warn("⛔ Non authentifié → redirect /");
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  /* =========================
     4. PAS DE ROLE REQUIS
     ========================= */
  if (!requiredRole) {
    console.log("✅ Pas de rôle requis");
    return <>{children}</>;
  }

  /* =========================
     5. ADMIN NORMAL
     ========================= */
  if (user.role === "admin") {
    console.log("👑 Admin → accès autorisé");
    return <>{children}</>;
  }

  /* =========================
     6. ROLE INSUFFISANT
     ========================= */
  if (user.role !== requiredRole) {
    console.warn("⛔ Rôle insuffisant → redirect /user");
    return <Navigate to="/user" replace />;
  }

  /* =========================
     7. OK
     ========================= */
  console.log("✅ Accès autorisé");
  return <>{children}</>;
}