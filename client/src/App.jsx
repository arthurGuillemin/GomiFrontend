import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './pages/Authentication';
import TrashResultPage from './pages/TrashResultPage';
import RecipePage from './pages/RecipePage';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext'
import ContactPage from './pages/ContactPage';
const App = () => {
  const isAuthenticated = true;

  return (
    <AuthProvider>
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/trash" element={<TrashResultPage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
