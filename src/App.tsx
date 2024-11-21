import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import UserApp from './pages/user/App';
function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/*" element={<UserApp />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;