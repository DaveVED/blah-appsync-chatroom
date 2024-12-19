import * as React from "react";

export interface AuthUser {
  username: string;
}

export interface SignupInput {
  username: string;
  email: string;
  password: string;
  termsAccepted: boolean;
};

export interface LoginInput {
  usernameOrEmail: string;
  password: string;
}

export type AuthProviderContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | undefined;
  signup: (user: SignupInput) => Promise<void>;
  login: (user: LoginInput) => Promise<void>;
  signout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthProviderContext | undefined>(
  undefined,
);

export const AuthProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, style, children, ...props }, ref) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<AuthUser | undefined>(undefined);

  const signup = async (userData: SignupInput) => {
    try {
      setIsLoading(true);
      console.log("Signing up user:", userData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: LoginInput) => {
    try {
      setIsLoading(true);
      console.log("Logging in user:", userData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Signup successful");
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signout = async () => {
    setIsAuthenticated(false);
  };

  const contextValue = React.useMemo<AuthProviderContext>(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      signup,
      login,
      signout
    }),
    [isAuthenticated, isLoading, user]
  );
  

  return (
    <AuthContext.Provider value={contextValue}>
      <div className={className} style={style} ref={ref} {...props}>
        {children}
      </div>
    </AuthContext.Provider>
  );
});

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }

  return context;
};
