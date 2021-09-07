import React, { useEffect } from "react";
import AuthContext, { useAuth } from "../utils/authContext";

export function AuthProvider({ children }) {
  const auth = useAuth();
  useEffect(() => {
    if (typeof window !== undefined) {
      const userFromStorage = localStorage.getItem("authUser");
      if (userFromStorage) {
        const { token, user } = JSON.parse(userFromStorage);
      }
    }
  }, []);
  useEffect(() => {
    if (!auth.loading) {
      console.log(auth.data);
    }
  }, [auth.data]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
