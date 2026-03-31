import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

type Role = "admin" | "user";
type ScreenMode = "desktop" | "mobile" | "projector";

type Props = {
  showLogout?: boolean;
  onLogout?: () => void;
};

const ADMIN_PREVIEW_CODE = "admin-view";
const ADMIN_SECOND_CODE = "1593";

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

  const { user, switchAccountRole } = useAuth();
  const switchRole = switchAccountRole as (role: Role, username?: string) => void;

  const currentRole: Role = user?.isSuperAdmin ? "admin" : "user";

  console.log("🟢 AdminPreviewBar render:", { user, currentRole });

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("themeMode");
    return savedTheme === "light" ? "light" : "dark";
  });

  const [screenMode, setScreenMode] = useState<ScreenMode>(() => {
    const savedScreen = localStorage.getItem("screenMode");

    if (
      savedScreen === "desktop" ||
      savedScreen === "mobile" ||
      savedScreen === "projector"
    ) {
      return savedScreen;
    }

    return "desktop";
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("themeMode", theme);
  }, [theme]);

  useEffect(() => {
    document.body.dataset.screen = screenMode;
    localStorage.setItem("screenMode", screenMode);
  }, [screenMode]);

  useEffect(() => {
    document.body.dataset.role = currentRole;
    console.log("🎨 DATASET ROLE:", document.body.dataset.role);
  }, [currentRole]);

  useEffect(() => {
    console.log("👤 CURRENT ROLE:", currentRole);
  }, [currentRole]);

  const isSwitchablePage =
    location.pathname === "/admin" || location.pathname === "/user";

  const canTogglePage = currentRole === "admin" && isSwitchablePage;

  const handleValidate = () => {
    const trimmedAdminCode = adminCode.trim();
    const trimmedSecondCode = secondCode.trim();
    const hasUser = !!user;

    if (hasUser) {
      if (trimmedAdminCode === ADMIN_PREVIEW_CODE) {
        switchRole("admin");
        setError("");
        console.log("✅ Admin activé avec utilisateur déjà connecté");
        return;
      }

      switchRole("user");
      setError("Code admin invalide");
      console.log("❌ Code admin invalide avec utilisateur connecté");
      return;
    }

    if (
      trimmedAdminCode === ADMIN_PREVIEW_CODE &&
      trimmedSecondCode === ADMIN_SECOND_CODE
    ) {
      switchRole("admin", "admin-preview");
      setError("");
      console.log("✅ Admin activé sans utilisateur via double authentification");
      return;
    }

    setError("Double authentification invalide");
    console.log("❌ Double authentification invalide");
  };

  const handleTitleClick = () => {
    if (!canTogglePage) return;

    const nextPath = location.pathname === "/admin" ? "/user" : "/admin";

    setIsFlipping(true);

    window.setTimeout(() => {
      navigate(nextPath);
    }, 180);

    window.setTimeout(() => {
      setIsFlipping(false);
    }, 420);
  };

  const handleScreenMode = () => {
    setScreenMode((prev) => {
      if (prev === "desktop") return "mobile";
      if (prev === "mobile") return "projector";
      return "desktop";
    });
  };

  const getScreenIcon = () => {
    switch (screenMode) {
      case "desktop":
        return "🖥️";
      case "mobile":
        return "📱";
      case "projector":
        return "📽️";
      default:
        return "🖥️";
    }
  };

  const getScreenTitle = () => {
    switch (screenMode) {
      case "desktop":
        return "Mode PC";
      case "mobile":
        return "Mode téléphone";
      case "projector":
        return "Mode projecteur";
      default:
        return "Mode PC";
    }
  };

  const pageLabel =
    location.pathname === "/admin"
      ? "Page Admin"
      : location.pathname === "/user"
        ? "Page User"
        : "Page Login";

  const nextPageLabel =
    location.pathname === "/admin"
      ? "Page User"
      : location.pathname === "/user"
        ? "Page Admin"
        : "Page Login";

  return (
    <div className={`admin-preview-wrapper ${collapsed ? "collapsed" : ""}`}>
      <button
        type="button"
        className="toggle-admin-bar"
        onClick={() => setCollapsed((prev) => !prev)}
        title={collapsed ? "Afficher la barre" : "Réduire la barre"}
      >
        ▲
      </button>

      <button
        type="button"
        className={`page-title page-title-button ${
          canTogglePage ? "page-title-clickable" : ""
        } ${isFlipping ? "page-title-flipping" : ""}`}
        onClick={handleTitleClick}
        title={
          canTogglePage
            ? location.pathname === "/admin"
              ? "Aller vers la page user"
              : "Aller vers la page admin"
            : currentRole === "admin"
              ? "Navigation inactive sur cette page"
              : "Accès réservé au rôle admin"
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
        <input
          type="text"
          placeholder="Identifiant admin"
          value={adminCode}
          onChange={(e) => {
            setAdminCode(e.target.value);
            if (error) setError("");
          }}
          className="admin-preview-input"
        />

        {!user && (
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
        )}

        <button
          type="button"
          onClick={handleValidate}
          className="admin-preview-button"
          title="Activer le rôle admin"
        >
          ✔
        </button>

        <span
          className={`role-indicator ${
            currentRole === "admin" ? "role-admin" : "role-user"
          }`}
          title={`Rôle ${currentRole}`}
        />

        <span style={{ fontSize: "12px", color: "var(--text)" }}>
          {currentRole}
        </span>

        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="theme-toggle-button"
          title={
            theme === "dark"
              ? "Passer en mode clair"
              : "Passer en mode sombre"
          }
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          type="button"
          onClick={handleScreenMode}
          className="screen-toggle-button"
          title={getScreenTitle()}
        >
          {getScreenIcon()}
        </button>

        {showLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="logout-button"
            title="Se déconnecter"
          >
            ⎋
          </button>
        )}
      </div>

      {error && <p className="admin-preview-error">{error}</p>}
    </div>
  );
}