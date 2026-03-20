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

type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FAKE_USERS: FakeUser[] = [
  { username: "alan", password: "admin_privilege", role: "admin" },
  { username: "test", password: "test", role: "user" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser) as AuthUser;
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    const foundUser = FAKE_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      return false;
    }

    const authUser: AuthUser = {
      username: foundUser.username,
      role: foundUser.role,
    };

    setUser(authUser);
    localStorage.setItem("authUser", JSON.stringify(authUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const value = useMemo(
    () => ({
      isAuthenticated: user !== null,
      user,
      login,
      logout,
    }),
    [user]
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