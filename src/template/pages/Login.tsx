import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

type LoginProps = {
  onLogUpdate?: () => void;
};

export default function Login({ onLogUpdate }: LoginProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = login(username, password);

    if (!result.success) {
      setError(result.message || "Identifiants incorrects.");
      onLogUpdate?.();
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("authUser") || "{}");

    navigate(savedUser.role === "admin" ? "/admin" : "/user");
  };

  return (
    <div className="container">
      <div className="font-box">
        <form onSubmit={handleSubmit}>
          <h2>Connexion</h2>

          <div className="input-box">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" style={{ marginTop: "20px" }}>
            Se connecter
          </button>

          <div style={{ marginTop: "10px", fontSize: "12px" }}>
            <p>admin / portfolio2025</p>
            <p>demo / demo123</p>
          </div>
        </form>
      </div>
    </div>
  );
}