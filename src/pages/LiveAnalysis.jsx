
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart2, PieChart, Activity, Clock,
    Target, AlertCircle, ChevronDown, Download, Share2, Menu, X
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { realQuestions } from '../data/realQuestions';

const LiveAnalysis = () => {
    const location = useLocation();
    const result = location.state?.result;

    // Use passed result if available
    const overviewData = result ? {
        totalScore: result.score,
        maxScore: result.maxScore,
        rank: result.score > 200 ? 142 : 1245, // Mock rank for now
        totalStudents: 15420,
        accuracy: result.accuracy,
        timeSpent: result.timeSpent
    } : {
        // Fallback Mock
        totalScore: 0,
        maxScore: 0,
        rank: 0,
        totalStudents: 0,
        accuracy: 0,
        timeSpent: "00:00"
    };

    // Responsive State
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // Use detailed subject analysis if available, else empty or mock
    const subjectData = result?.subjectAnalysis || [];

    const [activeTab, setActiveTab] = useState('overview');
    const [expandedSolutionId, setExpandedSolutionId] = useState(null);

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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <div className="academic-badge" style={{ marginBottom: '1rem', background: '#22c55e', color: 'black', fontWeight: '800' }}>LIVE RESULT</div>
                        <h1 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Full Syllabus Mock #04</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Attempted on {new Date().toLocaleDateString()}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: isMobile ? 'column' : 'row' }}>
                        <button className="glass-card btn-reset" style={{ padding: '12px 20px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', width: isMobile ? '100%' : 'auto' }}>
                            <Share2 size={18} /> Share Result
                        </button>
                        <button className="btn-reset" style={{ padding: '12px 24px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: '600', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', width: isMobile ? '100%' : 'auto' }}>
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

                {/* Subject Analysis Tab */}
                {activeTab === 'subject' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '2rem', fontWeight: '700' }}>Detailed Subject Performance</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {subjectData.map((sub) => (
                                <div key={sub.subject} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span style={{ fontWeight: '700', fontSize: '1.2rem', color: sub.color }}>{sub.subject}</span>
                                        <span style={{ fontWeight: '700', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.9rem' }}>{sub.score}/{sub.max}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            <span>Accuracy</span>
                                            <span style={{ color: 'white' }}>{sub.accuracy}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                                            <div style={{ width: `${sub.accuracy}%`, height: '100%', background: sub.color, borderRadius: '100px' }}></div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            <span>Time Spent</span>
                                            <span style={{ color: 'white' }}>{sub.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Time Management Tab */}
                {activeTab === 'time' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '2rem', fontWeight: '700' }}>Time Management Analysis</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textAlign: 'left' }}>
                                        <th style={{ padding: '12px' }}>Question</th>
                                        <th style={{ padding: '12px' }}>Status</th>
                                        <th style={{ padding: '12px' }}>Time Taken</th>
                                        <th style={{ padding: '12px' }}>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result?.questionData?.map((q, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '12px', fontWeight: '600' }}>Q{idx + 1}</td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{
                                                    padding: '4px 10px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '600',
                                                    background: q.isAttempted ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.05)',
                                                    color: q.isAttempted ? '#60a5fa' : 'var(--text-muted)'
                                                }}>
                                                    {q.isAttempted ? 'Attempted' : 'Skipped'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{ color: q.timeTaken > 120 ? '#ef4444' : q.timeTaken > 60 ? '#f59e0b' : '#10b981', fontWeight: '600' }}>
                                                    {q.timeTaken}s
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                {q.isAttempted ? (
                                                    q.isCorrect ? <span style={{ color: '#22c55e' }}>Correct (+4)</span> : <span style={{ color: '#ef4444' }}>Wrong (-1)</span>
                                                ) : <span style={{ color: 'var(--text-muted)' }}>-</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Solutions Tab */}
                {activeTab === 'solutions' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ marginBottom: '1rem' }}>Question Paper & Solutions</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Filter by subject or question type to view detailing step-by-step solutions.</p>
                        </div>
                        {result?.questionData ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
                                {result.questionData.map((q, idx) => (
                                    <div key={q.id || idx} style={{ padding: isMobile ? '1rem' : '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                            <span style={{ fontWeight: '700', color: 'var(--primary)' }}>Q{idx + 1}.</span>
                                            <div>{q.text}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                                            <span style={{ color: '#22c55e', fontWeight: '600' }}>
                                                Correct: {q.options.find(o => o.id === q.correctAnswer)?.text || q.correctAnswer}
                                            </span>
                                            <span style={{ color: 'var(--text-muted)' }}>|</span>
                                            <span style={{ color: q.isCorrect ? '#22c55e' : q.isAttempted ? '#ef4444' : 'var(--text-muted)', fontWeight: '600' }}>
                                                Your Answer: {q.isAttempted ? (q.options.find(o => o.id === q.userAnswer)?.text || q.userAnswer) : 'Not Attempted'}
                                            </span>
                                            <span style={{ color: 'var(--text-muted)' }}>|</span>
                                            <span style={{ color: 'var(--text-muted)' }}>Time: {q.timeTaken}s</span>
                                        </div>
                                        <button
                                            onClick={() => setExpandedSolutionId(expandedSolutionId === (q.id || idx) ? null : (q.id || idx))}
                                            className="btn-reset"
                                            style={{
                                                marginTop: '1rem', fontSize: '0.9rem', color: expandedSolutionId === (q.id || idx) ? '#60a5fa' : 'var(--text-muted)',
                                                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
                                                padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', width: 'fit-content'
                                            }}
                                        >
                                            {expandedSolutionId === (q.id || idx) ? 'Hide Solution' : 'View Solution'}
                                            <ChevronDown size={14} style={{ transform: expandedSolutionId === (q.id || idx) ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                                        </button>

                                        {expandedSolutionId === (q.id || idx) && (
                                            <div style={{ padding: '10px 0' }}>
                                                <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.95rem', lineHeight: '1.7', color: '#e4e4e7' }}>
                                                    <strong style={{ display: 'block', marginBottom: '0.8rem', color: '#a5b4fc', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Step-by-Step Explanation</strong>
                                                    {q.explanation || realQuestions.find(rq => rq.id === q.originalId)?.explanation || 'Detailed solution not available for this question.'}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ color: 'var(--text-muted)' }}>No detailed question data available.</div>
                        )}
                    </motion.div>
                )}
            </div>
        </div >
    );
};

export default LiveAnalysis;
