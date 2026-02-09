
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, Activity, BookOpen, Settings,
    Search, Bell, ChevronDown, MapPin, Smartphone,
    Globe, Clock, TrendingUp, DollarSign, Shield, LogOut, Menu, X,
    FileText, Zap, AlertTriangle, Trash2, LogIn, Mail, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../utils/apiBase';
import { realQuestions } from '../data/realQuestions';

// --- Data Helpers ---

const getSystemStats = () => {
    // Visits
    const totalVisits = parseInt(localStorage.getItem('digimentors_total_visits') || '0');

    // Users
    const users = JSON.parse(localStorage.getItem('digimentors_users') || '[]');
    const totalUsers = users.length;

    // Tests
    const history = JSON.parse(localStorage.getItem('digimentors_test_history') || '[]');
    const totalTests = history.length;

    // Content
    const totalQuestions = realQuestions.length;

    return { totalVisits, totalUsers, totalTests, totalQuestions };
};

// Sidebar item component (top-level to avoid nested component lint)
const SidebarItem = ({ id, icon: Icon, label, activeTab, isSidebarOpen, isMobile, onClick }) => (
    <button
        onClick={onClick}
        className="btn-reset"
        style={{
            width: '100%', padding: '12px 16px', marginBottom: '8px',
            borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px',
            background: activeTab === id ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.1), transparent)' : 'transparent',
            borderLeft: activeTab === id ? '3px solid #6366f1' : '3px solid transparent',
            color: activeTab === id ? 'white' : '#9ca3af',
            transition: 'all 0.2s', cursor: 'pointer', border: 'none', textAlign: 'left'
        }}
    >
        <Icon size={20} color={activeTab === id ? '#818cf8' : '#9ca3af'} />
        {(isSidebarOpen || isMobile) && <span style={{ fontWeight: '500' }}>{label}</span>}
    </button>
);

const getAllUsers = () => {
    const users = JSON.parse(localStorage.getItem('digimentors_users') || '[]');
    // Sort by join date desc (if available) or push valid ones
    return users.reverse();
};

const getRecentActivity = () => {
    return JSON.parse(localStorage.getItem('digimentors_recent_activities') || '[]');
};

const getLoginLogs = () => {
    return JSON.parse(localStorage.getItem('digimentors_login_logs') || '[]');
};

const getSiteConfig = () => {
    return JSON.parse(localStorage.getItem('digimentors_site_config') || '{"maintenanceMode": false, "announcement": "", "adminEmails": ["harshbudhauliya882@gmail.com"]}');
};

const getContentLibrary = () => {
    return JSON.parse(localStorage.getItem('digimentors_content_library') || '[]');
};

const getTests = () => {
    return JSON.parse(localStorage.getItem('digimentors_tests') || '[]');
};

const getNotificationsList = () => {
    return JSON.parse(localStorage.getItem('digimentors_notifications') || '[]');
};

const getPlans = () => {
    return JSON.parse(localStorage.getItem('digimentors_billing_plans') || '[]');
};

const getContacts = () => {
    return JSON.parse(localStorage.getItem('digimentors_contacts') || '[]');
};

const getCareers = () => {
    return JSON.parse(localStorage.getItem('digimentors_careers') || '[]');
};

const AnalyticsView = ({ activities }) => {
    const [period, setPeriod] = useState('Week'); // Day, Week, Month, Year

    // Helper to filter activities by period
    const filteredActivities = activities.filter(act => {
        if (!act.isoDate) return true; // Show all if no date (legacy)
        const date = new Date(act.isoDate);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (period === 'Day') return diffDays <= 1;
        if (period === 'Week') return diffDays <= 7;
        if (period === 'Month') return diffDays <= 30;
        if (period === 'Year') return diffDays <= 365;
        return true;
    });

    // Aggregations
    const cities = {};
    const countries = {};
    const devices = {};
    const referrers = {};
    const timeline = {};

    filteredActivities.forEach(act => {
        const city = act.city || 'Unknown';
        cities[city] = (cities[city] || 0) + 1;

        const country = act.country || 'Unknown';
        countries[country] = (countries[country] || 0) + 1;

        const device = act.device || 'Desktop';
        devices[device] = (devices[device] || 0) + 1;

        const ref = act.referrer || 'Direct';
        referrers[ref] = (referrers[ref] || 0) + 1;

        // Timeline Aggregation
        const dateKey = act.isoDate ? new Date(act.isoDate).toLocaleDateString() : 'Today';
        timeline[dateKey] = (timeline[dateKey] || 0) + 1;
    });

    // Top Stats
    const topCity = Object.keys(cities).sort((a, b) => cities[b] - cities[a])[0] || 'N/A';
    const topCountry = Object.keys(countries).sort((a, b) => countries[b] - countries[a])[0] || 'N/A';

    // Sort Timeline Data
    const sortedTimeline = Object.entries(timeline).sort((a, b) => new Date(a[0]) - new Date(b[0]));

    // Generate Chart SVG Points
    const maxVal = Math.max(...Object.values(timeline), 5); // Minimum max of 5 for scale
    const points = sortedTimeline.map((item, index) => {
        const x = (index / (sortedTimeline.length - 1 || 1)) * 100;
        const y = 100 - (item[1] / maxVal) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Detailed Visitor Analytics</h3>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '100px', display: 'flex' }}>
                    {['Day', 'Week', 'Month', 'Year'].map(p => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            style={{
                                padding: '6px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                                background: period === p ? '#6366f1' : 'transparent',
                                color: period === p ? 'white' : '#a1a1aa', fontWeight: '600', transition: 'all 0.2s'
                            }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ color: '#a1a1aa', marginBottom: '8px' }}>Total Visits ({period})</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>{filteredActivities.length}</div>
                </div>
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ color: '#a1a1aa', marginBottom: '8px' }}>Top City</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>{topCity}</div>
                </div>
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ color: '#a1a1aa', marginBottom: '8px' }}>Top Country</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>{topCountry}</div>
                </div>
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ color: '#a1a1aa', marginBottom: '8px' }}>Mobile Users</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b' }}>{devices['Mobile'] || 0}</div>
                </div>
            </div>

            {/* ANALYTICS CHART */}
            <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
                <h4 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>Traffic Trends</h4>
                <div style={{ height: '200px', width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
                    {/* SVG Line Chart */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        <defs>
                            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Area */}
                        <path d={`M0,100 ${points} 100,100`} fill="url(#gradient)" />
                        {/* Line */}
                        <path d={`M0,100 ${points}`} fill="none" stroke="#6366f1" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    </svg>
                    {/* Data Points Tooltip Hack - displaying dots */}
                    {sortedTimeline.map((item, index) => {
                        const x = (index / (sortedTimeline.length - 1 || 1)) * 100;
                        const y = 100 - (item[1] / maxVal) * 100;
                        return (
                            <div key={index} title={`${item[0]}: ${item[1]} visits`} style={{ position: 'absolute', left: `${x}%`, bottom: `${100 - y}%`, width: '8px', height: '8px', background: '#fff', borderRadius: '50%', transform: 'translate(-50%, 50%)', border: '2px solid #6366f1' }} />
                        );
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: '#71717a', fontSize: '0.85rem' }}>
                    <span>{sortedTimeline[0]?.[0]}</span>
                    <span>{sortedTimeline[sortedTimeline.length - 1]?.[0]}</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                {/* Device Breakdown */}
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h4 style={{ marginBottom: '16px', color: '#e4e4e7', fontSize: '1.1rem' }}>Device Breakdown</h4>
                    {Object.entries(devices).map(([d, count]) => (
                        <div key={d} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {d === 'Mobile' ? <Smartphone size={18} color="#f59e0b" /> : <Globe size={18} color="#3b82f6" />}
                                <span>{d}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                                    <div style={{ width: `${(count / filteredActivities.length) * 100}%`, height: '100%', background: d === 'Mobile' ? '#f59e0b' : '#3b82f6', borderRadius: '10px' }}></div>
                                </div>
                                <span style={{ width: '20px', textAlign: 'right' }}>{count}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Top Location Breakdown */}
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h4 style={{ marginBottom: '16px', color: '#e4e4e7', fontSize: '1.1rem' }}>Top Cities</h4>
                    {Object.entries(cities).slice(0, 5).map(([city, count]) => (
                        <div key={city} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MapPin size={18} color="#ef4444" />
                                <span>{city}</span>
                            </div>
                            <span style={{ fontWeight: '600' }}>{count}</span>
                        </div>
                    ))}
                </div>

                {/* Top Countries Breakdown */}
                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h4 style={{ marginBottom: '16px', color: '#e4e4e7', fontSize: '1.1rem' }}>Top Countries</h4>
                    {Object.entries(countries).slice(0, 5).map(([country, count]) => (
                        <div key={country} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Globe size={18} color="#8b5cf6" />
                                <span>{country}</span>
                            </div>
                            <span style={{ fontWeight: '600' }}>{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Log Table */}
            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: '600' }}>Full Visitor Log ({period})</div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead style={{ position: 'sticky', top: 0, background: '#09090b', zIndex: 10 }}>
                            <tr style={{ color: '#a1a1aa', textAlign: 'left' }}>
                                <th style={{ padding: '12px 16px' }}>Time</th>
                                <th style={{ padding: '12px 16px' }}>City</th>
                                <th style={{ padding: '12px 16px' }}>Country</th>
                                <th style={{ padding: '12px 16px' }}>Device</th>
                                <th style={{ padding: '12px 16px' }}>Page</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredActivities.map((act, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                    <td style={{ padding: '12px 16px', color: '#a1a1aa' }}>
                                        {act.isoDate ? new Date(act.isoDate).toLocaleString() : act.time}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>{act.city || 'Unknown'}</td>
                                    <td style={{ padding: '12px 16px' }}>{act.country || 'Unknown'}</td>
                                    <td style={{ padding: '12px 16px' }}>{act.device || 'Desktop'}</td>
                                    <td style={{ padding: '12px 16px', color: '#818cf8' }}>{act.page}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- Admissions / Access Control View ---

const AdmissionsView = ({ users, onUpdateUser }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [accessForm, setAccessForm] = useState({
        total: false,
        neet: false,
        jee: false,
        tests: false
    });

    const handleSearch = () => {
        const found = users.find(u =>
            (u.admissionId && u.admissionId.toLowerCase() === searchTerm.toLowerCase()) ||
            u.email.toLowerCase() === searchTerm.toLowerCase()
        );
        if (found) {
            setSelectedUser(found);
            // Pre-fill form based on existing rights
            const rights = found.accessRights || [];
            setAccessForm({
                total: rights.includes('total_access'),
                neet: rights.includes('neet_full'),
                jee: rights.includes('jee_full'),
                tests: rights.includes('test_series')
            });
        } else {
            alert('User not found. Please enter valid Admission ID or Email.');
            setSelectedUser(null);
        }
    };

    const handleGrantAccess = () => {
        if (!selectedUser) return;

        const newRights = [];
        if (accessForm.total) newRights.push('total_access');
        if (accessForm.neet) newRights.push('neet_full');
        if (accessForm.jee) newRights.push('jee_full');
        if (accessForm.tests) newRights.push('test_series');

        const updatedUser = { ...selectedUser, accessRights: newRights };
        onUpdateUser(updatedUser);
        alert(`Access rights updated for ${selectedUser.name} (${selectedUser.admissionId})`);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '10px' }}>Admission & Access Control</h2>
                <p style={{ color: '#a1a1aa' }}>Grant specific course or test access to students via their Unique Admission ID.</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Search size={20} color="#818cf8" /> Find Student</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                        type="text"
                        placeholder="Enter Admission ID (e.g., ADM-123456) or Email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1, padding: '14px', borderRadius: '12px', background: '#09090b', border: '1px solid #27272a', color: 'white', outline: 'none' }}
                    />
                    <button onClick={handleSearch} className="btn-reset" style={{ padding: '14px 24px', background: '#6366f1', color: 'white', borderRadius: '12px', fontWeight: '600' }}>Search</button>
                </div>
            </div>

            {selectedUser && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700' }}>
                            {selectedUser.name[0]}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{selectedUser.name}</h3>
                            <div style={{ color: '#a1a1aa', display: 'flex', gap: '12px', fontSize: '0.9rem' }}>
                                <span>{selectedUser.email}</span>
                                <span style={{ color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{selectedUser.admissionId || 'No ID'}</span>
                            </div>
                        </div>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Grant Access</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>

                        {/* Option Cards */}
                        <div
                            onClick={() => setAccessForm({ ...accessForm, total: !accessForm.total })}
                            style={{
                                padding: '20px', borderRadius: '16px', border: accessForm.total ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                                background: accessForm.total ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>Total Access (All)</span>
                                {accessForm.total && <div style={{ width: '20px', height: '20px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>}
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Unlock everything on the platform.</p>
                        </div>

                        <div
                            onClick={() => setAccessForm({ ...accessForm, neet: !accessForm.neet })}
                            style={{
                                padding: '20px', borderRadius: '16px', border: accessForm.neet ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
                                background: accessForm.neet ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.02)',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>NEET Full Course</span>
                                {accessForm.neet && <div style={{ width: '20px', height: '20px', background: '#8b5cf6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>}
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Complete NEET preparation module.</p>
                        </div>

                        <div
                            onClick={() => setAccessForm({ ...accessForm, jee: !accessForm.jee })}
                            style={{
                                padding: '20px', borderRadius: '16px', border: accessForm.jee ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                                background: accessForm.jee ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.02)',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>JEE Full Course</span>
                                {accessForm.jee && <div style={{ width: '20px', height: '20px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>}
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Complete JEE preparation module.</p>
                        </div>

                        <div
                            onClick={() => setAccessForm({ ...accessForm, tests: !accessForm.tests })}
                            style={{
                                padding: '20px', borderRadius: '16px', border: accessForm.tests ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                                background: accessForm.tests ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.02)',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: '600' }}>Test Series Only</span>
                                {accessForm.tests && <div style={{ width: '20px', height: '20px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>}
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Access to all mock tests (no content).</p>
                        </div>

                    </div>

                    <button onClick={handleGrantAccess} className="btn-reset" style={{ width: '100%', padding: '16px', background: '#10b981', color: 'white', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem' }}>
                        Confirm & Update Access
                    </button>

                </motion.div>
            )}
        </div>
    );
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    const [adminToken, setAdminToken] = useState(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const fromUrl = String(params.get('token') || '').trim();
            const fromLocal = String(localStorage.getItem('digimentors_admin_token') || '').trim();
            return fromUrl || fromLocal || '';
        } catch {
            return '';
        }
    });

    useEffect(() => {
        try {
            if (adminToken) localStorage.setItem('digimentors_admin_token', adminToken);
        } catch { /* ignore */ }
    }, [adminToken]);

    // Data State
    const [stats, setStats] = useState(getSystemStats());
    const [users, setUsers] = useState(getAllUsers());
    const [activities, setActivities] = useState(getRecentActivity());
    const [loginLogs, setLoginLogs] = useState(getLoginLogs());
    const [siteConfig, setSiteConfig] = useState(getSiteConfig());
    const [selectedUser, setSelectedUser] = useState(null);
    const [content, setContent] = useState(getContentLibrary());
    const [tests, setTests] = useState(getTests());
    const [newPdf, setNewPdf] = useState({ name: '', subject: '', duration: 60, date: '', file: null });
    const [notifications, setNotifications] = useState(getNotificationsList());
    const [plans, setPlans] = useState(getPlans());
    const [contacts, setContacts] = useState(getContacts());
    const [careers, setCareers] = useState(getCareers());

    // Search
    const [searchTerm, setSearchTerm] = useState('');
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newContent, setNewContent] = useState({ title: '', subject: '', type: 'pdf', url: '' });
    const [newTest, setNewTest] = useState({ name: '', subject: '', date: '', duration: 60 });
    const [newNotification, setNewNotification] = useState({ title: '', message: '' });
    const [newPlan, setNewPlan] = useState({ name: '', price: '', features: '' });
    const [contactFilter, setContactFilter] = useState('all');
    const [contentSearch, setContentSearch] = useState('');
    const [contentTypeFilter, setContentTypeFilter] = useState('all');
    const [testsSearch, setTestsSearch] = useState('');
    const [notificationsFilter, setNotificationsFilter] = useState('all');
    const [contactPage, setContactPage] = useState(1);
    const [contactPageSize] = useState(10);

    // Responsive
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

    // Live Refresh (Hybrid: Backend + Local Fallback)
    useEffect(() => {
        const fetchData = async () => {
            const base = API_BASE || '';
            try {
                const [usersRes, testsRes, notifsRes, contactsRes, careersRes] = await Promise.all([
                    fetch(`${base}/api/users/admin${adminToken ? `?token=${encodeURIComponent(adminToken)}` : ''}`, {
                        headers: adminToken ? { 'x-admin-token': adminToken } : {}
                    }).catch(() => null),
                    fetch(`${base}/api/tests`).catch(() => null),
                    fetch(`${base}/api/notifications`).catch(() => null),
                    fetch(`${base}/api/contacts`).catch(() => null),
                    fetch(`${base}/api/careers`).catch(() => null),
                ]);

                // Users
                if (usersRes && usersRes.ok) {
                    const payload = await usersRes.json();
                    const list = Array.isArray(payload) ? payload : (Array.isArray(payload?.items) ? payload.items : []);
                    setUsers(list);
                } else {
                    setUsers(getAllUsers());
                }

                // Tests
                if (testsRes && testsRes.ok) {
                    const list = await testsRes.json();
                    const mapped = list.map(t => ({ id: t._id || t.id, name: t.name, subject: t.subject, duration: t.duration, scheduledAt: t.scheduledAt, published: !!t.published, visibleFrom: t.visibleFrom, visibleUntil: t.visibleUntil, generated: !!t.generated }));
                    setTests(mapped);
                    localStorage.setItem('digimentors_tests', JSON.stringify(mapped));
                } else {
                    setTests(getTests());
                }

                // Notifications
                if (notifsRes && notifsRes.ok) {
                    const list = await notifsRes.json();
                    const mapped = list.map(n => ({ id: n._id || n.id, title: n.title, message: n.message, createdAt: n.createdAt, read: false }));
                    setNotifications(mapped);
                    localStorage.setItem('digimentors_notifications', JSON.stringify(mapped));
                } else {
                    setNotifications(getNotificationsList());
                }

                // Contacts
                if (contactsRes && contactsRes.ok) {
                    const list = await contactsRes.json();
                    const mapped = list.map(c => ({ id: c._id || c.id, firstName: c.firstName, lastName: c.lastName, email: c.email, queryType: c.queryType, message: c.message, status: c.status, createdAt: c.createdAt }));
                    setContacts(mapped);
                    localStorage.setItem('digimentors_contacts', JSON.stringify(mapped));
                } else {
                    setContacts(getContacts());
                }

                // Careers (merge server + local drafts)
                if (careersRes && careersRes.ok) {
                    const serverList = await careersRes.json();
                    const drafts = getCareers();
                    const merged = [...drafts, ...serverList];
                    setCareers(merged);
                    localStorage.setItem('digimentors_careers', JSON.stringify(merged));
                } else {
                    setCareers(getCareers());
                }

                // Stats and other locals
                setStats(getSystemStats());
                setActivities(getRecentActivity());
                setLoginLogs(getLoginLogs());
                setSiteConfig(getSiteConfig());
                setContent(getContentLibrary());
                setPlans(getPlans());
            } catch {
                // Fallback
                setStats(getSystemStats());
                setUsers(getAllUsers());
                setActivities(getRecentActivity());
                setLoginLogs(getLoginLogs());
                setSiteConfig(getSiteConfig());
                setContent(getContentLibrary());
                setTests(getTests());
                setNotifications(getNotificationsList());
                setPlans(getPlans());
                setContacts(getContacts());
                setCareers(getCareers());
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [adminToken]);

    // Handlers
    const handleConfigChange = (key, value) => {
        const newConfig = { ...siteConfig, [key]: value };
        setSiteConfig(newConfig);
        localStorage.setItem('digimentors_site_config', JSON.stringify(newConfig));
    };

    // Removed handleClearSystem

    const handleDeleteUser = (email) => {
        if (window.confirm(`Delete user ${email}?`)) {
            const newUsers = users.filter(u => u.email !== email);
            localStorage.setItem('digimentors_users', JSON.stringify(newUsers.reverse())); // Save back in original order order logic needs check but reverse() flips it back
            // Simpler: just filter the raw list
            const currentRaw = JSON.parse(localStorage.getItem('digimentors_users') || '[]');
            const updatedRaw = currentRaw.filter(u => u.email !== email);
            localStorage.setItem('digimentors_users', JSON.stringify(updatedRaw));
            setUsers(updatedRaw.reverse());
            setSelectedUser(null);
        }
    };

    const handleUpdateUser = (updatedUser) => {
        const newUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
        setUsers(newUsers);
        localStorage.setItem('digimentors_users', JSON.stringify(newUsers.reverse())); // Store respecting order

        // Also update if it's the current session user (for testing immediately)
        const currentUser = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');
        if (currentUser && currentUser.email === updatedUser.email) {
            localStorage.setItem('digimentors_current_user', JSON.stringify(updatedUser));
        }

        // Best-effort backend sync
        try {
            fetch(`${API_BASE}/api/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser)
            }).catch(() => null);
        } catch { /* ignore */ }
    };

    const handleAddContent = () => {
        const c = { id: 'CONT-' + Math.random().toString(36).substr(2, 9), ...newContent, createdAt: new Date().toISOString() };
        const list = [c, ...content];
        setContent(list);
        localStorage.setItem('digimentors_content_library', JSON.stringify(list));
        setNewContent({ title: '', subject: '', type: 'pdf', url: '' });
    };

    const handleDeleteContent = (id) => {
        const list = content.filter(i => i.id !== id);
        setContent(list);
        localStorage.setItem('digimentors_content_library', JSON.stringify(list));
    };

    const handleAddTest = async () => {
        const t = {
            name: newTest.name,
            subject: newTest.subject,
            scheduledAt: newTest.date ? new Date(newTest.date).toISOString() : null,
            duration: parseInt(newTest.duration || 60, 10),
            published: false
        };
        try {
            const res = await fetch(`${API_BASE}/api/tests`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(t)
            });
            const saved = res.ok ? await res.json() : null;
            const mapped = saved ? { id: saved._id, ...t } : { id: 'TEST-' + Math.random().toString(36).substr(2, 9), ...t };
            const list = [mapped, ...tests];
            setTests(list);
            localStorage.setItem('digimentors_tests', JSON.stringify(list));
        } catch {
            const mapped = { id: 'TEST-' + Math.random().toString(36).substr(2, 9), ...t };
            const list = [mapped, ...tests];
            setTests(list);
            localStorage.setItem('digimentors_tests', JSON.stringify(list));
        }
        setNewTest({ name: '', subject: '', date: '', duration: 60 });
    };

    const handleDeleteTest = async (id) => {
        const serverId = (id && /^[a-f\d]{24}$/i.test(String(id))) ? id : null;
        if (serverId) {
            try { await fetch(`${API_BASE}/api/tests/${serverId}`, { method: 'DELETE' }); } catch { /* ignore */ }
        }
        const list = tests.filter(i => i.id !== id);
        setTests(list);
        localStorage.setItem('digimentors_tests', JSON.stringify(list));
    };

    const handleGenerateFromPdf = async () => {
        if (!newPdf.file) { alert('Select a PDF file'); return; }
        const fd = new FormData();
        fd.append('file', newPdf.file);
        if (newPdf.name) fd.append('name', newPdf.name);
        if (newPdf.subject) fd.append('subject', newPdf.subject);
        if (newPdf.duration) fd.append('duration', String(newPdf.duration));
        if (newPdf.date) fd.append('scheduleAt', new Date(newPdf.date).toISOString());
        try {
            const res = await fetch(`${API_BASE}/api/tests/generate-from-pdf`, { method: 'POST', body: fd });
            if (!res.ok) throw new Error('Upload failed');
            const saved = await res.json();
            const mapped = { id: saved._id, name: saved.name, subject: saved.subject, duration: saved.duration, scheduledAt: saved.scheduledAt, published: !!saved.published, visibleFrom: saved.visibleFrom, visibleUntil: saved.visibleUntil, generated: !!saved.generated };
            const list = [mapped, ...tests];
            setTests(list);
            localStorage.setItem('digimentors_tests', JSON.stringify(list));
            setNewPdf({ name: '', subject: '', duration: 60, date: '', file: null });
        } catch (e) {
            alert('Could not generate test from PDF. Please try again.');
        }
    };

    const handleMakeLiveOneDay = async (id) => {
        const now = new Date();
        const until = new Date(now.getTime() + 24*60*60*1000);
        const serverId = (id && /^[a-f\d]{24}$/i.test(String(id))) ? id : null;
        if (serverId) {
            try {
                await fetch(`${API_BASE}/api/tests/${serverId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ published: true, visibleFrom: now.toISOString(), visibleUntil: until.toISOString() })
                });
            } catch { /* ignore */ }
        }
        const updated = tests.map(t => t.id === id ? { ...t, published: true, visibleFrom: now.toISOString(), visibleUntil: until.toISOString() } : t);
        setTests(updated);
        localStorage.setItem('digimentors_tests', JSON.stringify(updated));
    };

    const handleAddNotification = async () => {
        const payload = { title: newNotification.title, message: newNotification.message };
        try {
            const res = await fetch(`${API_BASE}/api/notifications`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
            });
            const saved = res.ok ? await res.json() : null;
            const n = saved ? { id: saved._id, title: saved.title, message: saved.message, createdAt: saved.createdAt, read: false } : { id: 'NTF-' + Math.random().toString(36).substr(2, 9), ...payload, createdAt: new Date().toISOString(), read: false };
            const list = [n, ...notifications];
            setNotifications(list);
            localStorage.setItem('digimentors_notifications', JSON.stringify(list));
        } catch {
            const fallback = { id: 'NTF-' + Math.random().toString(36).substr(2, 9), ...payload, createdAt: new Date().toISOString(), read: false };
            const list = [fallback, ...notifications];
            setNotifications(list);
            localStorage.setItem('digimentors_notifications', JSON.stringify(list));
        }
        setNewNotification({ title: '', message: '' });
    };

    const handleDeleteNotification = async (id) => {
        const serverId = (id && /^[a-f\d]{24}$/i.test(String(id))) ? id : null;
        if (serverId) {
            try { await fetch(`${API_BASE}/api/notifications/${serverId}`, { method: 'DELETE' }); } catch { /* ignore */ }
        }
        const list = notifications.filter(i => i.id !== id);
        setNotifications(list);
        localStorage.setItem('digimentors_notifications', JSON.stringify(list));
    };

    const handleAddPlan = () => {
        const p = {
            id: 'PLAN-' + Math.random().toString(36).substr(2, 9),
            name: newPlan.name,
            price: parseFloat(newPlan.price || '0'),
            features: newPlan.features.split(',').map(f => f.trim()).filter(Boolean)
        };
        const list = [p, ...plans];
        setPlans(list);
        localStorage.setItem('digimentors_billing_plans', JSON.stringify(list));
        setNewPlan({ name: '', price: '', features: '' });
    };

    const handleDeletePlan = (id) => {
        const list = plans.filter(i => i.id !== id);
        setPlans(list);
        localStorage.setItem('digimentors_billing_plans', JSON.stringify(list));
    };

    const handleToggleTestPublish = async (id) => {
        const current = tests.find(t => t.id === id);
        const nextPublished = !current?.published;
        const serverId = (id && /^[a-f\d]{24}$/i.test(String(id))) ? id : null;
        if (serverId) {
            try {
                await fetch(`${API_BASE}/api/tests/${serverId}`, {
                    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: nextPublished })
                });
            } catch { /* ignore */ }
        }
        const list = tests.map(t => t.id === id ? { ...t, published: nextPublished } : t);
        setTests(list);
        localStorage.setItem('digimentors_tests', JSON.stringify(list));
    };

    const handleMarkNotificationRead = (id) => {
        const list = notifications.map(n => n.id === id ? { ...n, read: true } : n);
        setNotifications(list);
        localStorage.setItem('digimentors_notifications', JSON.stringify(list));
    };

    const exportContactsCSV = () => {
        const header = ['Time','FirstName','LastName','Email','Type','Message','Status'];
        const rows = contacts.map(c => [
            c.createdAt ? new Date(c.createdAt).toLocaleString() : '',
            c.firstName || '',
            c.lastName || '',
            c.email || '',
            c.queryType || '',
            (c.message || '').replace(/\n/g,' '),
            c.status || ''
        ]);
        const csv = [header, ...rows].map(r => r.map(x => '"' + String(x).replaceAll('"','""') + '"').join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contacts.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDeleteContact = async (id) => {
        const serverId = (id && /^[a-f\d]{24}$/i.test(String(id))) ? id : null;
        if (serverId) {
            try { await fetch(`${API_BASE}/api/contacts/${serverId}`, { method: 'DELETE' }); } catch { /* ignore */ }
        }
        const list = contacts.filter(c => c.id !== id);
        setContacts(list);
        localStorage.setItem('digimentors_contacts', JSON.stringify(list));
    };

    const handleToggleContactStatus = async (id) => {
        const item = contacts.find(c => c.id === id);
        if (!item) return;
        const next = item.status === 'resolved' ? 'open' : 'resolved';
        const serverId = (id && /^[a-f\d]{24}$/i.test(String(id))) ? id : null;
        if (serverId) {
            try {
                await fetch(`${API_BASE}/api/contacts/${serverId}`, {
                    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next })
                });
            } catch { /* ignore */ }
        }
        const list = contacts.map(x => x.id === id ? { ...x, status: next } : x);
        setContacts(list);
        localStorage.setItem('digimentors_contacts', JSON.stringify(list));
    };

    // Filtered Users
    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', background: '#09090b', color: 'white', display: 'flex', overflow: 'hidden', fontFamily: '"Inter", sans-serif' }}>

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{ width: (isSidebarOpen && !isMobile) || (!isSidebarOpen && isMobile) ? (isMobile ? '100%' : '280px') : '80px' }}
                style={{
                    background: 'rgba(24, 24, 27, 0.6)', borderRight: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', flexDirection: 'column', position: isMobile && isSidebarOpen ? 'fixed' : 'relative',
                    zIndex: 50, height: '100vh', backdropFilter: 'blur(20px)',
                    transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'none',
                    transition: 'width 0.3s ease'
                }}
            >
                <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={18} color="white" />
                    </div>
                    {(isSidebarOpen || isMobile) && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Admin</span>
                            {isMobile && <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X size={20} /></button>}
                        </div>
                    )}

                    
                </div>

                <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
                    <SidebarItem id="dashboard" icon={LayoutDashboard} label="Overview" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('dashboard'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="analytics" icon={TrendingUp} label="Detailed Analytics" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('analytics'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="admissions" icon={Users} label="Admissions" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('admissions'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="users" icon={FileText} label="User Management" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('users'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="live" icon={Activity} label="Live Traffic" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('live'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="logins" icon={LogIn} label="Login Logs" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('logins'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="control" icon={Settings} label="Site Control" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('control'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="content" icon={BookOpen} label="Content Library" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('content'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="tests" icon={Activity} label="Test Management" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('tests'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="notifications" icon={Bell} label="Notifications" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('notifications'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="billing" icon={DollarSign} label="Billing" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('billing'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="audit" icon={AlertTriangle} label="Audit Logs" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('audit'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="careers" icon={Briefcase} label="Careers" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('careers'); if (isMobile) setSidebarOpen(false); }} />
                    <SidebarItem id="contacts" icon={Mail} label="Contacts" activeTab={activeTab} isSidebarOpen={isSidebarOpen} isMobile={isMobile} onClick={() => { setActiveTab('contacts'); if (isMobile) setSidebarOpen(false); }} />
                </div>


                <div style={{ padding: '24px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button className="btn-reset" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', width: '100%' }}>
                            <LogOut size={20} />
                            {(isSidebarOpen || isMobile) && <span style={{ fontWeight: '600' }}>Exit Panel</span>}
                        </button>
                    </Link>
                </div>
            </motion.div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

                {/* Header */}
                <header style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(9, 9, 11, 0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                            <Menu size={24} />
                        </button>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                    </div>
                    {/* Search Bar - Only show on Users tab */}
                    {activeTab === 'users' && (
                        <div style={{ position: 'relative', width: '300px' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                            <input
                                type="text" placeholder="Search Users..."
                                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '10px 16px 10px 36px', borderRadius: '100px', color: 'white', outline: 'none'
                                }}
                            />
                        </div>
                    )}
                </header>

                {/* Content Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>

                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                            {[
                                { label: 'Total Visits', value: stats.totalVisits.toLocaleString(), icon: Globe, color: '#3b82f6' },
                                { label: 'Registered Users', value: stats.totalUsers, icon: Users, color: '#10b981' },
                                { label: 'Total Admissions', value: users.filter(u => u.admissionId).length, icon: Shield, color: '#8b5cf6' },
                                { label: 'Tests Attempted', value: stats.totalTests, icon: Activity, color: '#f59e0b' },
                                { label: 'Questions Live', value: stats.totalQuestions, icon: BookOpen, color: '#ec4899' },
                            ].map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ padding: '12px', background: `${s.color}20`, borderRadius: '12px' }}><s.icon size={24} color={s.color} /></div>
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>{s.value}</div>
                                    <div style={{ color: '#9ca3af' }}>{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* ANALYTICS TAB */}
                    {activeTab === 'analytics' && (
                        <AnalyticsView activities={activities} />
                    )}

                    {/* ADMISSIONS TAB */}
                    {activeTab === 'admissions' && (
                        <AdmissionsView users={users} onUpdateUser={handleUpdateUser} />
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <th style={{ padding: '16px' }}>Student</th>
                                        <th style={{ padding: '16px' }}>Admission ID</th>
                                        <th style={{ padding: '16px' }}>Email</th>
                                        <th style={{ padding: '16px' }}>Phone</th>
                                        <th style={{ padding: '16px' }}>Target</th>
                                        <th style={{ padding: '16px' }}>Joined</th>
                                        <th style={{ padding: '16px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length > 0 ? filteredUsers.map((u, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }} className="hover:bg-white/5">
                                            <td style={{ padding: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{u.name?.[0]?.toUpperCase()}</div>
                                                {u.name}
                                            </td>
                                            <td style={{ padding: '16px', color: '#a1a1aa' }}>{u.admissionId || 'N/A'}</td>
                                            <td style={{ padding: '16px', color: '#a1a1aa' }}>{u.email}</td>
                                            <td style={{ padding: '16px' }}>{u.phone || 'N/A'}</td>
                                            <td style={{ padding: '16px' }}>{u.educationDetails?.targetExam ? (
                                                <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px', fontSize: '0.8rem' }}>
                                                    {u.educationDetails.targetExam}
                                                </span>
                                            ) : <span style={{ color: '#52525b' }}>N/A</span>}
                                            </td>
                                            <td style={{ padding: '16px', color: '#a1a1aa' }}>{u.joinDate}</td>
                                            <td style={{ padding: '16px' }}>
                                                <button onClick={() => setSelectedUser(u)} style={{ marginRight: '8px', padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>View</button>
                                                <button onClick={() => handleDeleteUser(u.email)} style={{ padding: '6px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#52525b' }}>No users found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* LIVE TAB */}
                    {activeTab === 'live' && (
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Real-Time Activity Feed</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {activities.map((act, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ padding: '8px', background: act.user ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.05)', borderRadius: '8px', color: act.user ? '#818cf8' : '#71717a' }}>
                                                {act.user ? <Users size={20} /> : <Globe size={20} />}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{act.user ? act.user.name : 'Anonymous Visitor'}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Visited <span style={{ color: '#fff' }}>{act.page}</span></div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{act.time}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#52525b' }}>ID: {act.visitorId?.slice(-6)}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                                    <input value={newContent.title} onChange={e => setNewContent({ ...newContent, title: e.target.value })} placeholder="Title" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input value={newContent.subject} onChange={e => setNewContent({ ...newContent, subject: e.target.value })} placeholder="Subject" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <select value={newContent.type} onChange={e => setNewContent({ ...newContent, type: e.target.value })} style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }}>
                                        <option value="pdf">PDF</option>
                                        <option value="video">Video</option>
                                        <option value="link">Link</option>
                                    </select>
                                    <input value={newContent.url} onChange={e => setNewContent({ ...newContent, url: e.target.value })} placeholder="URL" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <button onClick={handleAddContent} style={{ padding: '12px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700' }}>Add Content</button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '12px' }}>
                                    <input value={contentSearch} onChange={e => setContentSearch(e.target.value)} placeholder="Search title/subject" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <select value={contentTypeFilter} onChange={e => setContentTypeFilter(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }}>
                                        <option value="all">All Types</option>
                                        <option value="pdf">PDF</option>
                                        <option value="video">Video</option>
                                        <option value="link">Link</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                <div style={{ width: '100%', overflowX: 'auto' }}>
                                <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <th style={{ padding: '16px' }}>Title</th>
                                            <th style={{ padding: '16px' }}>Subject</th>
                                            <th style={{ padding: '16px' }}>Type</th>
                                            <th style={{ padding: '16px' }}>URL</th>
                                            <th style={{ padding: '16px' }}>Added</th>
                                            <th style={{ padding: '16px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(content.filter(c => (
                                            (!contentSearch || (c.title || '').toLowerCase().includes(contentSearch.toLowerCase()) || (c.subject || '').toLowerCase().includes(contentSearch.toLowerCase())) &&
                                            (contentTypeFilter === 'all' || c.type === contentTypeFilter)
                                        ))).length > 0 ? content.filter(c => (
                                            (!contentSearch || (c.title || '').toLowerCase().includes(contentSearch.toLowerCase()) || (c.subject || '').toLowerCase().includes(contentSearch.toLowerCase())) &&
                                            (contentTypeFilter === 'all' || c.type === contentTypeFilter)
                                        )).map((c) => (
                                            <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                                <td style={{ padding: '16px' }}>{c.title}</td>
                                                <td style={{ padding: '16px', color: '#a1a1aa' }}>{c.subject}</td>
                                                <td style={{ padding: '16px' }}>{c.type}</td>
                                                <td style={{ padding: '16px' }}><a href={c.url} target="_blank" rel="noreferrer" style={{ color: '#818cf8' }}>Open</a></td>
                                                <td style={{ padding: '16px', color: '#a1a1aa' }}>{c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}</td>
                                                <td style={{ padding: '16px' }}>
                                                    <button onClick={() => handleDeleteContent(c.id)} style={{ padding: '6px 10px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#52525b' }}>No content added</td></tr>
                                        )}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tests' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                                    <input value={newTest.name} onChange={e => setNewTest({ ...newTest, name: e.target.value })} placeholder="Test Name" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input value={newTest.subject} onChange={e => setNewTest({ ...newTest, subject: e.target.value })} placeholder="Subject" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input type="datetime-local" value={newTest.date} onChange={e => setNewTest({ ...newTest, date: e.target.value })} style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input type="number" min="1" value={newTest.duration} onChange={e => setNewTest({ ...newTest, duration: e.target.value })} placeholder="Duration (mins)" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <button onClick={handleAddTest} style={{ padding: '12px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700' }}>Add Test</button>
                                </div>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '16px', paddingTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                                    <input value={newPdf.name} onChange={e => setNewPdf({ ...newPdf, name: e.target.value })} placeholder="PDF Test Name" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input value={newPdf.subject} onChange={e => setNewPdf({ ...newPdf, subject: e.target.value })} placeholder="Subject" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input type="datetime-local" value={newPdf.date} onChange={e => setNewPdf({ ...newPdf, date: e.target.value })} style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input type="number" min="1" value={newPdf.duration} onChange={e => setNewPdf({ ...newPdf, duration: Number(e.target.value) })} placeholder="Duration (mins)" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input type="file" accept="application/pdf" onChange={e => setNewPdf({ ...newPdf, file: e.target.files?.[0] || null })} style={{ padding: '10px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: '#a1a1aa' }} />
                                    <button onClick={handleGenerateFromPdf} style={{ padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700' }}>Generate Test from PDF</button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginTop: '12px' }}>
                                    <input value={testsSearch} onChange={e => setTestsSearch(e.target.value)} placeholder="Search by name or subject" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                </div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                <div style={{ width: '100%', overflowX: 'auto' }}>
                                <table style={{ width: '100%', minWidth: '1100px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <th style={{ padding: '16px' }}>Name</th>
                                            <th style={{ padding: '16px' }}>Subject</th>
                                            <th style={{ padding: '16px' }}>Schedule</th>
                                            <th style={{ padding: '16px' }}>Visible</th>
                                            <th style={{ padding: '16px' }}>Duration</th>
                                            <th style={{ padding: '16px' }}>Status</th>
                                            <th style={{ padding: '16px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(tests.filter(t => (
                                            !testsSearch || (t.name || '').toLowerCase().includes(testsSearch.toLowerCase()) || (t.subject || '').toLowerCase().includes(testsSearch.toLowerCase())
                                        ))).length > 0 ? tests.filter(t => (
                                            !testsSearch || (t.name || '').toLowerCase().includes(testsSearch.toLowerCase()) || (t.subject || '').toLowerCase().includes(testsSearch.toLowerCase())
                                        )).map((t) => (
                                            <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                                <td style={{ padding: '16px' }}>{t.name}</td>
                                                <td style={{ padding: '16px', color: '#a1a1aa' }}>{t.subject}</td>
                                                <td style={{ padding: '16px', color: '#a1a1aa' }}>{t.scheduledAt ? new Date(t.scheduledAt).toLocaleString() : 'Not set'}</td>
                                                <td style={{ padding: '16px', color: '#a1a1aa' }}>{t.visibleFrom && t.visibleUntil ? `${new Date(t.visibleFrom).toLocaleString()} → ${new Date(t.visibleUntil).toLocaleString()}` : '—'}</td>
                                                <td style={{ padding: '16px' }}>{t.duration} mins</td>
                                                <td style={{ padding: '16px' }}>
                                                    <span style={{ padding: '4px 8px', borderRadius: '4px', background: t.published ? 'rgba(16,185,129,0.12)' : 'rgba(244,63,94,0.12)', color: t.published ? '#10b981' : '#f43f5e', fontSize: '0.8rem' }}>{t.published ? 'Published' : 'Draft'}</span>
                                                </td>
                                                <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                                                    <button onClick={() => handleToggleTestPublish(t.id)} style={{ marginRight: '8px', padding: '6px 10px', background: 'rgba(129,140,248,0.15)', color: '#818cf8', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>{t.published ? 'Unpublish' : 'Publish'}</button>
                                                    <button onClick={() => handleMakeLiveOneDay(t.id)} style={{ marginRight: '8px', padding: '6px 10px', background: 'rgba(16,185,129,0.15)', color: '#10b981', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Live 1 Day</button>
                                                    <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/attempt-test/${t.id}`); }} style={{ marginRight: '8px', padding: '6px 10px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Copy Link</button>
                                                    <button onClick={() => handleDeleteTest(t.id)} style={{ padding: '6px 10px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#52525b' }}>No tests added</td></tr>
                                        )}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                                    <input value={newNotification.title} onChange={e => setNewNotification({ ...newNotification, title: e.target.value })} placeholder="Title" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <textarea value={newNotification.message} onChange={e => setNewNotification({ ...newNotification, message: e.target.value })} placeholder="Message" rows="2" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white', resize: 'vertical' }} />
                                    <button onClick={handleAddNotification} style={{ padding: '12px', background: '#818cf8', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700' }}>Add Notification</button>
                                </div>
                            </div>
                            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <span style={{ color: '#a1a1aa', fontSize: '0.95rem' }}>Filter</span>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <select value={notificationsFilter} onChange={(e) => setNotificationsFilter(e.target.value)} style={{ padding: '10px 12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }}>
                                        <option value="all">All</option>
                                        <option value="unread">Unread</option>
                                        <option value="read">Read</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                <div style={{ width: '100%', overflowX: 'auto' }}>
                                <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <th style={{ padding: '16px' }}>Time</th>
                                            <th style={{ padding: '16px' }}>Title</th>
                                            <th style={{ padding: '16px' }}>Message</th>
                                            <th style={{ padding: '16px' }}>Status</th>
                                            <th style={{ padding: '16px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(notifications.filter(n => notificationsFilter === 'all' || (notificationsFilter === 'unread' ? !n.read : n.read))).length > 0 ? notifications.filter(n => notificationsFilter === 'all' || (notificationsFilter === 'unread' ? !n.read : n.read)).map((n) => (
                                            <tr key={n.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                                <td style={{ padding: '16px', color: '#a1a1aa' }}>{n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}</td>
                                                <td style={{ padding: '16px' }}>{n.title}</td>
                                                <td style={{ padding: '16px', color: '#a1a1aa' }}>{n.message}</td>
                                                <td style={{ padding: '16px' }}>
                                                    <span style={{ padding: '4px 8px', borderRadius: '4px', background: !n.read ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)', color: !n.read ? '#f59e0b' : '#10b981', fontSize: '0.8rem' }}>{n.read ? 'Read' : 'Unread'}</span>
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    {!n.read && <button onClick={() => handleMarkNotificationRead(n.id)} style={{ marginRight: '8px', padding: '6px 10px', background: 'rgba(129,140,248,0.15)', color: '#818cf8', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Mark Read</button>}
                                                    <button onClick={() => handleDeleteNotification(n.id)} style={{ padding: '6px 10px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#52525b' }}>No notifications</td></tr>
                                        )}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'billing' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                            <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                                    <input value={newPlan.name} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} placeholder="Plan Name" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input type="number" min="0" value={newPlan.price} onChange={e => setNewPlan({ ...newPlan, price: e.target.value })} placeholder="Price" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <input value={newPlan.features} onChange={e => setNewPlan({ ...newPlan, features: e.target.value })} placeholder="Features (comma separated)" style={{ padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }} />
                                    <button onClick={handleAddPlan} style={{ padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700' }}>Add Plan</button>
                                </div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <th style={{ padding: '16px' }}>Plan</th>
                                            <th style={{ padding: '16px' }}>Price</th>
                                            <th style={{ padding: '16px' }}>Features</th>
                                            <th style={{ padding: '16px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plans.length > 0 ? plans.map((p) => (
                                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                                <td style={{ padding: '16px' }}>{p.name}</td>
                                                <td style={{ padding: '16px', color: '#a1a1aa' }}>₹{(p.price || 0).toFixed(2)}</td>
                                                <td style={{ padding: '16px' }}>{Array.isArray(p.features) ? p.features.join(', ') : ''}</td>
                                                <td style={{ padding: '16px' }}>
                                                    <button onClick={() => handleDeletePlan(p.id)} style={{ padding: '6px 10px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#52525b' }}>No plans</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contacts' && (
                        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                            <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: '600', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <span>Contact Submissions</span>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <select value={contactFilter} onChange={(e) => { setContactFilter(e.target.value); setContactPage(1); }} style={{ padding: '8px 12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }}>
                                        <option value="all">All</option>
                                        <option value="open">Open</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        <button onClick={() => setContactPage(p => Math.max(1, p - 1))} className="btn-reset" style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', color: 'white' }}>Prev</button>
                                        <span style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>{(() => { const filtered = contacts.filter(c => contactFilter === 'all' || (contactFilter === 'open' ? (c.status !== 'resolved') : c.status === 'resolved')); const total = Math.max(1, Math.ceil(filtered.length / contactPageSize)); const current = Math.min(contactPage, total); return `Page ${current} of ${total}`; })()}</span>
                                        <button onClick={() => setContactPage(p => { const total = Math.max(1, Math.ceil(contacts.filter(c => contactFilter === 'all' || (contactFilter === 'open' ? (c.status !== 'resolved') : c.status === 'resolved')).length / contactPageSize)); return Math.min(total, p + 1); })} className="btn-reset" style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', color: 'white' }}>Next</button>
                                    </div>
                                    <button onClick={exportContactsCSV} style={{ padding: '8px 12px', background: 'rgba(129,140,248,0.15)', color: '#818cf8', border: '1px solid rgba(129,140,248,0.2)', borderRadius: '8px', fontWeight: '600' }}>Export CSV</button>
                                </div>
                            </div>
                            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                <div style={{ width: '100%', overflowX: 'auto' }}>
                                <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#09090b', zIndex: 10 }}>
                                        <tr style={{ color: '#a1a1aa', textAlign: 'left' }}>
                                            <th style={{ padding: '12px 16px' }}>Time</th>
                                            <th style={{ padding: '12px 16px' }}>Name</th>
                                            <th style={{ padding: '12px 16px' }}>Email</th>
                                            <th style={{ padding: '12px 16px' }}>Type</th>
                                            <th style={{ padding: '12px 16px' }}>Message</th>
                                            <th style={{ padding: '12px 16px' }}>Status</th>
                                            <th style={{ padding: '12px 16px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(() => {
                                            const filtered = contacts.filter(c => contactFilter === 'all' || (contactFilter === 'open' ? (c.status !== 'resolved') : c.status === 'resolved'));
                                            const totalPages = Math.max(1, Math.ceil(filtered.length / contactPageSize));
                                            const currentPage = Math.min(contactPage, totalPages);
                                            const pageItems = filtered.slice((currentPage - 1) * contactPageSize, currentPage * contactPageSize);
                                            if (pageItems.length === 0) return (
                                                <tr><td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#52525b' }}>No contacts yet</td></tr>
                                            );
                                            return pageItems.map((c) => (
                                            <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                                <td style={{ padding: '12px 16px', color: '#a1a1aa' }}>{c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}</td>
                                                <td style={{ padding: '12px 16px' }}>{[c.firstName, c.lastName].filter(Boolean).join(' ')}</td>
                                                <td style={{ padding: '12px 16px', color: '#a1a1aa' }}>{c.email}</td>
                                                <td style={{ padding: '12px 16px' }}>{c.queryType || 'General'}</td>
                                                <td style={{ padding: '12px 16px', color: '#a1a1aa', maxWidth: '400px' }}>{c.message}</td>
                                                <td style={{ padding: '12px 16px' }}>
                                                    <span style={{ padding: '4px 8px', borderRadius: '4px', background: c.status === 'resolved' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: c.status === 'resolved' ? '#10b981' : '#f59e0b', fontSize: '0.8rem' }}>{c.status === 'resolved' ? 'Resolved' : 'Open'}</span>
                                                </td>
                                                <td style={{ padding: '12px 16px' }}>
                                                    <button onClick={() => handleToggleContactStatus(c.id)} style={{ marginRight: '8px', padding: '6px 10px', background: 'rgba(129,140,248,0.15)', color: '#818cf8', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>{c.status === 'resolved' ? 'Reopen' : 'Resolve'}</button>
                                                    <button onClick={() => handleDeleteContact(c.id)} style={{ padding: '6px 10px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                                                </td>
                                            </tr>
                                            ));
                                        })()}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'audit' && (
                        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                            <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: '600' }}>Recent System Events</div>
                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#09090b', zIndex: 10 }}>
                                        <tr style={{ color: '#a1a1aa', textAlign: 'left' }}>
                                            <th style={{ padding: '12px 16px' }}>Time</th>
                                            <th style={{ padding: '12px 16px' }}>Event</th>
                                            <th style={{ padding: '12px 16px' }}>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ...loginLogs.map(l => ({ t: l.isoDate || l.timestamp, time: l.isoDate ? new Date(l.isoDate).toLocaleString() : l.time, event: 'Login', details: l.user ? l.user.email : 'Unknown' })),
                                            ...activities.map(a => ({ t: a.isoDate || a.timestamp, time: a.isoDate ? new Date(a.isoDate).toLocaleString() : a.time, event: 'Visit', details: a.page }))
                                        ]
                                        .sort((a,b) => new Date(b.t) - new Date(a.t))
                                        .slice(0, 50)
                                        .map((row, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                                <td style={{ padding: '12px 16px', color: '#a1a1aa' }}>{row.time}</td>
                                                <td style={{ padding: '12px 16px' }}>{row.event}</td>
                                                <td style={{ padding: '12px 16px', color: '#a1a1aa' }}>{row.details}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    

                    {/* CONTROL TAB */}
                    {activeTab === 'control' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                            <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}><Zap size={24} color="#f59e0b" /> Site Configuration</h3>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: '#a1a1aa' }}>Global Announcement Bar</label>
                                    <input
                                        type="text"
                                        value={siteConfig.announcement}
                                        onChange={(e) => handleConfigChange('announcement', e.target.value)}
                                        placeholder="Enter urgent message for all users..."
                                        style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }}
                                    />
                                    <p style={{ fontSize: '0.8rem', color: '#52525b', marginTop: '4px' }}>Will appear at the top of the Home page.</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#ef4444' }}>Maintenance Mode</div>
                                        <div style={{ fontSize: '0.85rem', color: '#fca5a5' }}>Disable access for all users</div>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" checked={siteConfig.maintenanceMode} onChange={(e) => handleConfigChange('maintenanceMode', e.target.checked)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>

                            <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}><Settings size={24} color="#818cf8" /> Platform Features</h3>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>New Registrations</div>
                                        <div style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Allow new users to sign up</div>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" checked={siteConfig.allowRegistration !== false} onChange={(e) => handleConfigChange('allowRegistration', e.target.checked)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>Show Leaderboard</div>
                                        <div style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Publicly visible rankings</div>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" checked={siteConfig.showLeaderboard !== false} onChange={(e) => handleConfigChange('showLeaderboard', e.target.checked)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>Email Alerts</div>
                                        <div style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Receive daily summary reports</div>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" checked={siteConfig.emailAlerts || false} onChange={(e) => handleConfigChange('emailAlerts', e.target.checked)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                <button onClick={() => {
                                    const csvContent = "data:text/csv;charset=utf-8," + "AdmissionID,Name,Email,Phone,Target,Grade,School,City,JoinDate\n" + users.map(u => `${u.admissionId || 'N/A'},${u.name},${u.email},${u.phone || ''},${u.educationDetails?.targetExam || ''},${u.educationDetails?.grade || ''},${u.educationDetails?.schoolName || ''},${u.educationDetails?.city || ''},${u.joinDate}`).join("\n");
                                    const encodedUri = encodeURI(csvContent);
                                    const link = document.createElement("a");
                                    link.setAttribute("href", encodedUri);
                                    link.setAttribute("download", "digimentors_users.csv");
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }} style={{ width: '100%', padding: '14px', background: 'rgba(129, 140, 248, 0.1)', color: '#818cf8', border: '1px solid rgba(129, 140, 248, 0.2)', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <FileText size={18} /> Export User Data (CSV)
                                </button>
                            </div>

                            {/* Admin Access Management */}
                            <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}><Shield size={24} color="#22c55e" /> Admin Access</h3>
                                <p style={{ color: '#a1a1aa', marginBottom: '16px' }}>Add or remove admin emails who can access this panel.</p>

                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                    <input
                                        type="email"
                                        placeholder="Enter admin email"
                                        value={newAdminEmail}
                                        onChange={(e) => setNewAdminEmail(e.target.value)}
                                        style={{ flex: 1, padding: '12px', background: '#000', border: '1px solid #333', borderRadius: '8px', color: 'white' }}
                                    />
                                    <button
                                        onClick={() => {
                                            const email = newAdminEmail.trim().toLowerCase();
                                            if (!email) return;
                                            const current = Array.isArray(siteConfig.adminEmails) ? siteConfig.adminEmails : [];
                                            if (current.includes(email)) { setNewAdminEmail(''); return; }
                                            const updated = [...current, email];
                                            handleConfigChange('adminEmails', updated);
                                            setNewAdminEmail('');
                                        }}
                                        className="btn-reset"
                                        style={{ padding: '12px 16px', background: '#22c55e', color: 'white', borderRadius: '8px', fontWeight: '600' }}
                                    >
                                        Add
                                    </button>
                                </div>

                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                                    {(siteConfig.adminEmails || []).length === 0 ? (
                                        <div style={{ color: '#52525b' }}>No admin emails added yet.</div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {(siteConfig.adminEmails || []).map((email) => (
                                                <div key={email} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px 12px', borderRadius: '8px' }}>
                                                    <span style={{ fontFamily: 'monospace' }}>{email}</span>
                                                    <button
                                                        onClick={() => {
                                                            const current = Array.isArray(siteConfig.adminEmails) ? siteConfig.adminEmails : [];
                                                            const updated = current.filter(e => e !== email);
                                                            handleConfigChange('adminEmails', updated);
                                                        }}
                                                        style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Selected User Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedUser(null)}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ width: '90%', maxWidth: '500px', background: '#18181b', borderRadius: '24px', border: '1px solid #333', padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>User Profile</h2>
                                <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700' }}>{selectedUser.name?.[0]}</div>
                                <h3 style={{ fontSize: '1.25rem' }}>{selectedUser.name}</h3>
                                {(selectedUser.admissionId) && <div style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '100px', display: 'inline-block', fontSize: '0.8rem', margin: '8px 0', fontFamily: 'monospace' }}>ID: {selectedUser.admissionId}</div>}
                                <div style={{ color: '#a1a1aa' }}>{selectedUser.email}</div>
                                {selectedUser.phone && <div style={{ color: '#818cf8', fontWeight: '600', marginTop: '4px' }}>{selectedUser.phone}</div>}
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#a1a1aa' }}>Join Date</span>
                                    <span>{selectedUser.joinDate}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#a1a1aa' }}>Target</span>
                                    <span>{selectedUser.educationDetails?.targetExam || 'N/A'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#a1a1aa' }}>Class / Grade</span>
                                    <span>{selectedUser.educationDetails?.grade || 'N/A'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#a1a1aa' }}>School</span>
                                    <span>{selectedUser.educationDetails?.schoolName || 'N/A'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#a1a1aa' }}>City</span>
                                    <span>{selectedUser.educationDetails?.city || 'N/A'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#a1a1aa' }}>Last Login</span>
                                    <span>{selectedUser.lastLogin || 'Unknown'}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .hover\\:bg-white\\/5:hover { background: rgba(255,255,255,0.05); }
                /* Toggle Switch */
                .switch { position: relative; display: inline-block; width: 50px; height: 26px; }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #3f3f46; transition: .4s; border-radius: 34px; }
                .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
                input:checked + .slider { background-color: #ef4444; }
                input:checked + .slider:before { transform: translateX(24px); }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
