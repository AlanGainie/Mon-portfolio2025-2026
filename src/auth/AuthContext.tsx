import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "admin" | "user";

type FakeUser = {
  username: string;
  password: string;
  role: Role;
};

type AuthUser = {
  username: string;
  role: Role;
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
  switchAccountRole: (role: Role) => void;
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
  { username: "alan", password: "admin_privilege", role: "admin" },
  { username: "test", password: "test", role: "user" },
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

    if (!savedUser) return;

    try {
      const parsedUser = JSON.parse(savedUser) as AuthUser;
      setUser(parsedUser);
    } catch {
      localStorage.removeItem(AUTH_USER_KEY);
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

  const addLog = (
    username: string,
    role: Role | "unknown",
    action: AuthLog["action"],
    severityPoints: number,
    message?: string
  ) => {
    const logs: AuthLog[] = JSON.parse(localStorage.getItem(AUTH_LOGS_KEY) || "[]");

    const newLog: AuthLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
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

  const resetSecurityState = () => {
    setFailedAttempts(0);
    setLockedUntil(null);

    localStorage.setItem(FAILED_ATTEMPTS_KEY, "0");
    localStorage.removeItem(LOCKED_UNTIL_KEY);
  };

  const switchAccountRole = (role: Role) => {
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.role === role) return prev;

      const updated: AuthUser = {
        ...prev,
        role,
      };

      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
      addLog(prev.username, role, "login", 0, `Changement de rôle vers ${role}`);

      return updated;
    });
  };

  const blockAccess = () => {
    setIsBlocked(true);
    localStorage.setItem(IS_BLOCKED_KEY, "true");
    addLog("admin-action", "admin", "blocked", failedAttempts, "Accès bloqué manuellement");
  };

  const unblockAccess = () => {
    setIsBlocked(false);
    setFailedAttempts(0);
    setLockedUntil(null);

    localStorage.setItem(IS_BLOCKED_KEY, "false");
    localStorage.setItem(FAILED_ATTEMPTS_KEY, "0");
    localStorage.removeItem(LOCKED_UNTIL_KEY);

    addLog("admin-action", "admin", "unblocked", 0, "Accès débloqué manuellement");
  };

  const login = (username: string, password: string): LoginResult => {
    const now = Date.now();

    if (isBlocked) {
      addLog(username || "unknown", "unknown", "error", failedAttempts, "DDOS accès restricted");
      return { success: false, message: "DDOS accès restricted" };
    }

    if (lockedUntil && now < lockedUntil) {
      const remaining = Math.ceil((lockedUntil - now) / 1000);
      return {
        success: false,
        message: `Réessaie dans ${remaining}s`,
      };
    }

    const foundUser = FAKE_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem(FAILED_ATTEMPTS_KEY, String(newAttempts));

      addLog(
        username || "unknown",
        "unknown",
        "error",
        newAttempts,
        "Identifiants incorrects"
      );

      return {
        success: false,
        message: "Identifiants incorrects",
      };
    }

    const authUser: AuthUser = {
      username: foundUser.username,
      role: foundUser.role,
    };

    setUser(authUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));

    resetSecurityState();

    addLog(foundUser.username, foundUser.role, "login", 0, "Connexion réussie");

    return { success: true };
  };

  const logout = () => {
    if (user) {
      addLog(user.username, user.role, "logout", 0, "Déconnexion réussie");
    }

    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const getLogs = (): AuthLog[] => {
    return JSON.parse(localStorage.getItem(AUTH_LOGS_KEY) || "[]");
  };

  const clearLogs = () => {
    localStorage.removeItem(AUTH_LOGS_KEY);
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