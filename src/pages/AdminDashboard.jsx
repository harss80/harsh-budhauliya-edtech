import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users, BarChart2, Globe, Settings, Search,
    TrendingUp, UserCheck, Clock, Shield
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('students');
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        // Load mock data + current local user
        const mockLeads = [
            { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", mobile: "9876543210", class: "Class 12", exam: "JEE", score: "85%", status: "Active" },
            { id: 2, name: "Priya Singh", email: "priya@yahoo.com", mobile: "8765432109", class: "Dropper", exam: "NEET", score: "92%", status: "Active" },
            { id: 3, name: "Amit Verma", email: "amit.v@outlook.com", mobile: "7654321098", class: "Class 11", exam: "JEE", score: "78%", status: "Inactive" },
        ];

        // Check for local user
        const localUser = localStorage.getItem('digimentors_user_profile');
        if (localUser) {
            const parsed = JSON.parse(localUser);
            mockLeads.unshift({
                id: Date.now(),
                name: parsed.name,
                email: parsed.email,
                mobile: parsed.mobile,
                class: parsed.className,
                exam: parsed.exam,
                score: "N/A",
                status: "Online Now"
            });
        }
        setLeads(mockLeads);
    }, []);

    const TabButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                width: '100%',
                background: activeTab === id ? 'var(--primary)' : 'transparent',
                color: activeTab === id ? 'white' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: '8px',
                transition: 'all 0.2s',
                fontWeight: activeTab === id ? '600' : '500'
            }}
        >
            <Icon size={20} />
            {label}
        </button>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0b10', color: 'white' }}>
            {/* Sidebar */}
            <div style={{ width: '280px', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '3rem', paddingLeft: '12px' }}>
                    <div className="academic-badge" style={{ marginBottom: '10px' }}>ADMINISTRATOR</div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Control Center</h2>
                </div>

                <nav style={{ flex: 1 }}>
                    <TabButton id="students" icon={Users} label="Student Database" />
                    <TabButton id="analytics" icon={BarChart2} label="Traffic & Analytics" />
                    <TabButton id="seo" icon={Globe} label="SEO & Metadata" />
                    <TabButton id="settings" icon={Settings} label="System Settings" />
                </nav>

                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>System Healthy</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>v2.4.0 (Stable)</div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {activeTab === 'students' && 'Student Management'}
                        {activeTab === 'analytics' && 'Performance Metrics'}
                        {activeTab === 'seo' && 'SEO Configuration'}
                        {activeTab === 'settings' && 'Global Settings'}
                    </h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Global Search..."
                                style={{
                                    padding: '12px 12px 12px 44px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '100px',
                                    color: 'white',
                                    outline: 'none',
                                    width: '300px'
                                }}
                            />
                        </div>
                        <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Shield size={24} color="white" />
                        </div>
                    </div>
                </header>

                {/* Students Tab */}
                {activeTab === 'students' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                                        <th style={{ padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>STUDENT NAME</th>
                                        <th style={{ padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CONTACT</th>
                                        <th style={{ padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CLASS / EXAM</th>
                                        <th style={{ padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>DIAGNOSTIC SCORE</th>
                                        <th style={{ padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((lead) => (
                                        <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '20px', fontWeight: '600' }}>{lead.name}</td>
                                            <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                                                <div>{lead.email}</div>
                                                <div style={{ fontSize: '0.8rem' }}>{lead.mobile}</div>
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', marginRight: '6px' }}>{lead.class}</span>
                                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>{lead.exam}</span>
                                            </td>
                                            <td style={{ padding: '20px', fontWeight: '700' }}>{lead.score}</td>
                                            <td style={{ padding: '20px' }}>
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                    color: lead.status.includes('Active') || lead.status.includes('Online') ? '#22c55e' : '#94a3b8',
                                                    fontSize: '0.85rem', fontWeight: '600'
                                                }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                                                    {lead.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Total Visits</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>124,592</div>
                                <div style={{ color: '#22c55e', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={16} /> +12.5% this week</div>
                            </div>
                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Lead Conv. Rate</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>4.8%</div>
                                <div style={{ color: '#22c55e', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={16} /> +0.8% this week</div>
                            </div>
                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Active Students</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>8,420</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Currently Online</div>
                            </div>
                        </div>
                        <div className="glass-card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                            [ Detailed Traffic Chart Visualization Placeholder ]
                        </div>
                    </motion.div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Meta Title</label>
                                <input type="text" defaultValue="Digimentors | Premier Institute for JEE & NEET" style={adminInputStyle} />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Meta Description</label>
                                <textarea defaultValue="Join India's leading EdTech platform. Expert faculty, AI-driven diagnostics, and personalized learning paths for JEE, NEET, and Foundation." style={{ ...adminInputStyle, minHeight: '100px' }} />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Keywords (Comma Separated)</label>
                                <input type="text" defaultValue="JEE, NEET, Physics, Chemistry, IIT, AIIMS, Online Coaching" style={adminInputStyle} />
                            </div>
                            <button className="btn-reset" style={{ padding: '12px 24px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: '600' }}>Save SEO Configuration</button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const adminInputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'white',
    outline: 'none',
    fontSize: '0.95rem'
};

export default AdminDashboard;
