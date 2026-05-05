import { useState } from "react";

type LoginResult = {
  success: boolean;
  message?: string;
};

type AuthSectionProps = {
  login: (username: string, password: string) => LoginResult;
  loginAsDemo: () => LoginResult;
  isBlocked: boolean;
  refreshLogs: () => void;
  onLogUpdate?: () => void;
  onLoginSuccess: () => void;
  onDemoSuccess: () => void;
};

export default function AuthSection({
  login,
  loginAsDemo,
  isBlocked,
  refreshLogs,
  onLogUpdate,
  onLoginSuccess,
  onDemoSuccess,
}: AuthSectionProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = login(username, password);

    refreshLogs();
    onLogUpdate?.();

    if (!result.success) {
      setError(result.message || "Identifiants incorrects.");
      return;
    }

    onLoginSuccess();
  };

  const handleDirectDemoAccess = () => {
    setError("");

    const result = loginAsDemo();

    refreshLogs();
    onLogUpdate?.();

    if (!result.success) {
      setError(result.message || "Erreur mode démo.");
      return;
    }

    onDemoSuccess();
  };

  return (
    <div className="container">
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

          <h2>Bienvenue 👋</h2>
          <p>
            <br />
            Connecte-toi pour accéder à ton espace personnel, depuis celui-ci tu
            peux consulter mon portfolio et explorer les fonctionnalités
            disponibles.
            <br />
            <br />
            Consulte le mode démo pour y accéder en tant que visiteur.
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
              <b>Exemple de connexion :</b>
            </p>
            <p>admin / portfolio2025</p>
            <p>demo / demo</p>
          </div>
        </form>
      </div>
    </div>
  );
}