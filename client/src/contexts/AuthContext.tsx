import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarStyle?: string;
  avatarOptions?: string;
};

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode | ((auth: AuthContextType) => ReactNode);
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check localStorage for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("FlowEase_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Failed to parse stored user", err);
        localStorage.removeItem("FlowEase_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call
    // For now, we'll check against localStorage
    try {
      const storedUsers = localStorage.getItem("FlowEase_users");
      if (!storedUsers) {
        return false;
      }

      const users = JSON.parse(storedUsers);
      const matchedUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!matchedUser) {
        return false;
      }

      // Don't store password in the session
      const { password: _, ...userWithoutPassword } = matchedUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem("FlowEase_user", JSON.stringify(userWithoutPassword));
      return true;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Check if user already exists
      const storedUsers = localStorage.getItem("FlowEase_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const existingUser = users.find((u: any) => u.email === email);
      if (existingUser) {
        return false;
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        firstName,
        lastName,
        email,
        password,
      };

      users.push(newUser);
      localStorage.setItem("FlowEase_users", JSON.stringify(users));

      // Login the user (without password in session)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem("FlowEase_user", JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (err) {
      console.error("Registration failed", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("FlowEase_user");
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;

      const storedUsers = localStorage.getItem("FlowEase_users");
      if (!storedUsers) return false;

      const users = JSON.parse(storedUsers);
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      
      if (userIndex === -1) return false;

      // Update user data
      const updatedUser = { ...users[userIndex], ...userData };
      users[userIndex] = updatedUser;

      // Save to localStorage
      localStorage.setItem("FlowEase_users", JSON.stringify(users));

      // Update current session
      const { password: _, ...userWithoutPassword } = updatedUser;
      setUser(userWithoutPassword);
      localStorage.setItem("FlowEase_user", JSON.stringify(userWithoutPassword));

      return true;
    } catch (err) {
      console.error("Update failed", err);
      return false;
    }
  };

  const value = { isAuthenticated, user, login, register, logout, updateUser };
  
  return (
    <AuthContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
