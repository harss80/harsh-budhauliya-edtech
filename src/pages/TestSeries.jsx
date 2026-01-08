
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, Clock, AlertCircle, CheckCircle, Lock, PlayCircle, Star,
    Filter, Layout, Atom, Zap, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TestSeries = () => {
    const navigate = useNavigate();
    const [userGoal, setUserGoal] = useState('JEE'); // Default
    const [activeTab, setActiveTab] = useState('Full Mocks');

    useEffect(() => {
        // Load user preference
        const storedUser = JSON.parse(localStorage.getItem('digimentors_current_user') || '{}');
        if (storedUser.educationDetails?.targetExam) {
            const goal = storedUser.educationDetails.targetExam.toUpperCase();
            if (goal.includes('NEET') || goal.includes('MEDICAL')) setUserGoal('NEET');
            else if (goal.includes('JEE') || goal.includes('ENGINEERING')) setUserGoal('JEE');
            else setUserGoal('Foundation');
        }
    }, []);

    // Mock Data for numerous tests
    const generateTests = (goal, category, count) => {
        return Array.from({ length: count }).map((_, i) => ({
            id: `${goal.toLowerCase()}-${category.toLowerCase().replace(' ', '-')}-${i + 1}`,
            title: `${goal} ${category} #${i + 1}`,
            questions: goal === 'JEE' ? 75 : (goal === 'NEET' ? 180 : 30),
            duration: goal === 'JEE' ? 180 : (goal === 'NEET' ? 200 : 60),
            marks: goal === 'JEE' ? 300 : (goal === 'NEET' ? 720 : 120),
            tags: category === 'Full Mocks' ? ['High Yield', 'New Pattern'] : ['Topic Wise', 'Core Concepts'],
            difficulty: i % 3 === 0 ? 'Hard' : i % 3 === 1 ? 'Medium' : 'Standard',
            isLocked: i > 2 // Lock tests after first 3 (simulate premium)
        }));
    };

    const tests = [
        ...generateTests(userGoal, 'Full Mocks', 10),
        ...generateTests(userGoal, 'Sectional Tests', 8),
        ...generateTests(userGoal, 'Chapter Tests', 15),
        ...generateTests(userGoal, 'Previous Year', 5),
    ].filter(t => {
        if (activeTab === 'All') return true;
        return t.title.includes(activeTab);
    });

    const handleStartTest = (testId) => {
        navigate(`/attempt-test/${testId}`);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '100px', paddingBottom: '60px', color: 'white', fontFamily: '"Inter", sans-serif' }}>
            <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

                {/* Header Section */}
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '100px', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                        <Target size={14} /> ELITE TEST SERIES
                    </div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '1rem' }}>
                        {userGoal} <span style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Exam Center</span>
                    </h1>
                    <p style={{ color: '#a1a1aa', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Practice with India's most advanced test platform. Real exam interface, detailed analytics, and AI-driven difficulty.
                    </p>
                </div>

                {/* Tabs & Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '20px' }}>

                    {/* Category Tabs */}
                    <div style={{ background: '#121214', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '4px', overflowX: 'auto', maxWidth: '100%' }}>
                        {['Full Mocks', 'Sectional Tests', 'Chapter Tests', 'Previous Year'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="btn-reset"
                                style={{
                                    padding: '10px 20px', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '600',
                                    background: activeTab === tab ? '#3b82f6' : 'transparent',
                                    color: activeTab === tab ? 'white' : '#a1a1aa',
                                    whiteSpace: 'nowrap', transition: 'all 0.2s'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Goal Switcher (Hidden if strict, but kept for demo flex) */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => setUserGoal('JEE')} className="btn-reset" style={{ opacity: userGoal === 'JEE' ? 1 : 0.5, padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontWeight: '600', fontSize: '0.8rem' }}>JEE</button>
                        <button onClick={() => setUserGoal('NEET')} className="btn-reset" style={{ opacity: userGoal === 'NEET' ? 1 : 0.5, padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontWeight: '600', fontSize: '0.8rem' }}>NEET</button>
                    </div>
                </div>

                {/* Test Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                    {tests.map((test) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            style={{
                                background: '#18181b',
                                borderRadius: '20px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                overflow: 'hidden',
                                display: 'flex', flexDirection: 'column'
                            }}
                        >
                            {/* Card Top */}
                            <div style={{ padding: '24px', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Atom size={24} color={userGoal === 'JEE' ? '#60a5fa' : '#34d399'} />
                                    </div>
                                    {test.isLocked ? (
                                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Lock size={12} /> LOCKED
                                        </div>
                                    ) : (
                                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Star size={12} fill="currentColor" /> FREE
                                        </div>
                                    )}
                                </div>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', lineHeight: '1.4' }}>{test.title}</h3>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>{test.questions} Questions</span>
                                    <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>•</span>
                                    <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>{test.duration} Mins</span>
                                    <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>•</span>
                                    <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>{test.marks} Marks</span>
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {test.tags.map(tag => (
                                        <span key={tag} style={{ fontSize: '0.75rem', color: '#d4d4d8', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                                <button
                                    onClick={() => handleStartTest(test.id)}
                                    disabled={test.isLocked}
                                    className="btn-reset"
                                    style={{
                                        width: '100%',
                                        padding: '14px',
                                        borderRadius: '12px',
                                        background: test.isLocked ? 'rgba(255,255,255,0.05)' : '#3b82f6',
                                        color: test.isLocked ? '#71717a' : 'white',
                                        fontWeight: '700', fontSize: '0.95rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        cursor: test.isLocked ? 'not-allowed' : 'pointer',
                                        border: test.isLocked ? '1px solid rgba(255,255,255,0.05)' : 'none'
                                    }}
                                >
                                    {test.isLocked ? 'Unlock Series' : 'Start Test'} {!test.isLocked && <PlayCircle size={18} />}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TestSeries;
