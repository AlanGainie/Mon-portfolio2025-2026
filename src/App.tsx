// Ce portfolio est réalisé en React 19.
// Certaines signatures classiques comme JSX.Element deviennent React.JSX.Element.
// Le projet utilise TypeScript 5.

import "./styles/index.css";
import {  useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Connection
import { useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./template/pages/PageLogin.tsx";
import EnvBadge from "./template/composants/EnvBadge";

// Menue
import { Menue } from "./template/composants/Menue.tsx";
import Page, { FooterPage } from "./template/composants/Page.tsx";
import AdminPreviewBar from "./template/composants/admin/AdminPreviewBar.tsx";

// Pages
import { GLOBALMENUE, PAGESGLOBAL } from "./styles/tw.ts";

function Home() {
  const {
    isAuthenticated,
    user,
    previewRole,
    getLogs,
    clearLogs,
    unblockAccess,
  } = useAuth();

  const [logs, setLogs] = useState(getLogs());
  const [isClearing, setIsClearing] = useState(false);

  const canManageLogs = previewRole === "superadmin";

  if (isAuthenticated && user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />;
  }

  const handleUnblock = () => {
    if (!canManageLogs) return;

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
          className="buttontrashlogs"
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

                        {log.action === "blocked" && canManageLogs && (
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

type EditableSectionKey = "e5" | "e6" | "administratif";

type EditableSections = Record<EditableSectionKey, string>;

function AdminPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [actual_list_menue, setActuallistMenue] = useState(0);

  const [selectedSection, setSelectedSection] =
    useState<EditableSectionKey>("e5");

  const [sections, setSections] = useState<EditableSections>({
    e5: "",
    e6: "",
    administratif: "",
  });

  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin-editable-sections-v2");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<EditableSections>;
      setSections({
        e5: parsed.e5 ?? "",
        e6: parsed.e6 ?? "",
        administratif: parsed.administratif ?? "",
      });
    } catch (error) {
      console.error("Erreur lors du chargement des sections admin :", error);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleChangeSelectedContent = (value: string) => {
    setSections((prev) => ({
      ...prev,
      [selectedSection]: value,
    }));
    setSaveMessage("");
  };

  const handleSaveSections = () => {
    try {
      localStorage.setItem(
        "admin-editable-sections-v2",
        JSON.stringify(sections)
      );
      setSaveMessage("Modifications sauvegardées localement.");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      setSaveMessage("Erreur lors de la sauvegarde.");
    }
  };

  const selectedLabel = useMemo(() => {
    switch (selectedSection) {
      case "e5":
        return "Dossier E5";
      case "e6":
        return "Dossier E6";
      case "administratif":
        return "Dossier administratif";
      default:
        return "Section";
    }
  }, [selectedSection]);

  return (
    <div className={`${PAGESGLOBAL} page-with-toolbar app-page`}>
      <AdminPreviewBar showLogout={true} onLogout={handleLogout} />

      <div className={GLOBALMENUE}>
        <Menue
          actual_list_menue={actual_list_menue}
          setActuallistMenue={setActuallistMenue}
        />
      </div>

      <Page
        tab_menue1={actual_list_menue}
        footer="none"
        enableAnchors={actual_list_menue === 0}
      />

      {/* SECTION DOSSIER ADMINISTRATIF */}
      <section
        style={{
          width: "min(1100px, 92%)",
          margin: "24px auto 0 auto",
          padding: "24px",
          borderRadius: "24px",
          border: "1px solid var(--border)",
          background: "var(--bg-overlay-strong)",
          boxShadow: "var(--shadow-soft)",
          backdropFilter: "blur(12px)",
          color: "var(--text)",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "8px",
            }}
          >
            Administration
          </div>

          <h2
            style={{
              margin: 0,
              textAlign: "left",
              fontSize: "2rem",
              color: "var(--text-strong)",
            }}
          >
            Dossier administratif
          </h2>
        </div>

        <div
          style={{
            padding: "18px",
            borderRadius: "18px",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
          }}
        >
          <p
            style={{
              margin: 0,
              lineHeight: 1.8,
              color: "var(--text-soft)",
              whiteSpace: "pre-wrap",
            }}
          >
            {sections.administratif ||
              "Aucun contenu administratif enregistré pour le moment."}
          </p>
        </div>
      </section>

      {/* BLOC UNIQUE D'ÉDITION */}
      <section
        style={{
          width: "min(1100px, 92%)",
          margin: "24px auto 40px auto",
          padding: "24px",
          borderRadius: "24px",
          border: "1px solid var(--border)",
          background: "var(--bg-overlay-strong)",
          boxShadow: "var(--shadow-soft)",
          backdropFilter: "blur(12px)",
          color: "var(--text)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "18px",
            textAlign: "left",
            color: "var(--text-strong)",
          }}
        >
          Édition des sections
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label
            htmlFor="admin-section-select"
            style={{ fontWeight: 700, color: "var(--text-strong)" }}
          >
            Section à modifier :
          </label>

          <select
            id="admin-section-select"
            value={selectedSection}
            onChange={(e) =>
              setSelectedSection(e.target.value as EditableSectionKey)
            }
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid var(--border-soft)",
              background: "var(--bg-elevated)",
              color: "var(--text)",
              font: "inherit",
            }}
          >
            <option value="e5">Dossier E5</option>
            <option value="e6">Dossier E6</option>
            <option value="administratif">Dossier administratif</option>
          </select>
        </div>

        <div
          style={{
            marginBottom: "12px",
            fontWeight: 700,
            color: "var(--text-strong)",
          }}
        >
          Édition de : {selectedLabel}
        </div>

        <textarea
          value={sections[selectedSection]}
          onChange={(e) => handleChangeSelectedContent(e.target.value)}
          placeholder={`Modifier le contenu de ${selectedLabel}`}
          style={{
            width: "100%",
            minHeight: "220px",
            resize: "vertical",
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid var(--border-soft)",
            background: "var(--bg-elevated)",
            color: "var(--text)",
            boxSizing: "border-box",
            font: "inherit",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginTop: "18px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={handleSaveSections}
            className="admin-preview-button"
          >
            Sauvegarder
          </button>

          {saveMessage && (
            <span
              style={{
                fontSize: "14px",
                color: "var(--text-soft)",
              }}
            >
              {saveMessage}
            </span>
          )}
        </div>
      </section>

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
        <Page
          tab_menue1={actual_list_menue}
          footer="none"
          enableAnchors={actual_list_menue === 0}
        />
      </div>

      <FooterPage />
    </div>
  );
}

function App() {
  return (
    <>
      <EnvBadge />

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
    </>
  );
}

export default App;