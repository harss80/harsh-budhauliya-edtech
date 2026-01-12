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
import TestGenerator from './pages/TestGenerator';
import About from './pages/About';
import Careers from './pages/Careers';
import TeacherRegistration from './pages/TeacherRegistration';
import TestSeries from './pages/TestSeries';
import Courses from './pages/Courses';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Footer from './components/Footer';

// --- Visit Tracker ---
const VisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Total Visits Counter (Local)
    const currentVisits = parseInt(localStorage.getItem('digimentors_total_visits') || '0');
    localStorage.setItem('digimentors_total_visits', (currentVisits + 1).toString());

    // 2. Track Unique Visitor
    let visitorId = localStorage.getItem('digimentors_visitor_id');
    if (!visitorId) {
      visitorId = 'VISIT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      localStorage.setItem('digimentors_visitor_id', visitorId);
    }

    // Capture Device Info
    const ua = navigator.userAgent;
    let device = 'Desktop';
    if (/Mobi|Android/i.test(ua)) device = 'Mobile';
    else if (/iPad|Tablet/i.test(ua)) device = 'Tablet';

    // Capture location asynchronously
    let city = localStorage.getItem('digimentors_user_city') || 'Unknown';
    let country = localStorage.getItem('digimentors_user_country') || 'Unknown';

    const logVisit = async () => {
      // Try getting location if unknown
      if (city === 'Unknown') {
        try {
          const res = await fetch('https://ipapi.co/json/');
          const data = await res.json();
          if (data.city) {
            city = data.city;
            country = data.country_name;
            localStorage.setItem('digimentors_user_city', city);
            localStorage.setItem('digimentors_user_country', country);
          }
        } catch (e) { }
      }

      const referrer = document.referrer || 'Direct';
      const user = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');

      const newActivity = {
        visitorId,
        page: location.pathname,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now(),
        isoDate: new Date().toISOString(),
        city,
        country,
        device,
        referrer,
        user
      };

      // Save Local (Legacy Support)
      const activities = JSON.parse(localStorage.getItem('digimentors_recent_activities') || '[]');
      const updatedActivities = [newActivity, ...activities].slice(0, 500);
      localStorage.setItem('digimentors_recent_activities', JSON.stringify(updatedActivities));

      // SYNC TO BACKEND (Cross-Device Support)
      try {
        await fetch(`http://${window.location.hostname}:3000/api/visit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newActivity)
        });
      } catch (e) {
        console.error("Backend Sync Failed - ensure server.js is running");
      }
    };

    logVisit();

  }, [location]);

  return null;
};

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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');
  if (!user) {
    return <React.Fragment><Login onClose={() => window.location.href = '/'} /></React.Fragment>;
  }
  return children;
};

// Layout component to handle conditional rendering of Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  // Check if current path is admin panel
  const isAdmin = location.pathname.startsWith('/admin');
  const isTestPlayer = location.pathname.startsWith('/attempt-test');

  const siteConfig = JSON.parse(localStorage.getItem('digimentors_site_config') || '{}');

  if (siteConfig.maintenanceMode && !isAdmin) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: 'white', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</h1>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Under Maintenance</h2>
        <p style={{ color: '#a1a1aa', maxWidth: '400px' }}>We are currently updating our systems to serve you better. Please check back shortly.</p>
        <button onClick={() => window.location.reload()} className="btn-reset" style={{ marginTop: '2rem', padding: '12px 24px', background: 'white', color: 'black', borderRadius: '8px', fontWeight: '600' }}>Refresh</button>
      </div>
    );
  }

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

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <VisitTracker />
      <GlobalPopup />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<ExamCategory />} />
          <Route path="/questions" element={<ProtectedRoute><QuestionBank /></ProtectedRoute>} />
          <Route path="/practice/:exam/:subject" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
          <Route path="/test" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route path="/test-generator" element={<ProtectedRoute><TestGenerator /></ProtectedRoute>} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/analysis" element={<ProtectedRoute><LiveAnalysis /></ProtectedRoute>} />
          <Route path="/test-history" element={<ProtectedRoute><StudentTestHistory /></ProtectedRoute>} />
          <Route path="/study-material" element={<StudyMaterial />} />
          <Route path="/attempt-test/:testId" element={<ProtectedRoute><TestPlayer /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/teacher-registration" element={<TeacherRegistration />} />
          <Route path="/test-series" element={<ProtectedRoute><TestSeries /></ProtectedRoute>} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
