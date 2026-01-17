
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Target, Clock, Trophy, PlayCircle, ChevronRight, Zap,
    Activity, BookOpen, BarChart2, Users, FileText, Layers,
    Layout, Settings, Shield, Bell, Search, Star, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/apiBase';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('digimentors_current_user') || '{}');
        if (storedUser && storedUser.name) {
            return {
                name: storedUser.name,
                admissionId: storedUser.admissionId || 'N/A',
                goal: storedUser.educationDetails?.targetExam || 'Not Set',
                email: storedUser.email || ''
            };
        }
        return { name: 'Student', admissionId: '', goal: 'Not Set', email: '' };
    });
    const computeStats = (history) => {
        if (!Array.isArray(history) || history.length === 0) return { testsCompleted: 0, avgAccuracy: 0, questionsSolved: 0, studyHours: 0 };
        const totalSeconds = history.reduce((acc, curr) => {
            const hms = curr.timeSpent;
            const parts = typeof hms === 'string' ? hms.split(':') : [];
            const h = parseInt(parts[0] || '0', 10) || 0;
            const m = parseInt(parts[1] || '0', 10) || 0;
            const s = parseInt(parts[2] || '0', 10) || 0;
            return acc + (h * 3600) + (m * 60) + s;
        }, 0);
        const hours = Math.round((totalSeconds / 3600) * 10) / 10;
        return {
            testsCompleted: history.length,
            questionsSolved: history.reduce((acc, curr) => acc + (curr.attempted || 0), 0),
            avgAccuracy: Math.round(history.reduce((acc, curr) => acc + (curr.accuracy || 0), 0) / history.length),
            studyHours: hours
        };
    };
    const [testHistory] = useState(() => JSON.parse(localStorage.getItem('digimentors_test_history') || '[]'));
    const [myCourses] = useState(() => JSON.parse(localStorage.getItem('digimentors_user_courses') || '[]'));
    const [publishedTests, setPublishedTests] = useState(() => {
        try {
            const allTests = JSON.parse(localStorage.getItem('digimentors_tests') || '[]');
            const pub = allTests.filter(t => t.published);
            pub.sort((a,b) => new Date(b.scheduledAt || 0) - new Date(a.scheduledAt || 0));
            return pub;
        } catch { return []; }
    });

    // Notifications state and actions
    const [notificationsList, setNotificationsList] = useState(() => {
        try { return JSON.parse(localStorage.getItem('digimentors_notifications') || '[]'); } catch { return []; }
    });
    const markRead = (id) => {
        const list = notificationsList.map(n => n.id === id ? { ...n, read: true } : n);
        setNotificationsList(list);
        localStorage.setItem('digimentors_notifications', JSON.stringify(list));
        // Backend sync if id looks like Mongo ObjectId
        const isMongo = id && /^[a-f\d]{24}$/i.test(String(id));
        if (isMongo && user.email) {
            fetch(`${API_BASE}/api/notifications/${id}/read`, {
                method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email })
            }).catch(() => null);
        }
    };
    const markAllRead = () => {
        const list = notificationsList.map(n => ({ ...n, read: true }));
        setNotificationsList(list);
        localStorage.setItem('digimentors_notifications', JSON.stringify(list));
        // Best-effort backend sync
        notificationsList.forEach(n => {
            const isMongo = n.id && /^[a-f\d]{24}$/i.test(String(n.id));
            if (!n.read && isMongo && user.email) {
                fetch(`${API_BASE}/api/notifications/${n.id}/read`, {
                    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email })
                }).catch(() => null);
            }
        });
    };

    // Last Test Resume
    const lastTest = (() => { try { return JSON.parse(localStorage.getItem('digimentors_last_test') || 'null'); } catch { return null; } })();

    // Goal selector
    const needsGoal = !user.goal || user.goal === 'Not Set';
    const [goalTemp, setGoalTemp] = useState('NEET');
    const saveGoal = () => {
        try {
            const current = JSON.parse(localStorage.getItem('digimentors_current_user') || '{}');
            const updated = { ...current, educationDetails: { ...(current.educationDetails || {}), targetExam: goalTemp } };
            localStorage.setItem('digimentors_current_user', JSON.stringify(updated));
            const users = JSON.parse(localStorage.getItem('digimentors_users') || '[]');
            const idx = users.findIndex(u => u.email === updated.email);
            if (idx !== -1) {
                users[idx] = { ...users[idx], educationDetails: { ...(users[idx].educationDetails || {}), targetExam: goalTemp } };
                localStorage.setItem('digimentors_users', JSON.stringify(users));
            }
            setUser(prev => ({ ...prev, goal: goalTemp }));
        } catch { /* ignore */ }
    };

    // Profile modal state
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileForm, setProfileForm] = useState(() => {
        try {
            const u = JSON.parse(localStorage.getItem('digimentors_current_user') || '{}');
            return {
                name: u.name || '',
                phone: u.phone || '',
                targetExam: u.educationDetails?.targetExam || '',
                grade: u.educationDetails?.grade || '',
                schoolName: u.educationDetails?.schoolName || '',
                city: u.educationDetails?.city || ''
            };
        } catch { return { name: '', phone: '', targetExam: '', grade: '', schoolName: '', city: '' }; }
    });
    const saveProfile = () => {
        try {
            const current = JSON.parse(localStorage.getItem('digimentors_current_user') || '{}');
            const updated = {
                ...current,
                name: profileForm.name || current.name,
                phone: profileForm.phone || '',
                educationDetails: {
                    ...(current.educationDetails || {}),
                    targetExam: profileForm.targetExam || '',
                    grade: profileForm.grade || '',
                    schoolName: profileForm.schoolName || '',
                    city: profileForm.city || ''
                }
            };
            localStorage.setItem('digimentors_current_user', JSON.stringify(updated));
            const users = JSON.parse(localStorage.getItem('digimentors_users') || '[]');
            const idx = users.findIndex(u => u.email === updated.email);
            if (idx !== -1) {
                users[idx] = { ...users[idx], name: updated.name, phone: updated.phone, educationDetails: { ...(users[idx].educationDetails || {}), ...(updated.educationDetails || {}) } };
                localStorage.setItem('digimentors_users', JSON.stringify(users));
            }
            setUser(prev => ({ ...prev, name: updated.name, goal: updated.educationDetails?.targetExam || prev.goal }));
            setShowProfileModal(false);
        } catch { /* ignore */ }
    };

    useEffect(() => {
        const base = API_BASE || '';
        // Fetch tests
        fetch(`${base}/api/tests`).then(r => r.ok ? r.json() : null).then(list => {
            if (Array.isArray(list)) {
                const mapped = list.map(t => ({ id: t._id || t.id, name: t.name, subject: t.subject, duration: t.duration, scheduledAt: t.scheduledAt, published: !!t.published }));
                const pub = mapped.filter(t => t.published).sort((a,b) => new Date(b.scheduledAt || 0) - new Date(a.scheduledAt || 0));
                setPublishedTests(pub);
                localStorage.setItem('digimentors_tests', JSON.stringify(mapped));
            }
        }).catch(() => {});

        // Fetch current user's _id, then notifications
        const loadNotifs = async () => {
            try {
                const usersRes = await fetch(`${base}/api/users`);
                const users = usersRes.ok ? await usersRes.json() : [];
                const me = users.find(u => (u.email || '').toLowerCase() === (user.email || '').toLowerCase());
                const myId = me ? (me._id || null) : null;

                const notifsRes = await fetch(`${base}/api/notifications`);
                const list = notifsRes.ok ? await notifsRes.json() : null;
                if (Array.isArray(list)) {
                    const mapped = list.map(n => {
                        const id = n._id || n.id;
                        const readBy = Array.isArray(n.readBy) ? n.readBy.map(String) : [];
                        const read = myId ? readBy.includes(String(myId)) : false;
                        return { id, title: n.title, message: n.message, createdAt: n.createdAt, read };
                    });
                    setNotificationsList(mapped);
                    localStorage.setItem('digimentors_notifications', JSON.stringify(mapped));
                }
            } catch { /* ignore */ }
        };
        loadNotifs();
    }, []);

    // Fetch backend results for current user to compute stats
    const [serverResults, setServerResults] = useState([]);
    useEffect(() => {
        const base = API_BASE || '';
        if (!user.email) return;
        fetch(`${base}/api/results?email=${encodeURIComponent(user.email)}`).then(r => r.ok ? r.json() : null).then(list => {
            if (Array.isArray(list) && list.length) setServerResults(list);
        }).catch(() => {});
    }, [user.email]);

    const stats = computeStats(serverResults.length ? serverResults : testHistory);
    const unreadCount = notificationsList.filter(n => !n.read).length;

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

                        {/* Continue Where You Left Off */}
                        {lastTest && (
                            <div style={{ background: '#121214', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                                <div>
                                    <div style={{ fontWeight: 700 }}>Continue: {lastTest.name || 'Last Test'}</div>
                                    <div style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>{lastTest.at ? new Date(lastTest.at).toLocaleString() : ''}</div>
                                </div>
                                <button onClick={() => navigate(lastTest.link)} className="btn-reset" style={{ padding: '10px 16px', background: 'white', color: 'black', borderRadius: '10px', fontWeight: 700 }}>Resume</button>
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => navigate('/')} className="btn-reset" style={{ position: 'relative', padding: '10px', background: '#18181b', borderRadius: '10px', color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: 'white', borderRadius: '999px', fontSize: '10px', lineHeight: '1', padding: '4px 6px', fontWeight: 700 }}>{unreadCount}</span>
                            )}
                        </button>
                        <button onClick={() => navigate('/test-generator')} className="btn-reset" style={{ padding: '10px 20px', background: '#3b82f6', borderRadius: '10px', color: 'white', fontWeight: '600', fontSize: '0.9rem' }}>Resume Learning</button>
                    </div>
                </div>

                {/* 2. Stats Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {[
                        { label: 'Tests Taken', value: stats.testsCompleted, icon: FileText, color: '#f59e0b' },
                        { label: 'Questions Solved', value: stats.questionsSolved, icon: Zap, color: '#10b981' },
                        { label: 'Avg. Accuracy', value: `${stats.avgAccuracy}%`, icon: Trophy, color: '#ec4899' },
                        { label: 'Study Hours', value: `${stats.studyHours || 0}h`, icon: Clock, color: '#3b82f6' }
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

                        {/* Goal Selector */}
                        {needsGoal && (
                            <div style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(129,140,248,0.25)', padding: '16px', borderRadius: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, marginBottom: '6px' }}>Set your Goal</div>
                                        <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Choose your target exam to personalize your dashboard.</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <select value={goalTemp} onChange={(e) => setGoalTemp(e.target.value)} style={{ padding: '10px 12px', background: '#0a0a0a', border: '1px solid #333', color: 'white', borderRadius: '10px' }}>
                                            <option value="NEET">NEET</option>
                                            <option value="JEE">JEE</option>
                                            <option value="Boards">Boards</option>
                                            <option value="Foundation">Foundation (Class 8-10)</option>
                                        </select>
                                        <button onClick={saveGoal} className="btn-reset" style={{ padding: '10px 16px', background: 'white', color: 'black', borderRadius: '10px', fontWeight: 700 }}>Save</button>
                                    </div>
                                </div>
                            </div>
                        )}

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

                        {/* Published Tests */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1.8rem 0 1rem' }}>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: '700' }}>Published Tests</h2>
                                <Link to="/test-series" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>View All</Link>
                            </div>
                            <div style={{ background: '#121214', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                {publishedTests.length > 0 ? publishedTests.slice(0, 4).map((t) => (
                                    <div key={t.id} style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'rgba(59,130,246,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>T</div>
                                            <div>
                                                <div style={{ color: 'white', fontWeight: '600', fontSize: '0.95rem' }}>{t.name || 'Scheduled Test'}</div>
                                                <div style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>{t.subject || 'General'} • {t.scheduledAt ? new Date(t.scheduledAt).toLocaleString() : 'Anytime'}</div>
                                            </div>
                                        </div>
                                        <Link to={`/attempt-test/admin-${t.id}`} className="btn-reset" style={{ padding: '8px 14px', background: 'white', color: 'black', borderRadius: '10px', fontWeight: '700', textDecoration: 'none' }}>Attempt</Link>
                                    </div>
                                )) : (
                                    <div style={{ padding: '30px', textAlign: 'center', color: '#a1a1aa' }}>No published tests yet.</div>
                                )}
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

                        {/* Recent Notifications */}
                        <div style={{ background: '#121214', padding: '16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Notifications</h3>
                                {unreadCount > 0 && <button onClick={markAllRead} className="btn-reset" style={{ color: '#818cf8' }}>Mark all read</button>}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '260px', overflowY: 'auto' }}>
                                {notificationsList.length > 0 ? notificationsList.slice(0, 6).map((n) => (
                                    <div key={n.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '12px' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'white' }}>{n.title || 'Notice'}</div>
                                            <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{n.message}</div>
                                            <div style={{ color: '#71717a', fontSize: '0.75rem', marginTop: '6px' }}>{n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}</div>
                                        </div>
                                        {!n.read && <button onClick={() => markRead(n.id)} className="btn-reset" style={{ color: '#10b981', fontWeight: 700 }}>Mark read</button>}
                                    </div>
                                )) : (
                                    <div style={{ color: '#71717a', fontSize: '0.9rem' }}>No notifications</div>
                                )}
                            </div>
                        </div>

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
                            <button onClick={() => setShowProfileModal(true)} className="btn-reset" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', fontWeight: '600', fontSize: '0.9rem' }}>Edit Profile</button>
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

            {showProfileModal && (
                <div onClick={() => setShowProfileModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div onClick={e => e.stopPropagation()} style={{ width: '90%', maxWidth: '520px', background: '#18181b', border: '1px solid #333', borderRadius: '16px', padding: '20px' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>Edit Profile</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                            <input value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} placeholder="Full Name" style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: 'white' }} />
                            <input value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} placeholder="Phone" style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: 'white' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <select value={profileForm.targetExam} onChange={e => setProfileForm({ ...profileForm, targetExam: e.target.value })} style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: 'white' }}>
                                    <option value="">Select Target</option>
                                    <option value="NEET">NEET</option>
                                    <option value="JEE">JEE</option>
                                    <option value="Boards">Boards</option>
                                    <option value="Foundation">Foundation</option>
                                </select>
                                <input value={profileForm.grade} onChange={e => setProfileForm({ ...profileForm, grade: e.target.value })} placeholder="Class/Grade" style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: 'white' }} />
                            </div>
                            <input value={profileForm.schoolName} onChange={e => setProfileForm({ ...profileForm, schoolName: e.target.value })} placeholder="School/College" style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: 'white' }} />
                            <input value={profileForm.city} onChange={e => setProfileForm({ ...profileForm, city: e.target.value })} placeholder="City" style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '10px', color: 'white' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                            <button onClick={() => setShowProfileModal(false)} className="btn-reset" style={{ padding: '10px 14px', background: 'transparent', border: '1px solid #333', color: 'white', borderRadius: '10px' }}>Cancel</button>
                            <button onClick={saveProfile} className="btn-reset" style={{ padding: '10px 14px', background: 'white', color: 'black', borderRadius: '10px', fontWeight: 700 }}>Save</button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

// Profile Modal Root (rendered within the page for simplicity)

export default StudentDashboard;
