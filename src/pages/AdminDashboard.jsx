
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, Activity, BookOpen, Settings,
    Search, Bell, ChevronDown, MapPin, Smartphone,
    Globe, Clock, TrendingUp, DollarSign, Shield, LogOut, Menu, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { realQuestions } from '../data/realQuestions';

// --- Data Aggregator ---
const getRealStats = () => {
    const history = JSON.parse(localStorage.getItem('digimentors_test_history') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');
    const customTests = JSON.parse(localStorage.getItem('custom_test_config') || '{}');

    // Calculate Stats
    const totalVisits = parseInt(localStorage.getItem('total_visits') || '8943');
    const testAttempts = history.length;

    // Revenue simulation based on "Premium" user flag or arbitrary logic for demo
    const isPremium = currentUser?.isPremium || false;
    const revenue = isPremium ? '₹14,25,000' : '₹0';

    // Calculate total questions available
    const totalQuestions = realQuestions.length;

    return { history, currentUser, totalVisits, testAttempts, revenue, totalQuestions };
};

// --- User Activity Aggregator ---
// --- User Activity Aggregator ---
const getTrackedUsers = () => {
    const history = JSON.parse(localStorage.getItem('digimentors_test_history') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');

    // Simulate a database of users based on local session + history
    // in a real app, this would fetch from a backend API
    const users = [];

    if (currentUser) {
        users.push({
            id: 'USR-REAL-01',
            name: currentUser.name || 'Admin User',
            email: currentUser.email || 'admin@digimentors.in',
            phone: currentUser.phone || '+91 98765 43210',
            location: 'Mumbai, Maharashtra, India',
            device: 'Windows PC (Chrome)',
            lastActive: 'Now',
            status: 'Online',
            clicks: [
                { page: '/admin', element: 'Dashboard Tab', time: 'Just now' },
                { page: '/dashboard', element: 'View Analysis', time: '5 mins ago' },
                { page: '/test-player', element: 'Submit Test', time: '1 hour ago' }
            ],
            tests: history.map(h => ({ name: h.name, score: h.score, date: h.date }))
        });
    }

    // Add some simulated "Other" visitors for demonstration
    // These represent other people "currently on the site"
    const demoLocations = [
        'Delhi, India', 'Bangalore, Karnataka', 'Pune, Maharashtra', 'Hyderabad, Telangana'
    ];

    for (let i = 0; i < 3; i++) {
        users.push({
            id: `USR-DEMO-${i}`,
            name: `Visitor ${i + 2}`,
            email: `visitor${i + 2}@gmail.com`,
            phone: `+91 91234 5678${i}`,
            location: demoLocations[i % demoLocations.length],
            device: i % 2 === 0 ? 'Android Mobile' : 'iPhone 14',
            lastActive: `${(i + 1) * 5} mins ago`,
            status: 'Active',
            clicks: [
                { page: '/courses', element: 'JEE Main Course', time: '2 mins ago' },
                { page: '/home', element: 'Hero Banner', time: '10 mins ago' }
            ],
            tests: []
        });
    }

    return users;
};


// Calculate Subject Distribution
const getSubjectStats = () => {
    const stats = {};
    realQuestions.forEach(q => {
        stats[q.subject] = (stats[q.subject] || 0) + 1;
    });
    return Object.keys(stats).map(subject => ({ subject, count: stats[subject] }));
};



const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [realData, setRealData] = useState(getRealStats());
    const [trackedUsers, setTrackedUsers] = useState(getTrackedUsers());
    const [selectedUser, setSelectedUser] = useState(null); // For Detail View
    const [subjectStats, setSubjectStats] = useState(getSubjectStats());
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);


    // Initial Data Load
    useEffect(() => {
        const data = getRealStats();
        setRealData(data);
        setRealData(data);
        setTrackedUsers(getTrackedUsers());
        setSubjectStats(getSubjectStats());
    }, []);


    // Responsive Handlers
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 1024;
            setIsMobile(mobile);
            if (mobile) setSidebarOpen(false);
            else setSidebarOpen(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Live Data Updates (Real only)
    useEffect(() => {
        const interval = setInterval(() => {
            // Only update counts based on local storage changes if needed
            // Currently just static refresher for "Time" or "Status" if we had real backend
            setTrackedUsers(getTrackedUsers());
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear all test history? This cannot be undone.')) {
            localStorage.removeItem('digimentors_test_history');
            localStorage.removeItem('total_visits');
            window.location.reload();
        }
    };

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(realData.history));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "digimentors_data.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const sidebarVariants = {
        open: { width: '280px', transition: { type: 'spring', stiffness: 100 } },
        closed: { width: '80px', transition: { type: 'spring', stiffness: 100 } },
        mobileOpen: { width: '280px', x: 0 },
        mobileClosed: { width: '280px', x: '-100%' },
    };

    return (
        <div style={{ minHeight: '100vh', background: '#09090b', color: 'white', display: 'flex', overflow: 'hidden' }}>

            {/* Sidebar */}
            <motion.div
                initial={isMobile ? "mobileClosed" : "open"}
                animate={isMobile ? (isSidebarOpen ? "mobileOpen" : "mobileClosed") : (isSidebarOpen ? "open" : "closed")}
                variants={sidebarVariants}
                style={{
                    background: 'rgba(24, 24, 27, 0.6)',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', flexDirection: 'column',
                    position: isMobile ? 'fixed' : 'relative',
                    zIndex: 50, height: '100vh', backdropFilter: 'blur(20px)'
                }}
            >
                {/* Logo Area */}
                <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={18} color="white" />
                    </div>
                    {(isSidebarOpen || isMobile) && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontWeight: '700', fontSize: '1.2rem', background: 'linear-gradient(90deg, white, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            DM Admin
                        </motion.span>
                    )}
                </div>

                {/* Menu Items */}
                <div style={{ padding: '16px', flex: 1 }}>
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { id: 'users', icon: Users, label: 'Live Visitors' },
                        { id: 'analytics', icon: Activity, label: 'Analytics' },
                        { id: 'content', icon: BookOpen, label: 'Content' },
                        { id: 'settings', icon: Settings, label: 'Settings' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); if (isMobile) setSidebarOpen(false); }}
                            className="btn-reset"
                            style={{
                                width: '100%', padding: '12px 16px', marginBottom: '8px',
                                borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px',
                                background: activeTab === item.id ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.1), transparent)' : 'transparent',
                                borderLeft: activeTab === item.id ? '3px solid #6366f1' : '3px solid transparent',
                                color: activeTab === item.id ? 'white' : '#9ca3af',
                                transition: 'all 0.2s'
                            }}
                        >
                            <item.icon size={20} color={activeTab === item.id ? '#818cf8' : '#9ca3af'} />
                            {(isSidebarOpen || isMobile) && <span style={{ fontWeight: '500' }}>{item.label}</span>}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button className="btn-reset" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', width: '100%' }}>
                            <LogOut size={20} />
                            {(isSidebarOpen || isMobile) && <span style={{ fontWeight: '600' }}>Exit</span>}
                        </button>
                    </Link>
                </div>
            </motion.div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

                {/* Header */}
                <header style={{
                    height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 32px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(9, 9, 11, 0.8)', backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="btn-reset" style={{ color: '#9ca3af' }}>
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                            {activeTab === 'dashboard' ? 'Overview' :
                                activeTab === 'users' ? 'Real-Time Visitors' :
                                    activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ position: 'relative', display: isMobile ? 'none' : 'block' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                style={{
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '10px 16px 10px 40px', borderRadius: '100px', color: 'white', outline: 'none',
                                    width: '300px'
                                }}
                            />
                        </div>
                        <button className="btn-reset" style={{ position: 'relative' }}>
                            <Bell size={20} color="#9ca3af" />
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
                        </button>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                            A
                        </div>
                    </div>
                </header>

                {/* Scrollable Body */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>

                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                        {[
                            { label: 'Total Logins', value: realData.totalVisits.toLocaleString(), icon: Users, color: '#3b82f6', trend: 'Lifetime' },
                            { label: 'Tests Taken', value: realData.testAttempts, icon: BookOpen, color: '#f59e0b', trend: 'Student Activity' },
                            { label: 'Question Bank', value: realData.totalQuestions, icon: Shield, color: '#8b5cf6', trend: 'Verified Questions' },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card"
                                style={{
                                    padding: '24px', background: 'rgba(255,255,255,0.02)',
                                    borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div style={{ padding: '12px', background: `${stat.color}20`, borderRadius: '12px' }}>
                                        <stat.icon size={24} color={stat.color} />
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '100px' }}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '4px' }}>{stat.value}</div>
                                <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Analytics Area */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>

                        {/* Live Visitor Map / Activity */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Real-Time Visitor Tracking</h3>
                            <button className="btn-reset" style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600' }}>View All</button>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ color: '#9ca3af', fontSize: '0.85rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <th style={{ padding: '16px' }}>User Details</th>
                                        <th style={{ padding: '16px' }}>Location</th>
                                        <th style={{ padding: '16px' }}>Device</th>
                                        <th style={{ padding: '16px' }}>Last Active</th>
                                        <th style={{ padding: '16px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trackedUsers.map((user, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s' }}
                                            onClick={() => setSelectedUser(user)}
                                            className="hover:bg-white/5"
                                        >
                                            <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '700' }}>
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '600' }}>{user.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>{user.phone}</div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px', color: '#a1a1aa' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <MapPin size={14} /> {user.location}
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px', color: '#a1a1aa' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <Smartphone size={14} /> {user.device}
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px', color: '#a1a1aa' }}>{user.lastActive}</td>
                                            <td style={{ padding: '16px' }}>
                                                <button className="btn-reset" style={{ padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>
                                                    View Profile
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* User Detail Modal */}
                    <AnimatePresence>
                        {selectedUser && (
                            <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setSelectedUser(null)}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    style={{ width: '100%', maxWidth: '600px', background: '#18181b', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Visitor Profile</h3>
                                        <button onClick={() => setSelectedUser(null)} className="btn-reset"><X size={24} color="#9ca3af" /></button>
                                    </div>

                                    <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700' }}>
                                                {selectedUser.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{selectedUser.name}</div>
                                                <div style={{ color: '#a1a1aa' }}>{selectedUser.email}</div>
                                                <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{selectedUser.phone}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                                            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '4px' }}>Location</div>
                                                <div style={{ fontWeight: '500' }}>{selectedUser.location}</div>
                                            </div>
                                            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '4px' }}>Device</div>
                                                <div style={{ fontWeight: '500' }}>{selectedUser.device}</div>
                                            </div>
                                        </div>

                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', color: '#60a5fa' }}>Click History (Recent Actions)</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                                            {selectedUser.clicks.map((click, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa' }}></div>
                                                        <div>
                                                            <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>Clicked {click.element}</div>
                                                            <div style={{ fontSize: '0.75rem', color: '#71717a' }}>Page: {click.page}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>{click.time}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '16px', color: '#f59e0b' }}>Test Performance</h4>
                                        {selectedUser.tests.length === 0 ? (
                                            <div style={{ color: '#71717a', fontSize: '0.9rem' }}>No tests attempted yet.</div>
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {selectedUser.tests.map((test, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                                        <div>
                                                            <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{test.name}</div>
                                                            <div style={{ fontSize: '0.75rem', color: '#71717a' }}>{test.date}</div>
                                                        </div>
                                                        <div style={{ fontWeight: '700', color: '#10b981' }}>{test.score}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Real System Stats & Tools */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Question Distribution */}
                        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', flex: 1 }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '20px' }}>Content Distribution</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {subjectStats.map((sub, idx) => (
                                    <div key={idx}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                            <span style={{ color: '#a1a1aa' }}>{sub.subject}</span>
                                            <span style={{ fontWeight: '600' }}>{sub.count} Qs</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(sub.count / realData.totalQuestions) * 100}%`, height: '100%', background: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : '#f59e0b', borderRadius: '100px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', flex: 1 }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '20px' }}>Admin Tools</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <button onClick={handleExport} className="btn-reset" style={{ display: 'flex', gap: '12px', alignItems: 'center', width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                    <Settings size={18} />
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Export Data</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Download JSON backup</div>
                                    </div>
                                </button>
                                <button onClick={handleClearData} className="btn-reset" style={{ display: 'flex', gap: '12px', alignItems: 'center', width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                    <LogOut size={18} />
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Reset System</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Clear all local data</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Helper Icon Component
const AlertCircle = ({ size, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

export default AdminDashboard;
