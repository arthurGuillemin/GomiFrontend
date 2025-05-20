import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext'
const App = () => {
  const isAuthenticated = true;

  return (
    <AuthProvider>
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
