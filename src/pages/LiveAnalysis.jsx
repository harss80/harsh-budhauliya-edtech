
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart2, PieChart, Activity, Clock,
    Target, AlertCircle, ChevronDown, Download, Share2
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const LiveAnalysis = () => {
    const location = useLocation();
    const result = location.state?.result;

    // Use passed result if available, otherwise fallback to mock
    const overviewData = result ? {
        totalScore: result.score,
        maxScore: result.maxScore,
        rank: result.score > 200 ? 142 : 1245,
        totalStudents: 15420,
        accuracy: result.accuracy,
        timeSpent: result.timeSpent
    } : {
        totalScore: 180,
        maxScore: 300,
        rank: 452,
        totalStudents: 15420,
        accuracy: 78,
        timeSpent: "2h 45m"
    };

    const subjectData = [
        { subject: "Physics", score: Math.round(overviewData.totalScore * 0.35), max: 100, accuracy: 82, time: "55m", color: "#f59e0b" },
        { subject: "Chemistry", score: Math.round(overviewData.totalScore * 0.45), max: 100, accuracy: 88, time: "45m", color: "#10b981" },
        { subject: "Mathematics", score: Math.round(overviewData.totalScore * 0.20), max: 100, accuracy: 60, time: "65m", color: "#6366f1" }
    ];

    const [activeTab, setActiveTab] = useState('overview');

    const TabButton = ({ id, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className="btn-reset"
            style={{
                padding: '12px 24px',
                borderBottom: activeTab === id ? '2px solid var(--primary)' : '2px solid transparent',
                color: activeTab === id ? 'white' : 'var(--text-muted)',
                fontWeight: '600',
                transition: 'all 0.2s'
            }}
        >
            {label}
        </button>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <div className="academic-badge" style={{ marginBottom: '1rem', background: '#22c55e', color: 'black', fontWeight: '800' }}>LIVE RESULT</div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Full Syllabus Mock #04</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Attempted on {new Date().toLocaleDateString()}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="glass-card btn-reset" style={{ padding: '12px 20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <Share2 size={18} /> Share Result
                        </button>
                        <button className="btn-reset" style={{ padding: '12px 24px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: '600', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <Download size={18} /> Download Report
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '3rem', display: 'flex', gap: '1rem', overflowX: 'auto' }}>
                    <TabButton id="overview" label="Score Overview" />
                    <TabButton id="subject" label="Subject Analysis" />
                    <TabButton id="time" label="Time Management" />
                    <TabButton id="solutions" label="Question Paper & Solutions" />
                </div>

                {/* Overview Content */}
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        {/* Score Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Total Score</div>
                                <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1', marginBottom: '5px' }}>
                                    {overviewData.totalScore}<span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/{overviewData.maxScore}</span>
                                </div>
                                <div style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: '600' }}>Great Job! Top 5%</div>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>All India Rank</div>
                                <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1', marginBottom: '5px', color: '#f59e0b' }}>
                                    {overviewData.rank}
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>out of {overviewData.totalStudents}</div>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Accuracy</div>
                                <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1', marginBottom: '5px', color: '#6366f1' }}>
                                    {overviewData.accuracy}%
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>14 Negative Marks</div>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Time Taken</div>
                                <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1', marginBottom: '5px' }}>
                                    {overviewData.timeSpent}
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Avg 1.8 min/quest</div>
                            </div>
                        </div>

                        {/* Subject Breakdown */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '2rem', fontWeight: '700' }}>Subject Performance</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {subjectData.map((sub) => (
                                        <div key={sub.subject}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span style={{ fontWeight: '600' }}>{sub.subject}</span>
                                                <span style={{ fontWeight: '700', color: sub.color }}>{sub.score}/{sub.max}</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                                                <div style={{ width: `${(sub.score / sub.max) * 100}%`, height: '100%', background: sub.color, borderRadius: '100px' }}></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                <span>Accuracy: {sub.accuracy}%</span>
                                                <span>Time: {sub.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, rgba(30, 32, 40, 0.6), rgba(21, 23, 30, 0.8))' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <PieChart size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <h3 style={{ marginBottom: '1rem' }}>Detailed Analytics</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                        View deeper insights including topic-wise strength analysis and difficulty-wise performance breakdown.
                                    </p>
                                    <button className="btn-reset" style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', fontWeight: '600' }}>
                                        View Full Analytics
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Solutions Tab (Placeholder) */}
                {activeTab === 'solutions' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ marginBottom: '1rem' }}>Question Paper & Solutions</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Filter by subject or question type to view detailing step-by-step solutions.</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                            {[1, 2, 3, 4, 5].map(q => (
                                <div key={q} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                        <span style={{ fontWeight: '700', color: 'var(--primary)' }}>Q{q}.</span>
                                        <p>A particle moves along a straight line such that its displacement at any time t is given by s = t³ - 6t² + 3t + 4 meters.</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                                        <span style={{ color: '#22c55e', fontWeight: '600' }}>Correct Answer: 12 m/s</span>
                                        <span style={{ color: 'var(--text-muted)' }}>|</span>
                                        <span style={{ color: '#ef4444', fontWeight: '600' }}>Your Answer: 10 m/s</span>
                                    </div>
                                    <button className="btn-reset" style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        View Solution <ChevronDown size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default LiveAnalysis;
