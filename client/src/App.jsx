import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './pages/Authentication';
import TrashResultPage from './pages/TrashResultPage';
import RecipePage from './pages/RecipePage';
import Header from './components/Header';
import Home from './pages/Home';
import JeTrie from './pages/JeTrie';
import JeCuisine from './pages/JeCuisine';
import { AuthProvider } from './context/AuthContext'
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import WasteClassifier from './pages/test';
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Header isAuthenticated={AuthProvider} />
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<Home />} />
        <Route path="/trash" element={<TrashResultPage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/je-trie" element={<JeTrie />} /> 
        <Route path="/je-cuisine" element={<JeCuisine />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/test" element={<WasteClassifier/>} />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};
export default App;
