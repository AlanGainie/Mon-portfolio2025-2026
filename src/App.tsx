// Se portfolio est réaliser en React 19 de fais quelques signature classique
// comme JSX.Element deviennent à présent : React.JSX.Element toutefois je suis
// en Typescript 5

import './styles/index.css';
import { useState } from "react";
// Connection
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './template/pages/Login';
// Menue
import { Menue, ContentMenues } from './template/composants/Menue.tsx';
import { GLOBALMENUE, PAGESGLOBAL } from './styles/tw.ts';

import AdminPreviewBar from './template/composants/AdminPreviewBar';

type PreviewRole = "admin" | "user";

type PreviewProps = {
  previewRole: PreviewRole;
  setPreviewRole: React.Dispatch<React.SetStateAction<PreviewRole>>;
};

function Home({ previewRole, setPreviewRole }: PreviewProps) {
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

  const handleClearLogs = async () => {
    setIsClearing(true);

    setTimeout(() => {
      clearLogs();
      setLogs([]);
      setIsClearing(false);
    }, 600);
  };

  return (
    <div
      style={{
        background: "black",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <AdminPreviewBar
        previewRole={previewRole}
        setPreviewRole={setPreviewRole}
      />

      <h1>Mon Portfolio</h1>
      <p>Bienvenue sur mon portfolio.</p>

      <Login onLogUpdate={() => setLogs(getLogs())} />

      <div style={{ width: "100%", maxWidth: "900px", marginTop: "40px" }}>
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
    </div>
  );
}

function AdminPage({ previewRole, setPreviewRole }: PreviewProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [actual_list_menue, setActuallistMenue] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className={PAGESGLOBAL}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '24px',
          color: 'white',
        }}
      >
        <AdminPreviewBar
          previewRole={previewRole}
          setPreviewRole={setPreviewRole}
        />

        <button onClick={handleLogout}>
          Déconnexion
        </button>
      </div>

      <div className={GLOBALMENUE}>
        <Menue
          actual_list_menue={actual_list_menue}
          setActuallistMenue={setActuallistMenue}
        />
      </div>

      <div style={{ padding: '24px', color: 'white' }}>
        <h1>Page Admin</h1>
      </div>

      <ContentMenues actualmenue={actual_list_menue} />
    </div>
  );
}

function UserPage({ previewRole, setPreviewRole }: PreviewProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [actual_list_menue, setActuallistMenue] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className={PAGESGLOBAL}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '24px',
          color: 'white',
        }}
      >
        <AdminPreviewBar
          previewRole={previewRole}
          setPreviewRole={setPreviewRole}
        />

        <button onClick={handleLogout}>
          Déconnexion
        </button>
      </div>

      <div className={GLOBALMENUE}>
        <Menue
          actual_list_menue={actual_list_menue}
          setActuallistMenue={setActuallistMenue}
        />
      </div>

      <div style={{ padding: '24px', color: 'white' }}>
        <h1>Page User</h1>
      </div>

      <ContentMenues actualmenue={actual_list_menue} />
    </div>
  );
}

// Définir une taille de fenêtre de + de 2000px pour pouvoir scroll down ou up
function App() {
  const [previewRole, setPreviewRole] = useState<PreviewRole>("user");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            previewRole={previewRole}
            setPreviewRole={setPreviewRole}
          />
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage
              previewRole={previewRole}
              setPreviewRole={setPreviewRole}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute requiredRole="user">
            <UserPage
              previewRole={previewRole}
              setPreviewRole={setPreviewRole}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;