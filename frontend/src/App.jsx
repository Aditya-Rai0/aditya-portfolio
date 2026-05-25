import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[Inter]">
        <Preloader />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <ChatBot />
        <WhatsAppButton />
        <ScrollToTop />
      </div>
    </AuthProvider>
  );
}
