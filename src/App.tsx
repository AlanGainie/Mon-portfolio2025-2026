// Ce portfolio est réalisé en React 19.
// Certaines signatures classiques comme JSX.Element deviennent React.JSX.Element.
// Le projet utilise TypeScript 5.

import "./styles/index.css";
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Connection
import { useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./template/pages/Login";

// Menue
import { Menue } from "./template/composants/Menue.tsx";
import Page, { FooterPage } from "./template/composants/Page.tsx";
import AdminPreviewBar from "./template/composants/AdminPreviewBar";

// Pages
import { GLOBALMENUE, PAGESGLOBAL } from "./styles/tw.ts";

function Home() {
  const { isAuthenticated, user, getLogs, clearLogs, unblockAccess } = useAuth();
  const [logs, setLogs] = useState(getLogs());
  const [isClearing, setIsClearing] = useState(false);

  if (isAuthenticated && user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />;
  }

  const handleUnblock = () => {
    unblockAccess();
    setLogs(getLogs());
  };

  const handleClearLogs = () => {
    setIsClearing(true);

    window.setTimeout(() => {
      clearLogs();
      setLogs([]);
      setIsClearing(false);
    }, 600);
  };

  return (
    <div
      className="page-with-toolbar app-page"
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AdminPreviewBar />

      <h1>Mon Portfolio</h1>
      <p>Bienvenue sur mon portfolio.</p>

      <Login onLogUpdate={() => setLogs(getLogs())} />

      <div
        className="page-main-content"
        style={{ width: "100%", maxWidth: "900px", marginTop: "40px" }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "16px" }}>
          Historique des connexions
        </h2>

        <button
          onClick={handleClearLogs}
          disabled={isClearing}
          style={{
            marginBottom: "20px",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            opacity: isClearing ? 0.8 : 1,
          }}
        >
          {isClearing && <span className="loader"></span>}
          {isClearing ? "Vidage..." : "Vider les logs"}
        </button>

        {logs.length === 0 ? (
          <p>Aucun log enregistré.</p>
        ) : (
          <div className="logs-container custom-scroll">
            <ul className="logs-list">
              {logs
                .slice()
                .reverse()
                .map((log) => (
                  <li
                    key={log.id}
                    className={`log-item ${
                      log.action === "blocked"
                        ? "log-blocked"
                        : log.action === "unblocked"
                        ? "log-unblocked"
                        : log.action === "logout"
                        ? "log-logout"
                        : log.action === "error"
                        ? "log-error"
                        : log.role === "admin"
                        ? "log-admin"
                        : "log-user"
                    }`}
                  >
                    <div className="log-content">
                      <div>
                        <strong>{log.username}</strong> ({log.role}) a effectué{" "}
                        <strong>{log.action}</strong>
                        <br />
                        <span>Points : {log.severityPoints}</span>
                        <br />
                        <span className="log-date">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <div className="log-side">
                        {log.message && (
                          <span className="log-message">{log.message}</span>
                        )}

                        <span className="log-icon">
                          {log.action === "blocked"
                            ? "🔒"
                            : log.action === "unblocked"
                            ? "🔓"
                            : log.action === "error"
                            ? "⚠️"
                            : log.action === "logout"
                            ? "🟠"
                            : log.role === "admin"
                            ? "🔴"
                            : "🟢"}
                        </span>

                        {log.action === "blocked" && (
                          <button
                            className="unblock-button"
                            onClick={handleUnblock}
                            title="Débloquer l'accès"
                          >
                            Débloquer
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <FooterPage />
    </div>
  );
}

function AdminPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [actual_list_menue, setActuallistMenue] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className={`${PAGESGLOBAL} page-with-toolbar app-page`}>
      <AdminPreviewBar showLogout={true} onLogout={handleLogout} />

      <div className={GLOBALMENUE}>
        <Menue
          actual_list_menue={actual_list_menue}
          setActuallistMenue={setActuallistMenue}
        />
      </div>

      <Page tab_menue1={actual_list_menue} footer="none" />
      <FooterPage />
    </div>
  );
}

function UserPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [actual_list_menue, setActuallistMenue] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className={`${PAGESGLOBAL} page-with-toolbar app-page`}>
      <AdminPreviewBar showLogout={true} onLogout={handleLogout} />

      <div className={GLOBALMENUE}>
        <Menue
          actual_list_menue={actual_list_menue}
          setActuallistMenue={setActuallistMenue}
        />
      </div>

      <div className="page-main-content">
        <Page tab_menue1={actual_list_menue} footer="none" />
      </div>

      <FooterPage />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute requiredRole="user">
            <UserPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;