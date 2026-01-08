
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Target, Clock, Trophy, PlayCircle, ChevronRight, Zap,
    Activity, BookOpen, BarChart2, Users, FileText, Layers,
    Layout, Settings, Shield, Bell, Search, Star, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const [user, setUser] = useState({ name: "Student", admissionId: "", goal: "Not Set" });
    const [stats, setStats] = useState({ testsCompleted: 0, avgAccuracy: 0, questionsSolved: 0 });
    const [testHistory, setTestHistory] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const [showGoalSelector, setShowGoalSelector] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('digimentors_current_user') || '{}');
        if (storedUser.name) {
            setUser({
                name: storedUser.name,
                admissionId: storedUser.admissionId || "N/A",
                goal: storedUser.educationDetails?.targetExam || "Not Set"
            });
            if (!storedUser.educationDetails?.targetExam) setShowGoalSelector(true);
        } else {
            setShowGoalSelector(true);
        }

        // Load Data
        setTestHistory(JSON.parse(localStorage.getItem('digimentors_test_history') || '[]'));
        setMyCourses(JSON.parse(localStorage.getItem('digimentors_user_courses') || '[]'));

        // Calc Stats
        const history = JSON.parse(localStorage.getItem('digimentors_test_history') || '[]');
        if (history.length) {
            setStats({
                testsCompleted: history.length,
                questionsSolved: history.reduce((acc, curr) => acc + (curr.attempted || 0), 0),
                avgAccuracy: Math.round(history.reduce((acc, curr) => acc + (curr.accuracy || 0), 0) / history.length)
            });
        }
    }, []);

    const quickActions = [
        { title: 'Practice', path: '/test-generator', icon: Target, color: '#8b5cf6', desc: 'Custom Tests' },
        { title: 'Full Mocks', path: '/test-series', icon: Star, color: '#ef4444', desc: 'Real Exam Pattern' },
        { title: 'Analysis', path: '/analysis', icon: BarChart2, color: '#10b981', desc: 'Deep Insights' },
        { title: 'Explore', path: '/courses', icon: Search, color: '#3b82f6', desc: 'Find Courses' },
    ];

    return (
        <div style={{ background: '#050505', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: 'white', paddingTop: '80px', paddingBottom: '40px' }}>
            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>

                {/* 1. Header & Greeting */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', lineHeight: '1.2' }}>Hello, {user.name} 👋</h1>
                                <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Let's crack {user.goal} today!</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn-reset" style={{ padding: '10px', background: '#18181b', borderRadius: '10px', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.1)' }}><Bell size={20} /></button>
                        <button className="btn-reset" style={{ padding: '10px 20px', background: '#3b82f6', borderRadius: '10px', color: 'white', fontWeight: '600', fontSize: '0.9rem' }}>Resume Learning</button>
                    </div>
                </div>

                {/* 2. Stats Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {[
                        { label: 'Tests Taken', value: stats.testsCompleted, icon: FileText, color: '#f59e0b' },
                        { label: 'Questions Solved', value: stats.questionsSolved, icon: Zap, color: '#10b981' },
                        { label: 'Avg. Accuracy', value: `${stats.avgAccuracy}%`, icon: Trophy, color: '#ec4899' },
                        { label: 'Study Hours', value: '12.5h', icon: Clock, color: '#3b82f6' }
                    ].map((s, i) => (
                        <motion.div key={i} whileHover={{ y: -5 }} style={{ background: '#121214', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: s.color, filter: 'blur(60px)', opacity: 0.1 }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ padding: '10px', background: `rgba(255,255,255,0.05)`, borderRadius: '10px' }}><s.icon size={20} color={s.color} /></div>
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '4px' }}>{s.value}</div>
                            <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '2rem' }}>

                    {/* LEFT COLUMN */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                        {/* 3. Quick Actions */}
                        <div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem' }}>Start Studying</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                                {quickActions.map((action, i) => (
                                    <Link key={i} to={action.path} style={{ textDecoration: 'none' }}>
                                        <motion.div whileHover={{ scale: 1.02 }} style={{ background: '#18181b', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                                            <div style={{ width: '40px', height: '40px', background: `${action.color}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: action.color }}>
                                                <action.icon size={20} />
                                            </div>
                                            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{action.title}</h3>
                                            <p style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>{action.desc}</p>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* 4. Active Mock Test Banner */}
                        <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', padding: '2rem', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <div style={{ background: '#f59e0b', color: 'black', fontWeight: '700', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '100px', display: 'inline-block', marginBottom: '1rem' }}>LIVE MOCK</div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>All India Mock Test 2026</h2>
                                <p style={{ color: '#c7d2fe', marginBottom: '1.5rem', maxWidth: '500px' }}>Join 15,000+ students appearing for the test right now. Real exam pattern.</p>
                                <button onClick={() => window.location.href = '/test-series'} className="btn-reset" style={{ padding: '12px 24px', background: 'white', color: '#1e1b4b', borderRadius: '12px', fontWeight: '700', fontSize: '0.95rem' }}>Attempt Now</button>
                            </div>
                            <div style={{ position: 'absolute', top: '0', right: '0', bottom: '0', width: '40%', background: 'url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop) center/cover', opacity: 0.2, maskImage: 'linear-gradient(to right, transparent, black)' }} />
                        </div>

                        {/* Recent History */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: '700' }}>Recent Activity</h2>
                                <Link to="/test-history" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>View All</Link>
                            </div>
                            <div style={{ background: '#121214', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                {testHistory.length > 0 ? testHistory.slice(0, 4).map((t, i) => (
                                    <div key={i} style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <FileText size={18} color="#a1a1aa" />
                                            </div>
                                            <div>
                                                <div style={{ color: 'white', fontWeight: '500', fontSize: '0.95rem' }}>{t.name || "Test Attempt"}</div>
                                                <div style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>{t.date || "Just now"} • {t.attempted} Qs</div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ color: '#10b981', fontWeight: '600' }}>{t.score}/{t.maxScore}</div>
                                            <div style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>Score</div>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ padding: '30px', textAlign: 'center', color: '#a1a1aa' }}>No recent activity. Start learning!</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Profile Card */}
                        <div style={{ background: '#18181b', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', margin: '0 auto 1rem', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', padding: '3px' }}>
                                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    <span style={{ fontSize: '2rem' }}>👨‍🎓</span>
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px' }}>{user.name}</h3>
                            <div style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '1.5rem' }}>ID: {user.admissionId || "--------"}</div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Rank</div>
                                    <div style={{ fontSize: '1rem', fontWeight: '700' }}>{stats.avgAccuracy > 80 ? "Top 5%" : "Unranked"}</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '12px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Streak</div>
                                    <div style={{ fontSize: '1rem', fontWeight: '700' }}>🔥 3 Days</div>
                                </div>
                            </div>
                            <button className="btn-reset" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', fontWeight: '600', fontSize: '0.9rem' }}>Edit Profile</button>
                        </div>

                        {/* My Courses */}
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>My Courses</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {myCourses.length > 0 ? myCourses.slice(0, 2).map((c, i) => (
                                    <div key={i} style={{ background: '#121214', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '12px' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlayCircle color="#3b82f6" /></div>
                                        <div>
                                            <div style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>{c.title}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Progress: 45%</div>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ padding: '20px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center', color: '#a1a1aa', fontSize: '0.9rem' }}>No Active Courses</div>
                                )}
                            </div>
                        </div>

                        {/* Need Help */}
                        <div style={{ background: 'linear-gradient(135deg, #0e7490, #0891b2)', padding: '24px', borderRadius: '24px', color: 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                <MessageSquare size={24} />
                                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>SUPPORT</div>
                            </div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>Need Help?</h4>
                            <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: '1.5' }}>Stuck on a problem or tech issue? Our mentors are online.</p>
                            <button onClick={() => window.location.href = '/contact'} className="btn-reset" style={{ width: '100%', background: 'white', color: '#0891b2', padding: '12px', borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem' }}>Chat Support</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentDashboard;
