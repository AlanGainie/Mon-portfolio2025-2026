import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import loaderGif from "../../assets/svg_declinaisons_dragon_egg/dragon_svg_loaders_variants_pack/loader_calm_1_breathe_muted_muted.gif";

import AuthSection from "../sections/AuthSection";
import LogsSection from "../sections/LogsSection";

type LoginProps = {
  onLogUpdate?: () => void;
};

export type AuthLog = {
  id: string;
  username: string;
  role: "admin" | "user" | "demo" | "unknown";
  action: "login" | "logout" | "error" | "blocked" | "unblocked";
  timestamp: string;
  severityPoints: number;
  message?: string;
};

const readStoredLogs = (): AuthLog[] => {
  return JSON.parse(localStorage.getItem("authLogs") || "[]");
};

export default function Login({ onLogUpdate }: LoginProps) {
  const [previewBarState, setPreviewBarState] = useState(
    document.body.dataset.previewBar ?? "hidden"
  );

  const { login, loginAsDemo, isBlocked, clearLogs } = useAuth();
  const navigate = useNavigate();

<<<<<<< HEAD
  const [visibleLogs, setVisibleLogs] = useState<AuthLog[]>(readStoredLogs);

  const refreshLogs = () => {
    setVisibleLogs(readStoredLogs());
  };
=======
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> test

  useEffect(() => {
    refreshLogs();

    const updatePreviewBarState = () => {
      setPreviewBarState(document.body.dataset.previewBar ?? "hidden");
    };

    updatePreviewBarState();

<<<<<<< HEAD
    const observer = new MutationObserver(updatePreviewBarState);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-preview-bar"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoginSuccess = () => {
=======
    setIsLoading(true);

>>>>>>> test
    const savedUser = JSON.parse(localStorage.getItem("authUser") || "{}");

    setTimeout(() => {
      navigate(savedUser.role === "admin" ? "/admin" : "/user");
    }, 2000);
  };

<<<<<<< HEAD
  const handleDemoSuccess = () => {
    navigate("/demo");
  };

  const handleClearLogs = () => {
    clearLogs();
    refreshLogs();
    onLogUpdate?.();
  };

  return (
    <main className={`login-route login-page-preview-${previewBarState}`}>
      <AuthSection
        login={login}
        loginAsDemo={loginAsDemo}
        isBlocked={isBlocked}
        refreshLogs={refreshLogs}
        onLogUpdate={onLogUpdate}
        onLoginSuccess={handleLoginSuccess}
        onDemoSuccess={handleDemoSuccess}
      />

      <LogsSection logs={visibleLogs} onClearLogs={handleClearLogs} />
    </main>
=======
  const handleDirectDemoAccess = () => {
    if (isBlocked) {
      setError("DDOS accès restricted");
      onLogUpdate?.();
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      navigate("/demo");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <img src={loaderGif} alt="Chargement..." />
        <p>Connexion en cours...</p>
      </div>
    );
  }

  return (
    <div className="font-box">
      <div className="auth-info">
        <button
          type="button"
          onClick={handleDirectDemoAccess}
          disabled={isBlocked}
          className="demo-button"
        >
          Mode démo
        </button>

        <h2 className="login-title login-title-viewer">Bienvenue 👋</h2>

        <h2 className="login-title login-title-superadmin">
          Mode Superadmin 🛡️
        </h2>

        <p className="login-description login-description-viewer">
          <br />
          Connecte-toi pour accéder à ton espace personnel, depuis celui-ci tu
          peux consulter mon portfolio et explorer les fonctionnalités
          disponibles.
          <br />
          <br />
          Consulte le mode démo pour y accéder en tant que visiteur.
        </p>

        <p className="login-description login-description-superadmin">
          <br />
          Interface de prévisualisation administrateur avancée.
          <br />
          <br />
          Tu peux tester l’affichage, la sécurité et les accès du portfolio.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Connexion</h2>

        <div className="input-box">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isBlocked}
          />
          {isBlocked && <span className="lock-icon">🔒</span>}
        </div>

        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isBlocked}
          />

          <span
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          className={isBlocked ? "login-button blocked" : "login-button"}
          disabled={isBlocked}
        >
          Se connecter
        </button>

        <div style={{ marginTop: "30px", fontSize: "12px" }}>
          <p>
            <b> Exemple de connexion : </b>
          </p>
          <p>admin / portfolio2025</p>
          <p>demo / demo</p>
        </div>
      </form>
    </div>
>>>>>>> test
  );
}