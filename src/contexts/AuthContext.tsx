import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "individual" | "firm" | "corporate" | null;

interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  role: UserRole;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name, role: foundUser.role };
      setUser(userData);
      setRole(foundUser.role);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (email: string, password: string, name: string, selectedRole: UserRole): boolean => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = { email, password, name, role: selectedRole };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const userData = { email, name, role: selectedRole };
    setUser(userData);
    setRole(selectedRole);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ role, user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
