import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../../src/auth/ProtectedRoute";

vi.mock("../../../auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "../../../src/auth/AuthContext";

function ProtectedContent() {
  return <div>Contenu protégé</div>;
}

function LoginPage() {
  return <div>Page login</div>;
}

function UserPage() {
  return <div>Page user</div>;
}

function renderWithRouter(
  initialPath: string,
  authValue: {
    isAuthenticated: boolean;
    user: { username: string; role: "admin" | "user" } | null;
    previewRole: "viewer" | "superadmin";
  },
  requiredRole?: "admin" | "user"
) {
  vi.mocked(useAuth).mockReturnValue(authValue as any);

  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute requiredRole={requiredRole}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={requiredRole}>
              <ProtectedContent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute requiredRole={requiredRole}>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('laisse toujours passer le superadmin, même sans être authentifié', () => {
    renderWithRouter("/admin", {
      isAuthenticated: false,
      user: null,
      previewRole: "superadmin",
    }, "admin");

    expect(screen.getByText("Contenu protégé")).toBeInTheDocument();
  });

  it('laisse la route "/" libre même sans authentification', () => {
    renderWithRouter("/", {
      isAuthenticated: false,
      user: null,
      previewRole: "viewer",
    });

    expect(screen.getByText("Page login")).toBeInTheDocument();
  });

  it("redirige vers / si l'utilisateur n'est pas authentifié", () => {
    renderWithRouter("/admin", {
      isAuthenticated: false,
      user: null,
      previewRole: "viewer",
    }, "admin");

    expect(screen.getByText("Page login")).toBeInTheDocument();
  });

  it("autorise un utilisateur authentifié si aucun rôle n'est requis", () => {
    renderWithRouter("/user", {
      isAuthenticated: true,
      user: { username: "demo", role: "user" },
      previewRole: "viewer",
    });

    expect(screen.getByText("Page user")).toBeInTheDocument();
  });

  it("autorise toujours un admin normal même si requiredRole vaut user", () => {
    renderWithRouter("/admin", {
      isAuthenticated: true,
      user: { username: "alan", role: "admin" },
      previewRole: "viewer",
    }, "user");

    expect(screen.getByText("Contenu protégé")).toBeInTheDocument();
  });

  it("autorise un user si le rôle requis est user", () => {
    renderWithRouter("/user", {
      isAuthenticated: true,
      user: { username: "demo", role: "user" },
      previewRole: "viewer",
    }, "user");

    expect(screen.getByText("Page user")).toBeInTheDocument();
  });

  it("redirige vers /user si un user essaie d'accéder à une route admin", () => {
    renderWithRouter("/admin", {
      isAuthenticated: true,
      user: { username: "demo", role: "user" },
      previewRole: "viewer",
    }, "admin");

    expect(screen.getByText("Page user")).toBeInTheDocument();
  });

  it("autorise un admin avec requiredRole=admin", () => {
    renderWithRouter("/admin", {
      isAuthenticated: true,
      user: { username: "alan", role: "admin" },
      previewRole: "viewer",
    }, "admin");

    expect(screen.getByText("Contenu protégé")).toBeInTheDocument();
  });

  it("redirige vers / si isAuthenticated=true mais user=null", () => {
    renderWithRouter("/admin", {
      isAuthenticated: true,
      user: null,
      previewRole: "viewer",
    }, "admin");

    expect(screen.getByText("Page login")).toBeInTheDocument();
  });
});