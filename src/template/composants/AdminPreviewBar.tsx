import { useEffect, useState } from "react";

type Props = {
  previewRole: "admin" | "user";
  setPreviewRole: React.Dispatch<React.SetStateAction<"admin" | "user">>;
  showLogout?: boolean;
  onLogout?: () => void;
  title?: string;
};

const ADMIN_PREVIEW_CODE = "admin-view";

type ScreenMode = "desktop" | "mobile" | "projector";

export default function AdminPreviewBar({
  previewRole,
  setPreviewRole,
  showLogout,
  onLogout,
  title,
}: Props) {
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");

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

  const handleValidate = () => {
    if (adminCode === ADMIN_PREVIEW_CODE) {
      setPreviewRole("admin");
      setError("");
      return;
    }

    setPreviewRole("user");
    setError("Code admin invalide");
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

  return (
    <div className="admin-preview-wrapper">
      <span className="page-title">
        {title || "Error"}
      </span>
      <div className="admin-preview-bar">

        <input
          type="text"
          placeholder="Identifiant admin"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          className="admin-preview-input"
        />

        <button onClick={handleValidate} className="admin-preview-button">
          ✔
        </button>

        <span
          className={`role-indicator ${
            previewRole === "admin" ? "role-admin" : "role-user"
          }`}
          title={`Mode ${previewRole}`}
        />

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="theme-toggle-button"
          title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          onClick={handleScreenMode}
          className="screen-toggle-button"
          title={getScreenTitle()}
        >
          {getScreenIcon()}
        </button>

        {showLogout && (
          <button
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