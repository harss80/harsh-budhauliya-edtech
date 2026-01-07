
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
const getActivityLog = () => {
    const history = JSON.parse(localStorage.getItem('digimentors_test_history') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');

    const logs = [];

    // Add Login Entry if user exists
    if (currentUser) {
        logs.push({
            id: 'LOGIN-001',
            user: currentUser.name || 'User',
            action: 'Logged In',
            details: 'Session Active',
            time: 'Recently',
            status: 'Online',
            type: 'auth'
        });
    }

    // Add recent test attempts
    history.slice(0, 5).forEach((test, idx) => {
        logs.push({
            id: `TEST-${idx}`,
            user: currentUser?.name || 'User',
            action: 'Attempted Test',
            details: `${test.name} - Score: ${test.score}`,
            time: test.date || 'Unknown',
            status: 'Completed',
            type: 'test'
        });
    });

    return logs;
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
    const [activityLog, setActivityLog] = useState(getActivityLog());
    const [subjectStats, setSubjectStats] = useState(getSubjectStats());
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    // Initial Data Load
    useEffect(() => {
        const data = getRealStats();
        setRealData(data);
        setActivityLog(getActivityLog());
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
            setActivityLog(getActivityLog());
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
                        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', gridColumn: 'span 2' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Recent Activity Log</h3>
                                <button className="btn-reset" style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600' }}>View All</button>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ color: '#9ca3af', fontSize: '0.85rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <th style={{ padding: '16px' }}>User</th>
                                            <th style={{ padding: '16px' }}>Action</th>
                                            <th style={{ padding: '16px' }}>Details</th>
                                            <th style={{ padding: '16px' }}>Time</th>
                                            <th style={{ padding: '16px' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activityLog.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#71717a' }}>No recent activity found.</td>
                                            </tr>
                                        ) : (
                                            activityLog.map((log, idx) => (
                                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.9rem' }}>
                                                    <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
                                                            {log.user.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: '600' }}>{log.user}</div>
                                                            <div style={{ fontSize: '0.75rem', color: '#71717a' }}>{log.id}</div>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '16px', fontWeight: '600', color: log.type === 'auth' ? '#10b981' : '#f59e0b' }}>{log.action}</td>
                                                    <td style={{ padding: '16px', color: '#a1a1aa' }}>{log.details}</td>
                                                    <td style={{ padding: '16px', color: '#a1a1aa' }}>{log.time}</td>
                                                    <td style={{ padding: '16px' }}>
                                                        <span style={{
                                                            padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '600',
                                                            background: 'rgba(255,255,255,0.1)', color: 'white'
                                                        }}>
                                                            {log.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

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
        </div>
    );
};

// Helper Icon Component
const AlertCircle = ({ size, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

export default AdminDashboard;
