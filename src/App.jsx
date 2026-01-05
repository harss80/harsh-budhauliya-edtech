import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuestionBank from './pages/QuestionBank';
import Practice from './pages/Practice';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import LiveAnalysis from './pages/LiveAnalysis';
import StudentTestHistory from './pages/StudentTestHistory';
import StudyMaterial from './pages/StudyMaterial';
import TestPlayer from './pages/TestPlayer';
import Login from './pages/Login';
import Footer from './components/Footer';

// Component to handle global popup logic inside Router context
const GlobalPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Don't show popup on login page or inside test
    if (location.pathname === '/login' || location.pathname.startsWith('/attempt-test')) {
      return;
    }

    const checkLogin = () => {
      const user = localStorage.getItem('digimentors_current_user');
      if (!user) {
        setShowPopup(true);
      }
    };

    const timer = setTimeout(checkLogin, 30000); // 30 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
      <Login onClose={() => setShowPopup(false)} defaultIsLogin={false} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <GlobalPopup />
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<QuestionBank />} />
            <Route path="/practice/:exam/:subject" element={<Practice />} />
            <Route path="/test" element={<StudentDashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/analysis" element={<LiveAnalysis />} />
            <Route path="/test-history" element={<StudentTestHistory />} />
            <Route path="/study-material" element={<StudyMaterial />} />
            <Route path="/attempt-test/:testId" element={<TestPlayer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
