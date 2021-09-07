import { createContext, useContext } from "react";

const AuthContext = createContext("");

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={"token"}>{children}</AuthContext.Provider>
  );
}
