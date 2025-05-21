import Home from './pages/Home';
import JeTrie from './pages/JeTrie';
import JeCuisine from './pages/JeCuisine';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/je-trie" element={<JeTrie />} /> 
        <Route path="/je-cuisine" element={<JeCuisine />} /> 
      </Routes>
    </Router>
  )
}

export default App
