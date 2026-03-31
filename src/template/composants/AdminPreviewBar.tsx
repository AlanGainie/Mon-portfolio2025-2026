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

  const { user, previewRole, switchAccountRole } = useAuth();
  const currentRole: PreviewRole = previewRole;

  console.log("🟢 AdminPreviewBar render:", {
    user,
    previewRole: currentRole,
    loginRole: user?.role ?? "none",
  });

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
    console.log("👤 CURRENT PREVIEW ROLE:", currentRole);
  }, [currentRole]);

  const isSwitchablePage =
    location.pathname === "/admin" || location.pathname === "/user";

  // IMPORTANT :
  // le switch de page dépend du rôle de connexion, pas du rôle preview
  const canTogglePage = user?.role === "admin" && isSwitchablePage;

  const handleValidate = () => {
    const trimmedAdminCode = adminCode.trim();
    const trimmedSecondCode = secondCode.trim();

    if (
      trimmedAdminCode === ADMIN_PREVIEW_CODE &&
      trimmedSecondCode === ADMIN_SECOND_CODE
    ) {
      switchAccountRole("superadmin");
      setError("");
      console.log("✅ Mode superadmin activé");
      return;
    }

    setError("Double authentification invalide");
    console.log("❌ Double authentification invalide");
  };

  const handleDisableSuperAdmin = () => {
    switchAccountRole("viewer");
    setAdminCode("");
    setSecondCode("");
    setError("");
    console.log("⬇️ Mode superadmin désactivé");
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
            : user?.role === "admin"
              ? "Navigation inactive sur cette page"
              : "Accès réservé au rôle de connexion admin"
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
              title="Activer le mode superadmin"
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
            title="Désactiver le mode superadmin"
          >
            ✖
          </button>
        )}

        <span
          className={`role-indicator ${
            currentRole === "superadmin" ? "role-admin" : "role-user"
          }`}
          title={`Rôle preview ${currentRole}`}
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