import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type LoginRole = "admin" | "user" | "demo";
type PreviewRole = "viewer" | "superadmin";

type FakeUser = {
  username: string;
  password: string;
  role: LoginRole;
};

type AuthUser = {
  username: string;
  role: LoginRole;
};

export type AuthLog = {
  id: string;
  username: string;
  role: LoginRole | "unknown";
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

  previewRole: PreviewRole;
  isSuperAdmin: boolean;
  setPreviewRole: (role: PreviewRole) => void;
  switchAccountRole: (role: PreviewRole) => void;

  login: (username: string, password: string) => LoginResult;
  loginAsDemo: () => LoginResult;
  logout: () => void;

  logs: AuthLog[];
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
  { username: "gregory", password: "crespin", role: "admin" },
  { username: "demo", password: "demo", role: "demo" },
  { username: "test", password: "test", role: "user" },
  { username: "yaouen", password: "ledanvic", role: "user" },
];

const AUTH_USER_KEY = "authUser";
const AUTH_LOGS_KEY = "authLogs";
const FAILED_ATTEMPTS_KEY = "failedAttempts";
const LOCKED_UNTIL_KEY = "lockedUntil";
const IS_BLOCKED_KEY = "isBlocked";
const PREVIEW_ROLE_KEY = "previewRole";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [previewRole, setPreviewRoleState] = useState<PreviewRole>("viewer");
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [logs, setLogs] = useState<AuthLog[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_USER_KEY);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as AuthUser);
      } catch {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    }

    const savedPreviewRole = localStorage.getItem(PREVIEW_ROLE_KEY);

    if (savedPreviewRole === "viewer" || savedPreviewRole === "superadmin") {
      setPreviewRoleState(savedPreviewRole);
    }

    const savedLogs = localStorage.getItem(AUTH_LOGS_KEY);

    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs) as AuthLog[]);
      } catch {
        localStorage.removeItem(AUTH_LOGS_KEY);
        setLogs([]);
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
    let visualRole: PreviewRole | "demo" = "viewer";

    if (user?.role === "demo") {
      visualRole = "demo";
    } else if (user?.role === "admin") {
      visualRole = previewRole;
    }

    document.body.dataset.role = visualRole;

    return () => {
      delete document.body.dataset.role;
    };
  }, [user, previewRole]);

  const addLog = (
    username: string,
    role: LoginRole | "unknown",
    action: AuthLog["action"],
    severityPoints: number,
    message?: string
  ) => {
    const newLog: AuthLog = {
      id: `${Date.now()}-${crypto.randomUUID()}`,
      username,
      role,
      action,
      timestamp: new Date().toISOString(),
      severityPoints,
      message,
    };

    setLogs((prevLogs) => {
      const updatedLogs = [...prevLogs, newLog];
      localStorage.setItem(AUTH_LOGS_KEY, JSON.stringify(updatedLogs, null, 2));
      return updatedLogs;
    });
  };

  const persistAuthenticatedUser = (authUser: AuthUser) => {
    setUser(authUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));

    setFailedAttempts(0);
    setLockedUntil(null);

    localStorage.setItem(FAILED_ATTEMPTS_KEY, "0");
    localStorage.removeItem(LOCKED_UNTIL_KEY);
  };

  const setPreviewRole = (role: PreviewRole) => {
    if (previewRole === role) return;

    setPreviewRoleState(role);
    localStorage.setItem(PREVIEW_ROLE_KEY, role);

    addLog(
      user?.username ?? "preview-admin",
      user?.role ?? "unknown",
      "login",
      0,
      `Mode preview ${
        role === "superadmin" ? "superadmin activé" : "user activé"
      }`
    );
  };

  const switchAccountRole = (role: PreviewRole) => {
    setPreviewRole(role);
  };

  const blockAccess = () => {
    if (previewRole !== "superadmin") return;

    setIsBlocked(true);
    localStorage.setItem(IS_BLOCKED_KEY, "true");

    addLog(
      user?.username ?? "admin-action",
      user?.role ?? "unknown",
      "blocked",
      failedAttempts,
      "Accès bloqué manuellement"
    );
  };

  const unblockAccess = () => {
    if (previewRole !== "superadmin") return;

    setIsBlocked(false);
    setFailedAttempts(0);
    setLockedUntil(null);

    localStorage.setItem(IS_BLOCKED_KEY, "false");
    localStorage.setItem(FAILED_ATTEMPTS_KEY, "0");
    localStorage.removeItem(LOCKED_UNTIL_KEY);

    addLog(
      user?.username ?? "admin-action",
      user?.role ?? "unknown",
      "unblocked",
      0,
      "Accès débloqué manuellement"
    );
  };

  const login = (username: string, password: string): LoginResult => {
    const now = Date.now();

    if (isBlocked) {
      addLog(
        username || "unknown",
        "unknown",
        "error",
        failedAttempts,
        "DDOS accès restricted"
      );

      return { success: false, message: "DDOS accès restricted" };
    }

    if (lockedUntil && now < lockedUntil) {
      const remaining = Math.ceil((lockedUntil - now) / 1000);

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

        return {
          success: false,
          message: "Trop d'erreurs. Attente de 10 secondes.",
        };
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

        return {
          success: false,
          message: "Trop d'erreurs. Attente de 5 secondes.",
        };
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
    };

    persistAuthenticatedUser(authUser);
    addLog(foundUser.username, foundUser.role, "login", 0, "Connexion réussie");

    return { success: true };
  };

  const loginAsDemo = (): LoginResult => {
    if (isBlocked) {
      addLog("demo", "demo", "error", failedAttempts, "DDOS accès restricted");

      return { success: false, message: "DDOS accès restricted" };
    }

    const authUser: AuthUser = {
      username: "demo",
      role: "demo",
    };

    persistAuthenticatedUser(authUser);
    addLog("demo", "demo", "login", 0, "Connexion mode démo");

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
    return logs;
  };

  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem(AUTH_LOGS_KEY);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: user !== null,
      user,

      previewRole,
      isSuperAdmin: previewRole === "superadmin",
      setPreviewRole,
      switchAccountRole,

      login,
      loginAsDemo,
      logout,

      logs,
      getLogs,
      clearLogs,

      isBlocked,
      failedAttempts,
      lockedUntil,
      blockAccess,
      unblockAccess,
    }),
    [user, previewRole, isBlocked, failedAttempts, lockedUntil, logs]
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