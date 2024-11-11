import React, { PropsWithChildren } from 'react';
import CachingService from "../cache/cachingService";
import { createContext, useState, useEffect, useContext, useCallback, useMemo } from "react";
import { AuthInfo } from "../types/types";

interface AuthContextValue {
  authInfo: AuthInfo;
  storeInfo: (authInfo: AuthInfo) => Promise<void>;
  removeInfo: () => void;
}

// Initial values for the context
const initialValue: AuthContextValue = {
  authInfo: {
    username: "",
    token: "",
  },
  storeInfo: async () => void 0,
  removeInfo: () => void 0,
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextValue>(initialValue);

// AuthProvider component
export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>(initialValue.authInfo);

  const storeInfo = useCallback(async (authInfo: AuthInfo) => {
    setAuthInfo(authInfo);
    try {
      await CachingService.storeAuthInfo(authInfo);
    } catch (error) {
      console.error("Error storing info:", error);
    }
  }, []);

  const removeInfo = useCallback(() => {
    try {
      CachingService.removeAuthInfo();
      setAuthInfo(initialValue.authInfo);
    } catch (error) {
      console.error("Error removing info:", error);
    }
  }, []);

  useEffect(() => {
    const fetchCachedAuthInfo = async () => {
      try {
        const cachedAuthInfo = await CachingService.loadAuthInfo();
        setAuthInfo(cachedAuthInfo || initialValue.authInfo);
      } catch (error) {
        console.error("Error loading cached info:", error);
      }
    };

    fetchCachedAuthInfo();
  }, []);

  const contextValue = useMemo(() => ({
    authInfo,
    storeInfo,
    removeInfo,
  }), [authInfo, storeInfo, removeInfo]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);