
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_BASE } from '../utils/apiBase';
import {
    FileText, CheckCircle, XCircle, AlertCircle,
    Clock, ChevronRight, BarChart2, PlayCircle,
    Filter, Search, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentTestHistory = () => {
    const [filter, setFilter] = useState('All');

    const [testHistory, setTestHistory] = useState([]);

    useEffect(() => {
        const fallback = () => {
            const history = JSON.parse(localStorage.getItem('digimentors_test_history') || '[]');
            setTestHistory(history);
        };
        try {
            const user = JSON.parse(localStorage.getItem('digimentors_current_user') || 'null');
            if (!user?.email) return fallback();
            const base = API_BASE || '';
            fetch(`${base}/api/results?email=${encodeURIComponent(user.email)}`)
                .then(r => r.ok ? r.json() : null)
                .then(list => {
                    if (Array.isArray(list)) {
                        const mapped = list.map(r => ({
                            id: r._id,
                            name: r.name || 'Mock Test',
                            status: 'Completed',
                            date: new Date(r.createdAt).toLocaleDateString(),
                            correct: r.correct,
                            wrong: r.wrong,
                            score: r.score,
                            maxScore: r.maxScore,
                            totalQuestions: Math.round((r.maxScore || 0) / 4) || undefined,
                            timeSpent: r.timeSpent,
                        }));
                        setTestHistory(mapped);
                    } else fallback();
                })
                .catch(fallback);
        } catch { fallback(); }
    }, []);

    const filteredTests = filter === 'All'
        ? testHistory
        : testHistory.filter(test =>
            filter === 'Completed' ? test.status === 'Completed' :
                test.status !== 'Completed'
        );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#10b981'; // Green
            case 'Incomplete': return '#f59e0b'; // Yellow
            case 'Aborted': return '#ef4444'; // Red
            default: return 'var(--text-muted)';
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <div className="academic-badge" style={{ marginBottom: '1rem' }}>PERFORMANCE ARCHIVE</div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>My Test History</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Track your progress, review past papers, and analyze your growth.</p>
                    </div>

                    {/* Filters */}
                    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {['All', 'Completed', 'Incomplete'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className="btn-reset"
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '100px',
                                    background: filter === f ? 'var(--primary)' : 'transparent',
                                    color: filter === f ? 'white' : 'var(--text-muted)',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Test List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {filteredTests.map((test) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card"
                            style={{
                                padding: '0',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>

                                {/* Left: Basic Info */}
                                <div style={{ flex: '1 1 300px' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{
                                            background: `rgba(${parseInt(getStatusColor(test.status).slice(1, 3), 16)}, ${parseInt(getStatusColor(test.status).slice(3, 5), 16)}, ${parseInt(getStatusColor(test.status).slice(5, 7), 16)}, 0.1)`,
                                            color: getStatusColor(test.status),
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            border: `1px solid ${getStatusColor(test.status)}40`
                                        }}>
                                            {test.status === 'Completed' ? <CheckCircle size={12} /> : test.status === 'Incomplete' ? <Clock size={12} /> : <AlertCircle size={12} />}
                                            {test.status.toUpperCase()}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{test.date}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>{test.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{test.type} • {test.totalQuestions} Questions</p>
                                </div>

                                {/* Middle: Stats or Progress */}
                                <div style={{ flex: '2 1 400px', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '0 2rem' }}>
                                    {test.status === 'Completed' ? (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                                            <div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>{test.correct}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>CORRECT</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ef4444' }}>{test.wrong}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>WRONG</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>{test.score}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>SCORE / {test.maxScore}</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600' }}>
                                                <span>Progress</span>
                                                <span>{test.attempted} / {test.totalQuestions} Attempted</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', overflow: 'hidden' }}>
                                                <div style={{ width: `${test.progress}%`, height: '100%', background: test.status === 'Aborted' ? '#ef4444' : '#f59e0b', borderRadius: '100px' }}></div>
                                            </div>
                                            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: test.status === 'Aborted' ? '#ef4444' : '#f59e0b' }}>
                                                {test.status === 'Aborted' ? 'Test was stopped mid-way.' : 'Test can be resumed.'}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Actions */}
                                <div style={{ flex: '0 0 160px', display: 'flex', justifyContent: 'flex-end' }}>
                                    {test.status === 'Completed' ? (
                                        <Link to="/analysis" className="btn-reset" style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            Analysis <BarChart2 size={16} />
                                        </Link>
                                    ) : (
                                        <button className="btn-reset" style={{ padding: '12px 20px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {test.status === 'Aborted' ? 'Retake' : 'Resume'} <PlayCircle size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Summary Bar Footer */}
                            {test.status === 'Completed' && (
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px 1.5rem', display: 'flex', gap: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <span><strong style={{ color: 'white' }}>94%</strong> Attempt Rate</span>
                                    <span><strong style={{ color: 'white' }}>78%</strong> Accuracy</span>
                                    <span><strong style={{ color: 'white' }}>{test.timeSpent}</strong> Taken</span>
                                    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--primary-light)' }}>
                                        View Full Report <ArrowUpRight size={14} />
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default StudentTestHistory;
