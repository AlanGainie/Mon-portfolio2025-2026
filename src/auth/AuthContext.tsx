import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "admin" | "user";
type PreviewRole = "admin" | "user";

type FakeUser = {
  username: string;
  password: string;
  role: Role;
};

type AuthUser = {
  username: string;
  role: Role; // rôle de navigation / route
  isSuperAdmin: boolean; // rôle spécial preview/global
};

type AuthLog = {
  id: string;
  username: string;
  role: Role | "unknown";
  action: "login" | "logout" | "error" | "blocked" | "unblocked";
  timestamp: string;
  severityPoints: number;
  message?: string;
};

type LoginResult = {
  success: boolean;
  message?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => LoginResult;
  logout: () => void;
  switchAccountRole: (role: PreviewRole, username?: string) => void;
  getLogs: () => AuthLog[];
  clearLogs: () => void;
  isBlocked: boolean;
  failedAttempts: number;
  lockedUntil: number | null;
  blockAccess: () => void;
  unblockAccess: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_USERS: FakeUser[] = [
  { username: "admin", password: "portfolio2025", role: "admin" },
  { username: "demo", password: "demo123", role: "user" },
];

const AUTH_USER_KEY = "authUser";
const AUTH_LOGS_KEY = "authLogs";
const FAILED_ATTEMPTS_KEY = "failedAttempts";
const LOCKED_UNTIL_KEY = "lockedUntil";
const IS_BLOCKED_KEY = "isBlocked";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_USER_KEY);
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser) as AuthUser;

        const normalizedUser: AuthUser = {
          username: parsedUser.username,
          role: parsedUser.role,
          isSuperAdmin: parsedUser.isSuperAdmin ?? false,
        };

        setUser(normalizedUser);
        console.log("🔄 AUTH INIT USER:", normalizedUser);
      } catch {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const savedAttempts = localStorage.getItem(FAILED_ATTEMPTS_KEY);
    const savedLockedUntil = localStorage.getItem(LOCKED_UNTIL_KEY);
    const savedBlocked = localStorage.getItem(IS_BLOCKED_KEY);

    if (savedAttempts) setFailedAttempts(Number(savedAttempts));
    if (savedLockedUntil) setLockedUntil(Number(savedLockedUntil));
    if (savedBlocked === "true") setIsBlocked(true);
  }, []);

  useEffect(() => {
    console.log("👤 AUTH USER UPDATED:", user);
  }, [user]);

  const addLog = (
    username: string,
    role: Role | "unknown",
    action: AuthLog["action"],
    severityPoints: number,
    message?: string
  ) => {
    const logs: AuthLog[] = JSON.parse(localStorage.getItem(AUTH_LOGS_KEY) || "[]");

    const newLog: AuthLog = {
      id: Date.now().toString(),
      username,
      role,
      action,
      timestamp: new Date().toISOString(),
      severityPoints,
      message,
    };

    logs.push(newLog);
    localStorage.setItem(AUTH_LOGS_KEY, JSON.stringify(logs, null, 2));
  };

  // Ici, "admin" / "user" ne change plus le rôle de route.
  // Ça active ou désactive le mode superadmin global.
  const switchAccountRole = (role: PreviewRole, username?: string) => {
    setUser((prev) => {
      const baseUser: AuthUser =
        prev ?? {
          username: username ?? "preview-user",
          role: "user",
          isSuperAdmin: false,
        };

      const nextIsSuperAdmin = role === "admin";

      if (baseUser.isSuperAdmin === nextIsSuperAdmin) {
        console.log("ℹ️ switchAccountRole ignoré : état preview déjà actif", role);
        return baseUser;
      }

      const updatedUser: AuthUser = {
        ...baseUser,
        isSuperAdmin: nextIsSuperAdmin,
      };

      console.log("🔁 SWITCH SUPERADMIN:", {
        before: baseUser.isSuperAdmin,
        after: updatedUser.isSuperAdmin,
        user: updatedUser,
      });

      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
      addLog(
        updatedUser.username,
        updatedUser.role,
        "login",
        0,
        `Changement du mode superadmin vers ${role}`
      );

      return updatedUser;
    });
  };

  const blockAccess = () => {
    setIsBlocked(true);
    localStorage.setItem(IS_BLOCKED_KEY, "true");
    addLog("admin-action", "admin", "blocked", failedAttempts, "Accès bloqué manuellement");
    console.log("⛔ Accès bloqué");
  };

  const unblockAccess = () => {
    setIsBlocked(false);
    setFailedAttempts(0);
    setLockedUntil(null);

    localStorage.setItem(IS_BLOCKED_KEY, "false");
    localStorage.setItem(FAILED_ATTEMPTS_KEY, "0");
    localStorage.removeItem(LOCKED_UNTIL_KEY);

    addLog("admin-action", "admin", "unblocked", 0, "Accès débloqué manuellement");
    console.log("✅ Accès débloqué");
  };

  const login = (username: string, password: string): LoginResult => {
    const now = Date.now();

    if (isBlocked) {
      addLog(username || "unknown", "unknown", "error", failedAttempts, "DDOS accès restricted");
      console.log("⛔ Login refusé : accès bloqué");
      return { success: false, message: "DDOS accès restricted" };
    }

    if (lockedUntil && now < lockedUntil) {
      const remaining = Math.ceil((lockedUntil - now) / 1000);
      console.log("⏳ Login refusé : délai actif", remaining);
      return {
        success: false,
        message: `Trop de tentatives. Réessaie dans ${remaining} seconde(s).`,
      };
    }

    const foundUser = FAKE_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem(FAILED_ATTEMPTS_KEY, String(newAttempts));

      console.log("❌ Login échoué", {
        username,
        attempts: newAttempts,
      });

      if (newAttempts >= 10) {
        setIsBlocked(true);
        localStorage.setItem(IS_BLOCKED_KEY, "true");
        addLog(
          username || "unknown",
          "unknown",
          "blocked",
          newAttempts,
          "DDOS accès restricted"
        );
        return { success: false, message: "DDOS accès restricted" };
      }

      if (newAttempts >= 5) {
        const nextLock = now + 10000;
        setLockedUntil(nextLock);
        localStorage.setItem(LOCKED_UNTIL_KEY, String(nextLock));
        addLog(
          username || "unknown",
          "unknown",
          "error",
          newAttempts,
          "Délai de 10 secondes appliqué"
        );
        return { success: false, message: "Trop d'erreurs. Attente de 10 secondes." };
      }

      if (newAttempts >= 3) {
        const nextLock = now + 5000;
        setLockedUntil(nextLock);
        localStorage.setItem(LOCKED_UNTIL_KEY, String(nextLock));
        addLog(
          username || "unknown",
          "unknown",
          "error",
          newAttempts,
          "Délai de 5 secondes appliqué"
        );
        return { success: false, message: "Trop d'erreurs. Attente de 5 secondes." };
      }

      addLog(
        username || "unknown",
        "unknown",
        "error",
        newAttempts,
        `Point de vigilance ${newAttempts}`
      );

      return {
        success: false,
        message: `Identifiants incorrects. Vigilance ${newAttempts}.`,
      };
    }

    const authUser: AuthUser = {
      username: foundUser.username,
      role: foundUser.role,
      isSuperAdmin: false,
    };

    setUser(authUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));

    setFailedAttempts(0);
    setLockedUntil(null);
    localStorage.setItem(FAILED_ATTEMPTS_KEY, "0");
    localStorage.removeItem(LOCKED_UNTIL_KEY);

    addLog(foundUser.username, foundUser.role, "login", 0, "Connexion réussie");

    console.log("✅ LOGIN SUCCESS:", authUser);

    return { success: true };
  };

  const logout = () => {
    if (user) {
      addLog(user.username, user.role, "logout", 0, "Déconnexion réussie");
      console.log("🚪 LOGOUT:", user);
    }

    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const getLogs = (): AuthLog[] => {
    return JSON.parse(localStorage.getItem(AUTH_LOGS_KEY) || "[]");
  };

  const clearLogs = () => {
    localStorage.removeItem(AUTH_LOGS_KEY);
    console.log("🧹 Logs supprimés");
  };

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: user !== null,
      user,
      login,
      logout,
      switchAccountRole,
      getLogs,
      clearLogs,
      isBlocked,
      failedAttempts,
      lockedUntil,
      blockAccess,
      unblockAccess,
    }),
    [user, isBlocked, failedAttempts, lockedUntil]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
}