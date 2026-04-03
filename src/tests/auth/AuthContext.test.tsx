import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../../src/auth/AuthContext";

function TestConsumer() {
  const auth = useAuth();

  return (
    <div>
      <div data-testid="isAuthenticated">
        {String(auth.isAuthenticated)}
      </div>

      <div data-testid="username">
        {auth.user?.username ?? "none"}
      </div>

      <div data-testid="role">
        {auth.user?.role ?? "none"}
      </div>

      <div data-testid="previewRole">
        {auth.previewRole}
      </div>

      <div data-testid="isSuperAdmin">
        {String(auth.isSuperAdmin)}
      </div>

      <div data-testid="failedAttempts">
        {String(auth.failedAttempts)}
      </div>

      <div data-testid="isBlocked">
        {String(auth.isBlocked)}
      </div>

      <div data-testid="lockedUntil">
        {auth.lockedUntil === null ? "null" : "set"}
      </div>

      <button onClick={() => auth.login("alan", "admin_privilege")}>
        login-admin
      </button>

      <button onClick={() => auth.login("demo", "demo")}>
        login-user
      </button>

      <button onClick={() => auth.login("wrong", "wrong")}>
        login-fail
      </button>

      <button onClick={() => auth.logout()}>
        logout
      </button>

      <button onClick={() => auth.setPreviewRole("superadmin")}>
        set-superadmin
      </button>

      <button onClick={() => auth.setPreviewRole("viewer")}>
        set-viewer
      </button>

      <button onClick={() => auth.blockAccess()}>
        block-access
      </button>

      <button onClick={() => auth.unblockAccess()}>
        unblock-access
      </button>

      <button
        onClick={() => {
          const result = auth.login("wrong", "wrong");
          const el = document.getElementById("login-result");
          if (el) el.textContent = JSON.stringify(result);
        }}
      >
        login-fail-with-result
      </button>

      <button
        onClick={() => {
          const result = auth.login("alan", "admin_privilege");
          const el = document.getElementById("login-result");
          if (el) el.textContent = JSON.stringify(result);
        }}
      >
        login-admin-with-result
      </button>

      <div id="login-result" data-testid="login-result" />
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initialise avec les valeurs par défaut", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("isAuthenticated").textContent).toBe("false");
    expect(screen.getByTestId("username").textContent).toBe("none");
    expect(screen.getByTestId("role").textContent).toBe("none");
    expect(screen.getByTestId("previewRole").textContent).toBe("viewer");
    expect(screen.getByTestId("isSuperAdmin").textContent).toBe("false");
    expect(screen.getByTestId("failedAttempts").textContent).toBe("0");
    expect(screen.getByTestId("isBlocked").textContent).toBe("false");
    expect(screen.getByTestId("lockedUntil").textContent).toBe("null");
  });

  it("permet un login admin réussi", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("login-admin"));

    expect(screen.getByTestId("isAuthenticated").textContent).toBe("true");
    expect(screen.getByTestId("username").textContent).toBe("alan");
    expect(screen.getByTestId("role").textContent).toBe("admin");
    expect(screen.getByTestId("failedAttempts").textContent).toBe("0");
    expect(screen.getByTestId("lockedUntil").textContent).toBe("null");
  });

  it("permet un login user réussi", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("login-user"));

    expect(screen.getByTestId("isAuthenticated").textContent).toBe("true");
    expect(screen.getByTestId("username").textContent).toBe("demo");
    expect(screen.getByTestId("role").textContent).toBe("user");
  });

  it("incrémente failedAttempts après un login échoué", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("login-fail"));

    expect(screen.getByTestId("isAuthenticated").textContent).toBe("false");
    expect(screen.getByTestId("failedAttempts").textContent).toBe("1");
  });

  it("applique un verrouillage après 3 erreurs", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("login-fail"));
    fireEvent.click(screen.getByText("login-fail"));
    fireEvent.click(screen.getByText("login-fail"));

    expect(screen.getByTestId("failedAttempts").textContent).toBe("3");
    expect(screen.getByTestId("lockedUntil").textContent).toBe("set");
  });

  it("bloque totalement l'accès après 10 erreurs", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByText("login-fail"));
    }

    expect(screen.getByTestId("isBlocked").textContent).toBe("true");
  });

  it("permet de se déconnecter", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("login-admin"));
    fireEvent.click(screen.getByText("logout"));

    expect(screen.getByTestId("isAuthenticated").textContent).toBe("false");
    expect(screen.getByTestId("username").textContent).toBe("none");
    expect(screen.getByTestId("role").textContent).toBe("none");
  });

  it("permet de passer en mode superadmin", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("set-superadmin"));

    expect(screen.getByTestId("previewRole").textContent).toBe("superadmin");
    expect(screen.getByTestId("isSuperAdmin").textContent).toBe("true");
  });

  it("refuse blockAccess si on n'est pas superadmin", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("block-access"));

    expect(screen.getByTestId("isBlocked").textContent).toBe("false");
  });

  it("autorise blockAccess si on est superadmin", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("set-superadmin"));
    fireEvent.click(screen.getByText("block-access"));

    expect(screen.getByTestId("isBlocked").textContent).toBe("true");
  });

  it("autorise unblockAccess si on est superadmin", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("set-superadmin"));
    fireEvent.click(screen.getByText("block-access"));
    fireEvent.click(screen.getByText("unblock-access"));

    expect(screen.getByTestId("isBlocked").textContent).toBe("false");
    expect(screen.getByTestId("failedAttempts").textContent).toBe("0");
    expect(screen.getByTestId("lockedUntil").textContent).toBe("null");
  });

  it("retourne success true pour un login valide", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("login-admin-with-result"));

    expect(screen.getByTestId("login-result").textContent).toContain('"success":true');
  });

  it("retourne success false pour un login invalide", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("login-fail-with-result"));

    expect(screen.getByTestId("login-result").textContent).toContain('"success":false');
  });

  it("charge un utilisateur depuis localStorage au montage", () => {
    localStorage.setItem(
      "authUser",
      JSON.stringify({
        username: "alan",
        role: "admin",
      })
    );

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("isAuthenticated").textContent).toBe("true");
    expect(screen.getByTestId("username").textContent).toBe("alan");
    expect(screen.getByTestId("role").textContent).toBe("admin");
  });

  it("charge previewRole depuis localStorage", () => {
    localStorage.setItem("previewRole", "superadmin");

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("previewRole").textContent).toBe("superadmin");
    expect(screen.getByTestId("isSuperAdmin").textContent).toBe("true");
  });

  it("lève une erreur si useAuth est utilisé hors AuthProvider", () => {
    expect(() => render(<TestConsumer />)).toThrow(
      "useAuth doit être utilisé dans un AuthProvider"
    );
  });
});