import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // 👈 AJOUT
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('user_id');
    if (storedToken && storedUserId) {
      setToken(storedToken); 
      setUser({ id: storedUserId });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const login = ({ token, user_id }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id);
    setToken(token);
    setUser({ id: user_id });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setToken(null); 
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, isloading }}>
      {children}
    </AuthContext.Provider>
  );
};
