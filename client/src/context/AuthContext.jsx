import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); 
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('user_id');
    const storedEmail = localStorage.getItem('email');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUserId) {
      setToken(storedToken); 
      setUser({ id: storedUserId, email: storedEmail, username: storedUsername });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const login = ({ token, user_id , email , username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('email' , email);
    localStorage.setItem('username', username)

    setToken(token);
    setUser({ id: user_id  , email: email , username: username});
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('username');

    setToken(null); 
    setUser(null);
    setIsAuthenticated(false);
  };

  const update = (data) => {
    if (data.email) {
      localStorage.setItem('email', data.email);
    }
    if (data.username) {
      localStorage.setItem('username', data.username);
    }

    setUser((prev) => ({
      ...prev,
      ...data,
    }));
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, update, isloading }}>
      {children}
    </AuthContext.Provider>
  );
};
