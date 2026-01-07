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
import Leaderboard from './pages/Leaderboard';
import Mentorship from './pages/Mentorship';
import ExamCategory from './pages/ExamCategory';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import TestGenerator from './pages/TestGenerator';

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

// Layout component to handle conditional rendering of Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  // Check if current path is admin panel
  const isAdmin = location.pathname.startsWith('/admin');
  const isTestPlayer = location.pathname.startsWith('/attempt-test');

  if (isAdmin || isTestPlayer) {
    return (
      <div className="app-container" style={{ minHeight: '100vh' }}>
        {children}
      </div>
    );
  }

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <GlobalPopup />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<ExamCategory />} />
          <Route path="/questions" element={<QuestionBank />} />
          <Route path="/practice/:exam/:subject" element={<Practice />} />
          <Route path="/test" element={<StudentDashboard />} />
          <Route path="/test-generator" element={<TestGenerator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/analysis" element={<LiveAnalysis />} />
          <Route path="/test-history" element={<StudentTestHistory />} />
          <Route path="/study-material" element={<StudyMaterial />} />
          <Route path="/attempt-test/:testId" element={<TestPlayer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
