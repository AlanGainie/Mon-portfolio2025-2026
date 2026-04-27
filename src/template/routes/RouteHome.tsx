// src/template/pages/Home.tsx

import { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Login from "./RouteLogin";
import Page, { FooterPage } from "../pages/Page";
import Menue from "../composants/navigations/Menue";
import AdminPreviewBar from "../composants/admin/AdminPreviewBar";

import { GLOBALMENUE, PAGESGLOBAL } from "../../styles/tw";
import menuData from "../../../datas/Menue.json";

const HOME_ANCHOR_IDS = [
  "video-intro",
  "sommaire",
  "presentation-candidat",
  "cv-carousel",
  "epreuves-e5-e6",
] as const;

type HomeType = "login" | "user" | "admin";

type EditableSectionKey = "e5" | "e6" | "administratif";
type EditableSections = Record<EditableSectionKey, string>;

type HomeProps = {
  type: HomeType;
};

function Home({ type }: HomeProps) {
  const { getLogs, clearLogs, logout } = useAuth();
  const navigate = useNavigate();

  const [actual_list_menue, setActuallistMenue] = useState(0);
  const [logs, setLogs] = useState(getLogs());
  const [isClearing, setIsClearing] = useState(false);
  const [, setSections] = useState<EditableSections>({
    e5: "",
    e6: "",
    administratif: "",
  });

  useEffect(() => {
    if (type !== "admin") return;

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
      console.error("Erreur chargement sections :", error);
    }
  }, [type]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleClearLogs = () => {
    setIsClearing(true);

    setTimeout(() => {
      clearLogs();
      setLogs([]);
      setIsClearing(false);
    }, 600);
  };

  // =========================
  // LOGIN PAGE
  // =========================
  if (type === "login") {
    return (
      <div className="login-page">
        <AdminPreviewBar />

        <Login onLogUpdate={() => setLogs(getLogs())} />

        <div className="logs-section">
          <h2>Historique</h2>

          <button onClick={handleClearLogs}>
            {isClearing ? "Vidage..." : "Vider"}
          </button>

          <ul>
            {logs.map((log) => (
              <li key={log.id}>
                {log.username} - {log.action}
              </li>
            ))}
          </ul>
        </div>

        <FooterPage />
      </div>
    );
  }

  // =========================
  // MAIN APP
  // =========================
  return (
    <div className={`${PAGESGLOBAL} page-with-toolbar app-page`}>
      <AdminPreviewBar showLogout onLogout={handleLogout} />

      <div className={GLOBALMENUE}>
        <Menue
          sections={menuData.sections}
          HOME_ANCHOR_IDS={HOME_ANCHOR_IDS}
          actual_list_menue={actual_list_menue}
          setActuallistMenue={setActuallistMenue}
        />
      </div>

      <div className="page-main-content">
        <Page
          type={type}
          pageDataFile={type === "admin" ? "PageAdmin.json" : "PageUser.json"}
          enableAnchors={actual_list_menue === 0}
        />
      </div>

      <FooterPage />
    </div>
  );
}

export default Home;