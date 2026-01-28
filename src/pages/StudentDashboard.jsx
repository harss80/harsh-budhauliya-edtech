import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Target, Clock, Trophy, PlayCircle, ChevronRight, Zap,
    Activity, BookOpen, BarChart2, Users, FileText, Layers,
    Layout, Settings, Shield, Bell, Search, Star, MessageSquare,
    User, Phone, MapPin, GraduationCap, Building, Camera, Save, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
    const [isMobile, setIsMobile] = useState(() => {
        try { return typeof window !== 'undefined' ? window.innerWidth <= 1024 : false; } catch { return false; }
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
            pub.sort((a, b) => new Date(b.scheduledAt || 0) - new Date(a.scheduledAt || 0));
            return pub;
        } catch { return []; }
    });
    const [loadingTests, setLoadingTests] = useState(true);

    // Notifications state and actions
    const [notificationsList, setNotificationsList] = useState(() => {
        try { return JSON.parse(localStorage.getItem('digimentors_notifications') || '[]'); } catch { return []; }
    });
    const [loadingNotifs, setLoadingNotifs] = useState(true);
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

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 1024);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

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
        // Fetch only public (published + within visibility window) tests
        setLoadingTests(true);
        fetch(`${base}/api/tests/public`).then(r => r.ok ? r.json() : null).then(list => {
            if (Array.isArray(list)) {
                const mapped = list.map(t => ({ id: t._id || t.id, name: t.name, subject: t.subject, duration: t.duration, scheduledAt: t.scheduledAt, published: !!t.published }));
                const pub = mapped.sort((a, b) => new Date(b.scheduledAt || 0) - new Date(a.scheduledAt || 0));
                setPublishedTests(pub);
                localStorage.setItem('digimentors_tests', JSON.stringify(mapped));
            }
        }).catch(() => { }).finally(() => setLoadingTests(false));

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
            finally { setLoadingNotifs(false); }
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
        }).catch(() => { });
    }, [user.email]);

    const stats = computeStats(serverResults.length ? serverResults : testHistory);
    const unreadCount = notificationsList.filter(n => !n.read).length;

    const quickActions = [
        { title: 'Practice Tests', path: '/test-generator', icon: Target, color: '#8b5cf6', desc: 'Create Custom Tests' },
        { title: 'Full Mocks', path: '/test-series', icon: Star, color: '#ef4444', desc: 'Real Exam Pattern' },
        { title: 'Deep Analysis', path: '/analysis', icon: BarChart2, color: '#10b981', desc: 'Check Your Performance' },
        { title: 'Course Library', path: '/courses', icon: Search, color: '#3b82f6', desc: 'Browse Study Material' },
    ];

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', paddingBottom: '40px' }}>
            <div className="container" style={{ padding: isMobile ? '0 16px' : '0 24px', paddingTop: '100px' }}>

                {/* 1. Header & Greeting */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                            <div style={{ width: '56px', height: '56px', background: 'var(--surface-highlight)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', border: '1px solid var(--border)' }}>
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h1 style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: '800', lineHeight: '1.2', color: 'var(--text-main)' }}>Hello, {user.name}</h1>
                                <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.9rem' : '1rem' }}>Ready to conquer {user.goal !== 'Not Set' ? user.goal : 'your exams'}?</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => navigate('/')} className="btn-secondary" style={{ padding: '10px', borderRadius: '12px' }}>
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }} />
                            )}
                        </button>
                        <button onClick={() => navigate('/test-generator')} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.95rem' }}>
                            Resume Learning
                        </button>
                    </div>
                </div>

                {/* 2. Stats Overview - Minimal Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '2.5rem' }}>
                    {[
                        { label: 'Tests Taken', value: stats.testsCompleted, icon: FileText, color: '#f59e0b' },
                        { label: 'Questions Solved', value: stats.questionsSolved, icon: Zap, color: '#10b981' },
                        { label: 'Avg. Accuracy', value: `${stats.avgAccuracy}%`, icon: Trophy, color: '#ec4899' },
                        { label: 'Study Hours', value: `${stats.studyHours || 0}h`, icon: Clock, color: '#3b82f6' }
                    ].map((s, i) => (
                        <div key={i} className="card-base" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ padding: '12px', background: 'var(--surface-highlight)', borderRadius: '12px', color: s.color, border: '1px solid var(--border)' }}>
                                <s.icon size={24} />
                            </div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>{s.value}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px', fontWeight: '500' }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? '24px' : '32px' }}>

                    {/* LEFT COLUMN - Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                        {/* Recent Test Resume */}
                        {lastTest && (
                            <div className="card-base" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'var(--surface-highlight)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ padding: '10px', background: 'var(--primary)', borderRadius: '10px', color: 'white' }}><PlayCircle size={20} /></div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>Continue: {lastTest.name || 'Last Test'}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Paused on {lastTest.at ? new Date(lastTest.at).toLocaleString() : ''}</div>
                                    </div>
                                </div>
                                <button onClick={() => navigate(lastTest.link)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Resume</button>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>Quick Access</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                {quickActions.map((action, i) => (
                                    <Link key={i} to={action.path} style={{ textDecoration: 'none' }}>
                                        <motion.div whileHover={{ y: -4 }} className="card-base" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'var(--surface-highlight)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: action.color, border: '1px solid var(--border)' }}>
                                                <action.icon size={20} />
                                            </div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>{action.title}</h3>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{action.desc}</p>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Tests */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>Scheduled Tests</h2>
                                <Link to="/test-series" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>View All</Link>
                            </div>

                            {loadingTests ? (
                                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading schedule...</div>
                            ) : publishedTests.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {publishedTests.slice(0, 4).map((t) => (
                                        <div key={t.id} className="card-base" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{ width: '48px', height: '48px', background: 'var(--surface-highlight)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: '700', border: '1px solid var(--border)' }}>
                                                    {String(t.subject || 'T').charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '1rem' }}>{t.name}</div>
                                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                                        <span>{t.subject || 'General'}</span>
                                                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)' }}></span>
                                                        <span>{t.scheduledAt ? new Date(t.scheduledAt).toLocaleDateString() : 'Flexible'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to={`/attempt-test/${t.id}`} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Attempt Now</Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="card-base" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No upcoming scheduled tests. <Link to="/test-series" style={{ color: 'var(--primary)' }}>Explore Mock Tests</Link>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* RIGHT COLUMN - Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Recent Notifications */}
                        <div className="card-base" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>Notifications</h3>
                                {unreadCount > 0 && <button onClick={markAllRead} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}>Mark all read</button>}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                                {notificationsList.length > 0 ? notificationsList.slice(0, 5).map((n) => (
                                    <div key={n.id} style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                                        <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{n.title}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0' }}>{n.message}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ''}</div>
                                    </div>
                                )) : (
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '10px' }}>No new notifications</div>
                                )}
                            </div>
                        </div>

                        {/* Profile Summary */}
                        <div className="card-base" style={{ padding: '24px', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', margin: '0 auto 16px', borderRadius: '50%', background: 'var(--surface-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                                <span style={{ fontSize: '2rem' }}>👨‍🎓</span>
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)' }}>{user.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>{user.email}</p>

                            <button onClick={() => setShowProfileModal(true)} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Edit Profile</button>
                        </div>

                        {/* Help Box */}
                        <div style={{ background: 'var(--primary)', padding: '24px', borderRadius: '16px', color: 'white' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', opacity: 0.9 }}>
                                <MessageSquare size={18} /> <span style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase' }}>Support</span>
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>Need Assistance?</h4>
                            <p style={{ fontSize: '0.9rem', marginBottom: '16px', opacity: 0.9 }}>Our academic counselors are here to help you.</p>
                            <Link to="/contact" style={{ display: 'inline-block', background: 'white', color: 'var(--primary)', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}>Contact Us</Link>
                        </div>

                    </div>
                </div>

                {/* Profile Edit Modal */}
                {showProfileModal && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="card-base"
                            onClick={e => e.stopPropagation()}
                            style={{ width: '100%', maxWidth: '600px', background: 'var(--surface)', maxHeight: '90vh', overflowY: 'auto', padding: 0, border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-lg)' }}
                        >
                            {/* Header */}
                            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-highlight)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Settings size={20} /> Edit Profile
                                </h3>
                                <button onClick={() => setShowProfileModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ padding: '32px' }}>
                                {/* Avatar Placeholder */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
                                    <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '16px' }}>
                                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', color: 'white', border: '4px solid var(--surface)' }}>
                                            {profileForm.name.charAt(0)}
                                        </div>
                                        <button style={{ position: 'absolute', bottom: '0', right: '0', background: 'var(--text-main)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                            <Camera size={16} color="var(--background)" />
                                        </button>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Update your personal details</p>
                                </div>

                                <div style={{ display: 'grid', gap: '24px' }}>
                                    {/* Personal Section */}
                                    <div>
                                        <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Personal Information</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                            <div style={{ gridColumn: 'span 2' }}>
                                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Full Name</label>
                                                <div style={{ position: 'relative' }}>
                                                    <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                                                    <input
                                                        value={profileForm.name}
                                                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                                        style={{ width: '100%', padding: '10px 10px 10px 40px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                                                        placeholder="Enter your name"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Phone Number</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Phone size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                                                    <input
                                                        value={profileForm.phone}
                                                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                                                        style={{ width: '100%', padding: '10px 10px 10px 40px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                                                        placeholder="+91 98765..."
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>City</label>
                                                <div style={{ position: 'relative' }}>
                                                    <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                                                    <input
                                                        value={profileForm.city}
                                                        onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                                                        style={{ width: '100%', padding: '10px 10px 10px 40px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                                                        placeholder="Your City"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Academic Section */}
                                    <div>
                                        <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Academic Details</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Target Exam</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Target size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                                                    <select
                                                        value={profileForm.targetExam}
                                                        onChange={e => setProfileForm({ ...profileForm, targetExam: e.target.value })}
                                                        style={{ width: '100%', padding: '10px 10px 10px 40px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none', appearance: 'none' }}
                                                    >
                                                        <option value="">Select Target</option>
                                                        <option value="NEET">NEET</option>
                                                        <option value="JEE">JEE</option>
                                                        <option value="Boards">Boards</option>
                                                        <option value="Foundation">Foundation</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Grade / Class</label>
                                                <div style={{ position: 'relative' }}>
                                                    <GraduationCap size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                                                    <input
                                                        value={profileForm.grade}
                                                        onChange={e => setProfileForm({ ...profileForm, grade: e.target.value })}
                                                        style={{ width: '100%', padding: '10px 10px 10px 40px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                                                        placeholder="e.g. 11th"
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ gridColumn: 'span 2' }}>
                                                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>School / College</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Building size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                                                    <input
                                                        value={profileForm.schoolName}
                                                        onChange={e => setProfileForm({ ...profileForm, schoolName: e.target.value })}
                                                        style={{ width: '100%', padding: '10px 10px 10px 40px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                                                        placeholder="Enter institution name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: 'var(--surface)' }}>
                                <button onClick={() => setShowProfileModal(false)} className="btn-secondary">Cancel</button>
                                <button onClick={saveProfile} className="btn-primary" style={{ padding: '10px 24px' }}>
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
