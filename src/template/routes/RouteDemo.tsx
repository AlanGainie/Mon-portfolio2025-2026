import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function RouteDemo() {
  const { isAuthenticated, user, isBlocked, loginAsDemo } = useAuth();

  useEffect(() => {
    if (isBlocked) return;

    if (!isAuthenticated || user?.role !== "demo") {
      loginAsDemo();
    }
  }, [isBlocked, isAuthenticated, user, loginAsDemo]);

  if (isBlocked) {
    return <Navigate to="/" replace />;
  }

  if (isAuthenticated && user?.role === "demo") {
    return <Navigate to="/user" replace />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <p>Activation du mode démo...</p>
    </div>
  );
}