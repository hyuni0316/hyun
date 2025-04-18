import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/index.jsx';
import About from './components/About/index.jsx';
import Publications from './components/Publications/index.jsx';
import Projects from './components/Projects/index.jsx';
import Contact from './components/Contact/index.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
