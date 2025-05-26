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
import PrivateRoute from './components/PrivateRoute';
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Header/>
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<Home />} />
        <Route path="/trash" element={ <PrivateRoute> < TrashResultPage/> </PrivateRoute>} />
        <Route path="/recipe" element={ <PrivateRoute> <RecipePage/> </PrivateRoute>} />
        <Route path="/contact" element={ <PrivateRoute> <ContactPage/> </PrivateRoute>} />
        <Route path="/je-trie" element={ <PrivateRoute> < JeTrie/> </PrivateRoute>} />
        <Route path="/je-cuisine" element={ <PrivateRoute> < JeCuisine/> </PrivateRoute>} />
        <Route path="/profil" element={ <PrivateRoute> < ProfilePage/> </PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};
export default App;
