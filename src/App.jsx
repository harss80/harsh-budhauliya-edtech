import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuestionBank from './pages/QuestionBank';
import Practice from './pages/Practice';
import DiagnosticTest from './pages/DiagnosticTest';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<QuestionBank />} />
            <Route path="/practice/:exam/:subject" element={<Practice />} />
            <Route path="/test" element={<DiagnosticTest />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
