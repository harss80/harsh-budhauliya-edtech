import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Route path="/test" element={<StudentDashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/analysis" element={<LiveAnalysis />} />
            <Route path="/test-history" element={<StudentTestHistory />} />
            <Route path="/study-material" element={<StudyMaterial />} />
            <Route path="/attempt-test/:testId" element={<TestPlayer />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
