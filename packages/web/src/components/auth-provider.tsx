import * as React from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    termsAccepted: boolean,
  ) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const login = async (
    emailOrUsername: string,
    password: string,
  ): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5001/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Login failed with status: ${response.status}`,
        );
      }

      setIsLoggedIn(true);
      console.log("Login successful:", data.message);

      // If using JWT stored in cookies, no need to manually save it on the client
      // If using localStorage, save the token here
      // localStorage.setItem("token", data.data.token);
    } catch (error) {
      console.error(
        "Login error:",
        error instanceof Error ? error.message : String(error),
      );
      throw error;
    }
  };

  const logout = (): void => {
    console.log("User logged out successfully");
  };

  const signup = async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    termsAccepted: boolean,
  ): Promise<void> => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      if (!termsAccepted) {
        throw new Error(
          "Uanble to signup without accepting terms and conditions",
        );
      }
      const response = await fetch("http://localhost:5001/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, termsAccepted }),
      });

      if (!response.ok) {
        throw new Error(`Login failed with status: ${response.status}`);
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.error(
        "Login error:",
        error instanceof Error ? error.message : String(error),
      );
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
