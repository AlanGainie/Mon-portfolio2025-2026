import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function RouteDemo() {
  const { isAuthenticated, user, isBlocked, loginAsDemo } = useAuth();

  const [previewBarState, setPreviewBarState] = useState(
    document.body.dataset.previewBar ?? "hidden"
  );

  useEffect(() => {
    if (isBlocked) return;

    if (!isAuthenticated || user?.role !== "demo") {
      loginAsDemo();
    }
  }, [isBlocked, isAuthenticated, user, loginAsDemo]);

  // 👇 écoute la preview bar
  useEffect(() => {
    const updatePreviewBarState = () => {
      setPreviewBarState(document.body.dataset.previewBar ?? "hidden");
    };

    const observer = new MutationObserver(updatePreviewBarState);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-preview-bar"],
    });

    return () => observer.disconnect();
  }, []);

  if (isBlocked) {
    return <Navigate to="/" replace />;
  }

  if (isAuthenticated && user?.role === "demo") {
    return <Navigate to="/user" replace />;
  }

  return (
    <div className={`route-loading route-loading-preview-${previewBarState}`}>
      <div className="route-loader" />
      <p className="route-loading-text">Activation du mode démo...</p>
    </div>
  );
}