import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import UserApp from './pages/user/App';
import MemberApp from "./pages/member/App"

const BASE_PATH = import.meta.env.VITE_PUBLIC_BASE_PATH;



function App() {
  return (
    <BrowserRouter basename={BASE_PATH}>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/user/*" element={<UserApp />} />
        <Route path="/member/*" element={<MemberApp />} /> {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;