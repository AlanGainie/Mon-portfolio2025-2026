import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function LoginPanel() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(username, password);

    if (!success) {
      setError("Identifiants incorrects.");
      return;
    }

    setError("");

    const savedUser = JSON.parse(localStorage.getItem("authUser") || "{}");

    if (savedUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <div>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Se connecter</button>

      <div style={{ marginTop: '10px', fontSize: '12px' }}>
        <p>admin / portfolio2025</p>
        <p>demo / demo123</p>
      </div>
    </form>
  );
}