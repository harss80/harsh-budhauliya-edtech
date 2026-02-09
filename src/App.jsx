import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { API_BASE } from './utils/apiBase';
import Classes from './pages/Classes';
import ClassDetail from './pages/ClassDetail';

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
      const resolveLocation = async () => {
        try {
          const cachedCity = localStorage.getItem('digimentors_user_city') || 'Unknown';
          const cachedCountry = localStorage.getItem('digimentors_user_country') || 'Unknown';
          const ts = parseInt(localStorage.getItem('digimentors_user_location_ts') || '0', 10);
          const fresh = cachedCity !== 'Unknown' && (Date.now() - ts) < 21600000;
          if (fresh) {
            return { city: cachedCity, country: cachedCountry, lat: localStorage.getItem('digimentors_user_lat') || null, lon: localStorage.getItem('digimentors_user_lon') || null };
          }
          const setLoc = (c, co, la, lo) => {
            const cc = c || 'Unknown';
            const cn = co || 'Unknown';
            if (la != null && lo != null) {
              localStorage.setItem('digimentors_user_lat', String(la));
              localStorage.setItem('digimentors_user_lon', String(lo));
            }
            localStorage.setItem('digimentors_user_city', cc);
            localStorage.setItem('digimentors_user_country', cn);
            localStorage.setItem('digimentors_user_location_ts', Date.now().toString());
            return { city: cc, country: cn, lat: la || null, lon: lo || null };
          };
          const tryIp = async () => {
            try {
              const res = await fetch('https://ipapi.co/json/');
              const data = await res.json();
              return setLoc(data.city, data.country_name, data.latitude, data.longitude);
            } catch {
              return setLoc(cachedCity, cachedCountry, null, null);
            }
          };
          if (navigator.geolocation) {
            try {
              const pos = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }));
              const la = pos.coords.latitude;
              const lo = pos.coords.longitude;
              try {
                const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${la}&lon=${lo}&format=json&zoom=10&addressdetails=1`);
                const j = await resp.json();
                const a = j.address || {};
                const cityName = a.city || a.town || a.village || a.suburb || a.state_district || a.state || (j.display_name ? j.display_name.split(',')[0] : 'Unknown');
                const countryName = a.country || 'Unknown';
                return setLoc(cityName, countryName, la, lo);
              } catch {
                return await tryIp();
              }
            } catch {
              return await tryIp();
            }
          }
          return await tryIp();
        } catch {
          return { city: localStorage.getItem('digimentors_user_city') || 'Unknown', country: localStorage.getItem('digimentors_user_country') || 'Unknown', lat: localStorage.getItem('digimentors_user_lat') || null, lon: localStorage.getItem('digimentors_user_lon') || null };
        }
      };

      const loc = await resolveLocation();
      city = loc.city;
      country = loc.country;
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
        user,
        lat: loc.lat,
        lon: loc.lon
      };

      const activities = JSON.parse(localStorage.getItem('digimentors_recent_activities') || '[]');
      const updatedActivities = [newActivity, ...activities].slice(0, 500);
      localStorage.setItem('digimentors_recent_activities', JSON.stringify(updatedActivities));

      try {
        await fetch(`${API_BASE}/api/visit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newActivity)
        });
      } catch {
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
  }, [location.pathname]);

  // Close popup automatically when user logs in (from modal)
  useEffect(() => {
    const handleStorage = () => {
      const user = localStorage.getItem('digimentors_current_user');
      if (user) setShowPopup(false);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Never render popup on explicit login page or test attempt page
  if (location.pathname === '/login' || location.pathname.startsWith('/attempt-test')) return null;
  if (!showPopup) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <Login defaultIsLogin={false} />
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const SinglePageOnly = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');

  if (!user) return children;

  const path = location.pathname || '';
  const isAllowed =
    path === '/test' ||
    path === '/login' ||
    path.startsWith('/attempt-test') ||
    path.startsWith('/admin');

  if (!isAllowed) {
    return <Navigate to="/test" replace />;
  }

  return children;
};

// Admin Protected Route Component
const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');
  const config = JSON.parse(localStorage.getItem('digimentors_site_config') || '{}');
  const adminEmails = Array.isArray(config.adminEmails) ? config.adminEmails : ['harshbudhauliya882@gmail.com'];
  const isEmailAllowed = user && adminEmails.map(e => (e || '').toLowerCase()).includes((user.email || '').toLowerCase());

  const localToken = (() => {
    try { return String(localStorage.getItem('digimentors_admin_token') || '').trim(); } catch { return ''; }
  })();
  const urlToken = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return String(params.get('token') || '').trim();
    } catch { return ''; }
  })();

  const hasToken = !!(urlToken || localToken);
  if (!isEmailAllowed && !hasToken) {
    return <Navigate to="/login" replace />;
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

  const [bannerNtf, setBannerNtf] = React.useState(null);

  React.useEffect(() => {
    if (isAdmin || isTestPlayer) return;
    try {
      const list = JSON.parse(localStorage.getItem('digimentors_notifications') || '[]');
      const unread = list.find(n => !n.read);
      setBannerNtf(unread || null);
    } catch { setBannerNtf(null); }
  }, [location.pathname, isAdmin, isTestPlayer]);

  const dismissBanner = () => {
    try {
      const list = JSON.parse(localStorage.getItem('digimentors_notifications') || '[]');
      if (bannerNtf) {
        const updated = list.map(n => n.id === bannerNtf.id ? { ...n, read: true } : n);
        localStorage.setItem('digimentors_notifications', JSON.stringify(updated));
        // Best-effort backend sync to mark read
        const isMongo = bannerNtf.id && /^[a-f\d]{24}$/i.test(String(bannerNtf.id));
        const user = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');
        if (isMongo && user?.email) {
          fetch(`${API_BASE}/api/notifications/${bannerNtf.id}/read`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
          }).catch(() => null);
        }
      }
    } catch { /* ignore */ }
    setBannerNtf(null);
  };

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
      {bannerNtf && (
        <div style={{ background: 'linear-gradient(90deg, rgba(129,140,248,0.15), rgba(99,102,241,0.15))', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 700 }}>{bannerNtf.title || 'Notice'}</span>
              <span style={{ color: '#a1a1aa' }}>{bannerNtf.message}</span>
            </div>
            <button onClick={dismissBanner} className="btn-reset" style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '6px', fontWeight: 600 }}>Dismiss</button>
          </div>
        </div>
      )}
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
        <SinglePageOnly>
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
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
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
            <Route path="/classes" element={<Classes />} />
            <Route path="/class/:classNumber" element={<ClassDetail />} />
          </Routes>
        </SinglePageOnly>
      </Layout>
    </Router>
  );
}

export default App;
