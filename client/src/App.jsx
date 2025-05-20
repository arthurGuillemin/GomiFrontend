import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './pages/Authentication';
import TrashResultPage from './pages/TrashResultPage';
import Header from './components/Header';

const App = () => {
  const isAuthenticated = true;

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/trash" element={<TrashResultPage />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
