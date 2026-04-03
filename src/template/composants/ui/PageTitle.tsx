import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Role = "viewer" | "superadmin" | null;

type Props = {
  title: string;
  role: Role;
  loginPath?: string;
  userPath?: string;
  adminPath?: string;
};

function normalizePath(path: string): string {
  if (!path) return "/";
  return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
}

function isSameOrChild(pathname: string, basePath: string): boolean {
  const normalizedPathname = normalizePath(pathname);
  const normalizedBase = normalizePath(basePath);

  if (normalizedBase === "/") {
    return normalizedPathname === "/";
  }

  return (
    normalizedPathname === normalizedBase ||
    normalizedPathname.startsWith(`${normalizedBase}/`)
  );
}

export default function PageTitle({
  title,
  role,
  loginPath = "/",
  userPath = "/user",
  adminPath = "/admin",
}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFlipping, setIsFlipping] = useState(false);

  const isSuperadmin = role === "superadmin";

  const currentPath = normalizePath(location.pathname);
  const safeLoginPath = normalizePath(loginPath);
  const safeUserPath = normalizePath(userPath);
  const safeAdminPath = normalizePath(adminPath);

  const isAdminPage = isSameOrChild(currentPath, safeAdminPath);
  const isUserPage = isSameOrChild(currentPath, safeUserPath);
  const isLoginPage = isSameOrChild(currentPath, safeLoginPath);

  const nextPath = useMemo(() => {
    if (isLoginPage) return safeUserPath;
    if (isUserPage) return safeAdminPath;
    if (isAdminPage) return safeLoginPath;
    return safeLoginPath;
  }, [isLoginPage, isUserPage, isAdminPage, safeLoginPath, safeUserPath, safeAdminPath]);

  const nextLabel = useMemo(() => {
    if (isLoginPage) return "User";
    if (isUserPage) return "Admin";
    if (isAdminPage) return "Login";
    return "Login";
  }, [isLoginPage, isUserPage, isAdminPage]);

  const tooltip = useMemo(() => {
    if (isLoginPage) return "Aller vers la page user";
    if (isUserPage) return "Aller vers la page admin";
    if (isAdminPage) return "Aller vers la page login";
    return "Changer de page";
  }, [isLoginPage, isUserPage, isAdminPage]);

  useEffect(() => {
    console.groupCollapsed("🧭 [PageTitle] état courant");
    console.log("title =", title);
    console.log("role =", role);
    console.log("isSuperadmin =", isSuperadmin);
    console.log("location.pathname =", location.pathname);
    console.log("currentPath =", currentPath);
    console.log("safeLoginPath =", safeLoginPath);
    console.log("safeUserPath =", safeUserPath);
    console.log("safeAdminPath =", safeAdminPath);
    console.log("isLoginPage =", isLoginPage);
    console.log("isUserPage =", isUserPage);
    console.log("isAdminPage =", isAdminPage);
    console.log("nextPath calculé =", nextPath);
    console.log("nextLabel calculé =", nextLabel);
    console.log("tooltip calculé =", tooltip);
    console.groupEnd();
  }, [
    title,
    role,
    isSuperadmin,
    location.pathname,
    currentPath,
    safeLoginPath,
    safeUserPath,
    safeAdminPath,
    isLoginPage,
    isUserPage,
    isAdminPage,
    nextPath,
    nextLabel,
    tooltip,
  ]);

  const handleClick = () => {
    console.group("🔁 [PageTitle] clic titre");
    console.log("clic détecté");
    console.log("role =", role);
    console.log("isSuperadmin =", isSuperadmin);
    console.log("location.pathname =", location.pathname);
    console.log("currentPath =", currentPath);
    console.log("nextPath avant navigation =", nextPath);

    if (!isSuperadmin) {
      console.warn("⛔ navigation annulée : rôle non autorisé");
      console.groupEnd();
      return;
    }

    setIsFlipping(true);
    console.log("animation flip activée");

    window.setTimeout(() => {
      console.log("🚀 navigate(nextPath) =>", nextPath);
      navigate(nextPath);
      setIsFlipping(false);
      console.log("animation flip désactivée");
      console.groupEnd();
    }, 220);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`page-title-button ${
        isSuperadmin ? "page-title-clickable" : ""
      }`}
      title={isSuperadmin ? tooltip : "Accès réservé au rôle superadmin"}
    >
      <div className={`page-title ${isFlipping ? "page-title-flipping" : ""}`}>
        <div className="page-title-inner">
          <span className="page-title-face page-title-front">{title}</span>
          <span className="page-title-face page-title-back">
            {nextLabel}
          </span>
        </div>
      </div>
    </button>
  );
}