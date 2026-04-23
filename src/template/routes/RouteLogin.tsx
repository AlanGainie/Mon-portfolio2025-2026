import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

type LoginProps = {
  onLogUpdate?: () => void;
};

export default function Login({ onLogUpdate }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isBlocked } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔹 Nouveau contenu dynamique
  const infoText = {
  title: "Bienvenue 👋",
  description: (
      <>
        <br />
        Connecte-toi pour accéder à ton espace personnel, depuis celui-ci tu peux consulter mon portfolio et explorer les fonctionnalités disponibles.
        <br /><br />
        Consulte le mode démo pour y accéder en tant que visiteur.
      </>
    )
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = login(username, password);

    if (!result.success) {
      setError(result.message || "Identifiants incorrects.");
      onLogUpdate?.();
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("authUser") || "{}");
    navigate(savedUser.role === "admin" ? "/admin" : "/user");
  };

  const handleDirectDemoAccess = () => {
    if (isBlocked) {
      setError("DDOS accès restricted");
      onLogUpdate?.();
      return;
    }

    setError("");
    navigate("/demo");
  };

  return (
  <div className="font-box">

    {/* 🔹 SECTION TEXTE */}
    <div className="auth-info">
      <button
        type="button"
        onClick={handleDirectDemoAccess}
        disabled={isBlocked}
        className="demo-button"
      >
        Mode démo
      </button>

      <h2>{infoText.title}</h2>
      <p>{infoText.description}</p>
    </div>

    {/* 🔹 FORM */}
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
        <p><b> Exemple de connexion : </b></p>
        <p>admin / portfolio2025</p>
        <p>demo / demo</p>
      </div>
    </form>

  </div>
)};