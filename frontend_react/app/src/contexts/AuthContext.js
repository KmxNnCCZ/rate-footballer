import React, { useState, useEffect, createContext, useContext } from 'react';
import Cookies from 'js-cookie';

// Contextを作成
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 初期状態のチェック
    const accessToken = Cookies.get("_access_token");
    const clientToken = Cookies.get("_client");
    const uid = Cookies.get("_uid");
    if (accessToken && clientToken && uid) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};