import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

type PreviewRole = "viewer" | "superadmin";
type ScreenMode = "desktop" | "mobile" | "projector";

type Props = {
  showLogout?: boolean;
  onLogout?: () => void;
};

const ADMIN_PREVIEW_CODE = "admin-view";
const ADMIN_SECOND_CODE = "1593";

function isLoginPage(pathname: string): boolean {
  return pathname === "/";
}

function isUserPage(pathname: string): boolean {
  return pathname === "/user" || pathname.startsWith("/user/");
}

function isAdminPage(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function getPageLabel(pathname: string): string {
  if (isAdminPage(pathname)) return "Page Admin";
  if (isUserPage(pathname)) return "Page User";
  return "Page Login";
}

function getNextPage(pathname: string): string {
  if (isLoginPage(pathname)) return "/user";
  if (isUserPage(pathname)) return "/admin";
  if (isAdminPage(pathname)) return "/";
  return "/";
}

function getNextPageLabel(pathname: string): string {
  if (isLoginPage(pathname)) return "Page User";
  if (isUserPage(pathname)) return "Page Admin";
  if (isAdminPage(pathname)) return "Page Login";
  return "Page Login";
}

function getPageTitleTooltip(pathname: string): string {
  if (isLoginPage(pathname)) return "Aller vers la page user";
  if (isUserPage(pathname)) return "Aller vers la page admin";
  if (isAdminPage(pathname)) return "Aller vers la page login";
  return "Changer de page";
}

export default function AdminPreviewBar({
  showLogout,
  onLogout,
}: Props) {
  const [adminCode, setAdminCode] = useState("");
  const [secondCode, setSecondCode] = useState("");
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { previewRole, switchAccountRole } = useAuth();
  const currentRole: PreviewRole = previewRole ?? "viewer";

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("themeMode");
    return savedTheme === "light" ? "light" : "dark";
  });

  const [screenMode, setScreenMode] = useState<ScreenMode>(() => {
    const savedScreen = localStorage.getItem("screenMode");
    if (["desktop", "mobile", "projector"].includes(savedScreen || "")) {
      return savedScreen as ScreenMode;
    }
    return "desktop";
  });

  useEffect(() => {
    console.groupCollapsed("🟢 [AdminPreviewBar] état global");
    console.log("pathname =", location.pathname);
    console.log("currentRole =", currentRole);
    console.log("theme =", theme);
    console.log("screenMode =", screenMode);
    console.log("isLoginPage =", isLoginPage(location.pathname));
    console.log("isUserPage =", isUserPage(location.pathname));
    console.log("isAdminPage =", isAdminPage(location.pathname));
    console.log("pageLabel =", getPageLabel(location.pathname));
    console.log("nextPage =", getNextPage(location.pathname));
    console.log("nextPageLabel =", getNextPageLabel(location.pathname));
    console.groupEnd();
  }, [location.pathname, currentRole, theme, screenMode]);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("themeMode", theme);
    console.log("🎨 theme appliqué =", theme);
  }, [theme]);

  useEffect(() => {
    document.body.dataset.screen = screenMode;
    localStorage.setItem("screenMode", screenMode);
    console.log("📺 screenMode appliqué =", screenMode);
  }, [screenMode]);

  useEffect(() => {
    document.body.dataset.role = currentRole;
    console.log("👤 role appliqué =", currentRole);
  }, [currentRole]);

  const isSwitchablePage =
    isAdminPage(location.pathname) ||
    isUserPage(location.pathname) ||
    isLoginPage(location.pathname);

  const canTogglePage =
    currentRole === "superadmin" && isSwitchablePage;

  const handleTitleClick = () => {
    console.group("🔁 [AdminPreviewBar] click titre");
    console.log("pathname actuel =", location.pathname);
    console.log("canTogglePage =", canTogglePage);
    console.log("role =", currentRole);

    if (!canTogglePage) {
      console.warn("⛔ navigation bloquée");
      console.groupEnd();
      return;
    }

    const nextPath = getNextPage(location.pathname);
    console.log("➡️ prochaine route =", nextPath);

    setIsFlipping(true);
    console.log("animation ON");

    window.setTimeout(() => {
      console.log("🚀 navigate =>", nextPath);
      navigate(nextPath);
    }, 180);

    window.setTimeout(() => {
      setIsFlipping(false);
      console.log("animation OFF");
      console.groupEnd();
    }, 420);
  };

  const handleValidate = () => {
    console.group("🔐 [AdminPreviewBar] validation superadmin");

    const trimmedAdminCode = adminCode.trim();
    const trimmedSecondCode = secondCode.trim();

    console.log("adminCode =", trimmedAdminCode);
    console.log("secondCode =", trimmedSecondCode);

    if (
      trimmedAdminCode === ADMIN_PREVIEW_CODE &&
      trimmedSecondCode === ADMIN_SECOND_CODE
    ) {
      console.log("✅ superadmin ACTIVÉ");
      switchAccountRole("superadmin");
      setError("");
      console.groupEnd();
      return;
    }

    console.warn("❌ double auth invalide");
    setError("Double authentification invalide");
    console.groupEnd();
  };

  const handleDisableSuperAdmin = () => {
    console.log("⬇️ superadmin DÉSACTIVÉ");
    switchAccountRole("viewer");
    setAdminCode("");
    setSecondCode("");
    setError("");
  };

  const handleScreenMode = () => {
    console.log("🔄 changement screenMode");
    setScreenMode((prev) => {
      const next =
        prev === "desktop"
          ? "mobile"
          : prev === "mobile"
            ? "projector"
            : "desktop";

      console.log("screenMode:", prev, "➡️", next);
      return next;
    });
  };

  const pageLabel = getPageLabel(location.pathname);
  const nextPageLabel = getNextPageLabel(location.pathname);

  return (
    <div className={`admin-preview-wrapper ${collapsed ? "collapsed" : ""}`}>
      <button
        type="button"
        className="toggle-admin-bar"
        onClick={() => {
          console.log("📦 toggle bar =", !collapsed);
          setCollapsed((prev) => !prev);
        }}
        title={collapsed ? "Afficher la barre" : "Réduire la barre"}
      >
        ▲
      </button>

      <button
        type="button"
        data-next={getNextPage(location.pathname)}
        className={`page-title page-title-button ${
          canTogglePage ? "page-title-clickable" : ""
        } ${isFlipping ? "page-title-flipping" : ""}`}
        onClick={handleTitleClick}
        title={
          canTogglePage
            ? getPageTitleTooltip(location.pathname)
            : "Accès réservé au rôle superadmin"
        }
      >
        <span className="page-title-inner">
          <span className="page-title-face page-title-front">{pageLabel}</span>
          <span className="page-title-face page-title-back">
            {nextPageLabel}
          </span>
        </span>
      </button>

      <div className="admin-preview-bar">
        {currentRole !== "superadmin" && (
          <>
            <input
              type="text"
              placeholder="Identifiant superadmin"
              value={adminCode}
              onChange={(e) => {
                setAdminCode(e.target.value);
                if (error) setError("");
              }}
              className="admin-preview-input"
            />

            <input
              type="password"
              placeholder="Code sécurité (4 chiffres)"
              value={secondCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                setSecondCode(value);
                if (error) setError("");
              }}
              className="admin-preview-input"
            />

            <button
              type="button"
              onClick={handleValidate}
              className="admin-preview-button"
            >
              ✔
            </button>
          </>
        )}

        {currentRole === "superadmin" && (
          <button
            type="button"
            onClick={handleDisableSuperAdmin}
            className="admin-preview-button"
          >
            ✖
          </button>
        )}

        <span
          className={`role-indicator ${
            currentRole === "superadmin" ? "role-admin" : "role-user"
          }`}
        />

        <span>{currentRole}</span>

        <button
          type="button"
          onClick={() => {
            console.log("🎨 toggle theme");
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          className="theme-toggle-button"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          type="button"
          onClick={handleScreenMode}
          className="screen-toggle-button"
        >
          {screenMode === "desktop"
            ? "🖥️"
            : screenMode === "mobile"
              ? "📱"
              : "📽️"}
        </button>

        {showLogout && (
          <button
            type="button"
            onClick={() => {
              console.log("🚪 logout");
              onLogout?.();
            }}
            className="logout-button"
          >
            ⎋
          </button>
        )}
      </div>

      {error && <p className="admin-preview-error">{error}</p>}
    </div>
  );
}