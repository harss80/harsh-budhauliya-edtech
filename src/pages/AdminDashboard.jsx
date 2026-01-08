
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, Activity, BookOpen, Settings,
    Search, Bell, ChevronDown, MapPin, Smartphone,
    Globe, Clock, TrendingUp, DollarSign, Shield, LogOut, Menu, X,
    FileText, Zap, AlertTriangle, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
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

const getAllUsers = () => {
    const users = JSON.parse(localStorage.getItem('digimentors_users') || '[]');
    // Sort by join date desc (if available) or push valid ones
    return users.reverse();
};

const getRecentActivity = () => {
    return JSON.parse(localStorage.getItem('digimentors_recent_activities') || '[]');
};

const getSiteConfig = () => {
    return JSON.parse(localStorage.getItem('digimentors_site_config') || '{"maintenanceMode": false, "announcement": ""}');
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

    // Data State
    const [stats, setStats] = useState(getSystemStats());
    const [users, setUsers] = useState(getAllUsers());
    const [activities, setActivities] = useState(getRecentActivity());
    const [siteConfig, setSiteConfig] = useState(getSiteConfig());
    const [selectedUser, setSelectedUser] = useState(null);

    // Search
    const [searchTerm, setSearchTerm] = useState('');

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

    // Live Refresh
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(getSystemStats());
            setUsers(getAllUsers());
            setActivities(getRecentActivity());
            setSiteConfig(getSiteConfig());
        }, 3000); // Poll every 3 seconds for "Live" feel
        return () => clearInterval(interval);
    }, []);

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
    };

    // Filtered Users
    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Components ---

    const SidebarItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => { setActiveTab(id); if (isMobile) setSidebarOpen(false); }}
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

                <div style={{ padding: '16px', flex: 1 }}>
                    <SidebarItem id="dashboard" icon={LayoutDashboard} label="Overview" />
                    <SidebarItem id="analytics" icon={TrendingUp} label="Detailed Analytics" />
                    <SidebarItem id="admissions" icon={Users} label="Admissions" />
                    <SidebarItem id="users" icon={FileText} label="User Management" />
                    <SidebarItem id="live" icon={Activity} label="Live Traffic" />
                    <SidebarItem id="control" icon={Settings} label="Site Control" />
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
                                            <td style={{ padding: '16px', color: '#a1a1aa' }}>{u.phone || 'N/A'}</td>
                                            <td style={{ padding: '16px', color: '#a1a1aa' }}>{u.email}</td>
                                            <td style={{ padding: '16px' }}>
                                                {u.educationDetails ? (
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
