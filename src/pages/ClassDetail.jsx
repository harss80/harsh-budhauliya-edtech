import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayCircle, FileText, Layers, Target, Wand2, Zap, Clock, Star,
  CheckCircle2, ArrowRight, BookOpen, Calculator, Beaker, Globe, ChevronRight, Lock
} from 'lucide-react';

const ClassDetail = () => {
  const { classNumber } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // --- Mock Data (In a real app, fetch based on classNumber) ---
  const subjects = [
    { name: 'Mathematics', icon: Calculator, color: '#3b82f6', topics: 12, videos: 45 },
    { name: 'Science', icon: Beaker, color: '#10b981', topics: 14, videos: 52 },
    { name: 'Social Studies', icon: Globe, color: '#f59e0b', topics: 10, videos: 38 },
    { name: 'English', icon: BookOpen, color: '#ec4899', topics: 8, videos: 30 }
  ];

  const popularSeries = [
    { title: "Olympiad Booster", type: "Test Series", tests: 10, students: "1.2k+", color: "#8b5cf6" },
    { title: "Foundation Builder", type: "Course", videos: 120, students: "3.5k+", color: "#f59e0b" },
    { title: "NCERT Master", type: "Practice", qs: "500+", students: "5k+", color: "#10b981" }
  ];

  const recentVideos = [
    { title: "Linear Equations in 1 Variable", subject: "Maths", duration: "45 min", views: "1.2k", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" },
    { title: "Force and Pressure", subject: "Science", duration: "38 min", views: "900", thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop" },
    { title: "Resources and Development", subject: "SST", duration: "50 min", views: "1.5k", thumbnail: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2050&auto=format&fit=crop" }
  ];

  const startCustomSeries = () => {
    try { localStorage.setItem('target_class', `Class ${classNumber}`); } catch (e) { }
    navigate('/test-generator');
  };

  // --- Components ---
  const TabButton = ({ id, label, icon: Icon, locked }) => (
    <button
      onClick={() => setActiveTab(id)}
      className="btn-reset"
      style={{
        padding: '12px 24px',
        borderRadius: '100px',
        background: activeTab === id ? 'white' : 'rgba(255,255,255,0.05)',
        color: activeTab === id ? 'black' : '#a1a1aa',
        fontWeight: '600',
        fontSize: '0.95rem',
        display: 'flex', alignItems: 'center', gap: '8px',
        transition: 'all 0.2s',
        border: '1px solid',
        borderColor: activeTab === id ? 'white' : 'transparent',
        opacity: locked ? 0.7 : 1
      }}
    >
      <Icon size={16} /> {label} {locked && <Lock size={12} style={{ marginLeft: 4 }} />}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '80px', paddingBottom: '60px', color: 'white', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(5,5,5,0) 100%)', padding: '60px 0 40px' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '100px', color: '#60a5fa', fontSize: '0.85rem', fontWeight: '700', marginBottom: '16px' }}>
                <Zap size={14} fill="#60a5fa" /> Foundation Program
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', lineHeight: 1.1, marginBottom: '16px' }}>
                Class {classNumber} <span style={{ color: '#71717a' }}>Hub</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: '#a1a1aa', maxWidth: '600px', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Comprehensive learning ecosystem for Class {classNumber}. Master concepts with animated videos, personalized tests, and detailed analytics.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', gap: '12px' }}>
              <button onClick={startCustomSeries} className="btn-reset" style={{ padding: '14px 28px', background: 'white', color: 'black', borderRadius: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Wand2 size={18} /> Generate Test
              </button>
              <button className="btn-reset" style={{ padding: '14px 28px', background: '#2563eb', color: 'white', borderRadius: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PlayCircle size={18} /> Start Learning
              </button>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'flex', gap: '40px', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
            {[
              { label: 'Video Lessons', value: '250+' },
              { label: 'Practice Questions', value: '5,000+' },
              { label: 'Mock Tests', value: '50+' },
              { label: 'Active Students', value: '2.5k+' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stat.value}</div>
                <div style={{ fontSize: '0.9rem', color: '#71717a' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginTop: '20px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '10px' }}>
          <TabButton id="overview" label="Overview" icon={Layers} />
          <TabButton id="videos" label="Video Library" icon={PlayCircle} locked={true} />
          <TabButton id="tests" label="Test Series" icon={Target} />
          <TabButton id="notes" label="Study Notes" icon={FileText} locked={true} />
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Subjects Grid */}
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px' }}>Your Subjects</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                {subjects.map((sub, i) => (
                  <div key={i} style={{ background: '#111114', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: sub.color, opacity: 0.1, borderRadius: '0 0 0 100%' }}></div>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: sub.color }}>
                      <sub.icon size={28} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>{sub.name}</h3>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: '#a1a1aa' }}>
                      <span>{sub.topics} Chapters</span>•<span>{sub.videos} Videos</span>
                    </div>
                    <div style={{ marginTop: '20px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{ width: '0%', height: '100%', background: sub.color }}></div>
                      {/* Logic for progress bar would go here */}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Videos & Popular Series */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }} className="content-grid">
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px' }}>Recommended Videos</h2>
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {recentVideos.map((vid, i) => (
                      <div key={i} style={{ display: 'flex', gap: '20px', background: '#111114', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ width: '160px', height: '100px', borderRadius: '12px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                          <img src={vid.thumbnail} alt={vid.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PlayCircle size={32} fill="white" stroke="none" />
                          </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>{vid.subject}</div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', lineHeight: 1.3 }}>{vid.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: '#71717a' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {vid.duration}</span>
                            <span>•</span>
                            <span>{vid.views} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: 'white', border: 'none', fontWeight: '600', marginTop: '20px', cursor: 'pointer' }}>View All Videos</button>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px' }}>Popular Now</h2>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {popularSeries.map((item, i) => (
                      <div key={i} style={{ background: '#18181b', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <div style={{ background: item.color, width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Target size={20} color="white" />
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>{item.students} taking</div>
                        </div>
                        <h4 style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px' }}>{item.title}</h4>
                        <div style={{ fontSize: '0.9rem', color: '#71717a' }}>{item.type}</div>
                        <button className="btn-reset" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontWeight: '600', fontSize: '0.9rem', marginTop: '16px' }}>Explore</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'overview' && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ textAlign: 'center', padding: '100px 0' }}
            >
              {(activeTab === 'videos' || activeTab === 'notes') ? (
                <>
                  <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Lock size={32} color="#f59e0b" />
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '16px' }}>Premium Content</h2>
                  <p style={{ color: '#a1a1aa', maxWidth: '500px', margin: '0 auto 32px' }}>
                    This {activeTab === 'videos' ? 'Video Library' : 'Study Material'} is locked. Upgrade to a premium plan to access high-quality lectures and notes for Class {classNumber}.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button className="btn-reset" style={{ padding: '12px 24px', background: '#f59e0b', color: 'black', borderRadius: '100px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Lock size={16} /> Unlock Now
                    </button>
                    <button onClick={() => setActiveTab('overview')} className="btn-reset" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '100px', fontWeight: '600' }}>
                      Go Back
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ padding: '0 0 60px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '12px' }}>Free Test Series</h2>
                    <p style={{ color: '#a1a1aa' }}>Premium quality practice materials, completely free.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', textAlign: 'left' }}>
                    {/* Chapter Wise */}
                    <div style={{ background: '#18181b', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#60a5fa' }}>
                        <Layers size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Chapter Warriors</h3>
                      <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '16px', lineHeight: 1.6 }}>
                        Master every single chapter with depth. Each test contains <strong>50 Questions</strong> to ensure you cover every concept.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '0.85rem', background: '#27272a', padding: '4px 10px', borderRadius: '6px', color: 'white' }}>Topic-wise</span>
                        <span style={{ fontSize: '0.85rem', background: '#27272a', padding: '4px 10px', borderRadius: '6px', color: 'white' }}>50 Qs/Test</span>
                      </div>
                      <button onClick={() => navigate('/attempt-test/foundation-chapter-practice')} className="btn-reset" style={{ width: '100%', padding: '12px', background: '#3b82f6', color: 'white', borderRadius: '12px', fontWeight: '600' }}>
                        Start Chapter Test
                      </button>
                    </div>

                    {/* Mid Term */}
                    <div style={{ background: '#18181b', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fbbf24' }}>
                        <Clock size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Mid-Term Chronicles</h3>
                      <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '16px', lineHeight: 1.6 }}>
                        Half-yearly syllabus simulation. Perfect for evaluating your progress mid-way through the academic year.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '0.85rem', background: '#27272a', padding: '4px 10px', borderRadius: '6px', color: 'white' }}>Half Syllabus</span>
                        <span style={{ fontSize: '0.85rem', background: '#27272a', padding: '4px 10px', borderRadius: '6px', color: 'white' }}>Mixed Qs</span>
                      </div>
                      <button onClick={() => navigate('/attempt-test/foundation-mid-term')} className="btn-reset" style={{ width: '100%', padding: '12px', background: 'white', color: 'black', borderRadius: '12px', fontWeight: '600' }}>
                        Attempt Mid-Term
                      </button>
                    </div>

                    {/* Final Board Cracker */}
                    <div style={{ background: '#18181b', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ width: '48px', height: '48px', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#f87171' }}>
                        <Target size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Board Cracker (Finals)</h3>
                      <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '16px', lineHeight: 1.6 }}>
                        Full syllabus Final Term simulation. The ultimate exam preparation to boost your confidence before the real deal.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '0.85rem', background: '#27272a', padding: '4px 10px', borderRadius: '6px', color: 'white' }}>Full Syllabus</span>
                        <span style={{ fontSize: '0.85rem', background: '#27272a', padding: '4px 10px', borderRadius: '6px', color: 'white' }}>Exam Pattern</span>
                      </div>
                      <button onClick={() => navigate('/attempt-test/foundation-final-term')} className="btn-reset" style={{ width: '100%', padding: '12px', background: 'white', color: 'black', borderRadius: '12px', fontWeight: '600' }}>
                        Attempt Final Series
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
                @media (max-width: 900px) {
                    .content-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
    </div>
  );
};

export default ClassDetail;
