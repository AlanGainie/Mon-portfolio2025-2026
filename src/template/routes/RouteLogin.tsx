import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

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

  const [visibleLogs, setVisibleLogs] = useState<AuthLog[]>(readStoredLogs);

  const refreshLogs = () => {
    setVisibleLogs(readStoredLogs());
  };

  useEffect(() => {
    refreshLogs();

    const updatePreviewBarState = () => {
      setPreviewBarState(document.body.dataset.previewBar ?? "hidden");
    };

    updatePreviewBarState();

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
    const savedUser = JSON.parse(localStorage.getItem("authUser") || "{}");
    navigate(savedUser.role === "admin" ? "/admin" : "/user");
  };

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
  );
}