import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [isloading, setIsLoading] = useState(true); // 👈

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    if (token && userId) {
      setIsAuthenticated(true);
      setUser({ id: userId });
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false); // 👈 Important
  }, []);

  const login = ({ token, user_id }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id);
    setIsAuthenticated(true);
    setUser({ id: user_id });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isloading }}>
      {children}
    </AuthContext.Provider>
  );
};
