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
    <div className="container">
      <div
        className="font-box"
        style={{ position: "relative" }}
      >
        <button
          type="button"
          onClick={handleDirectDemoAccess}
          disabled={isBlocked}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            backgroundColor: "#f7c99f",
            color: "#5c2f0b",
            border: "1px solid #efb27d",
            borderRadius: "999px",
            padding: "8px 14px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: isBlocked ? "not-allowed" : "pointer",
            opacity: isBlocked ? 0.6 : 1,
            transition: "0.2s ease",
          }}
        >
          Mode démo
        </button>

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

          <div style={{ marginTop: "10px", fontSize: "12px" }}>
            <p>admin / portfolio2025</p>
            <p>demo / demo</p>
          </div>
        </form>
      </div>
    </div>
  );
}