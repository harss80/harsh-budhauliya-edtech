
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronLeft, ChevronRight, AlertCircle,
    CheckCircle, Bookmark, Grid, Menu, X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const TestPlayer = () => {
    const navigate = useNavigate();
    const { testId } = useParams();

    // Configuration
    const TOTAL_QUESTIONS = 50;
    const DURATION_MINUTES = 60;

    // State
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(DURATION_MINUTES * 60);
    const [answers, setAnswers] = useState({});
    const [visited, setVisited] = useState(new Set([0]));
    const [markedForReview, setMarkedForReview] = useState(new Set());
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    // Mock Questions
    const [questions] = useState(() =>
        Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
            id: i + 1,
            subject: i < 17 ? 'Physics' : i < 34 ? 'Chemistry' : 'Mathematics',
            text: `Question ${i + 1}: This is a simulated question text for ${testId || 'Mock Test'}. Calculate the required value given the conditions.`,
            options: [
                { id: 'A', text: `Option A value ${i * 2 + 1}` },
                { id: 'B', text: `Option B value ${i * 3 + 2}` },
                { id: 'C', text: `Option C value ${i * 4 + 3}` },
                { id: 'D', text: `Option D value ${i * 5 + 4}` }
            ],
            correctAnswer: 'B'
        }))
    );

    // Responsive Check
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 1024;
            setIsMobile(mobile);
            if (!mobile) setIsSidebarOpen(true);
            else setIsSidebarOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (optionId) => {
        setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: optionId }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => {
                const next = prev + 1;
                setVisited(v => new Set(v).add(next));
                return next;
            });
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const toggleMarkForReview = () => {
        const qId = questions[currentQuestion].id;
        setMarkedForReview(prev => {
            const next = new Set(prev);
            if (next.has(qId)) next.delete(qId);
            else next.add(qId);
            return next;
        });
    };

    const handleSubmit = () => {
        let correctCount = 0;
        let attemptedCount = 0;
        questions.forEach(q => {
            if (answers[q.id]) {
                attemptedCount++;
                if (answers[q.id] === q.correctAnswer) correctCount++;
            }
        });

        const resultData = {
            totalQuestions: TOTAL_QUESTIONS,
            attempted: attemptedCount,
            correct: correctCount,
            wrong: attemptedCount - correctCount,
            score: (correctCount * 4) - ((attemptedCount - correctCount) * 1),
            maxScore: TOTAL_QUESTIONS * 4,
            accuracy: attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0,
            timeSpent: formatTime((DURATION_MINUTES * 60) - timeLeft),
            timestamp: new Date().toLocaleDateString()
        };

        const history = JSON.parse(localStorage.getItem('digimentors_test_history') || '[]');
        history.unshift({ ...resultData, name: `Test Attempt ${history.length + 1}`, status: 'Completed', date: new Date().toLocaleDateString() });
        localStorage.setItem('digimentors_test_history', JSON.stringify(history));

        navigate('/analysis', { state: { result: resultData } });
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#09090b', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <header style={{
                height: '64px', background: '#18181b', borderBottom: '1px solid #27272a',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', items: 'center', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white', margin: 0 }}>Full Syllabus Mock #04</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Timer */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.05)',
                        padding: '6px 12px', borderRadius: '6px',
                        color: timeLeft < 300 ? '#ef4444' : '#e4e4e7', fontWeight: '600'
                    }}>
                        <Clock size={18} />
                        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatTime(timeLeft)}</span>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="btn-reset"
                        style={{ background: '#ef4444', color: 'white', padding: '8px 20px', borderRadius: '6px', fontWeight: '600', fontSize: '0.9rem' }}
                    >
                        Submit
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="btn-reset lg:hidden"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{ display: isMobile ? 'block' : 'none', color: 'white' }}
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Body */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

                {/* Main Question Area */}
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>

                    {/* Top Bar: Subject & Marks */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['Physics', 'Chemistry', 'Mathematics'].map(Sub => (
                                <button
                                    key={Sub}
                                    className="btn-reset"
                                    style={{
                                        padding: '6px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '600',
                                        background: questions[currentQuestion].subject === Sub ? '#3b82f6' : '#27272a',
                                        color: questions[currentQuestion].subject === Sub ? 'white' : '#a1a1aa',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {Sub}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', fontWeight: '600' }}>
                            <span style={{ color: '#10b981' }}>+4 Correct</span>
                            <span style={{ color: '#ef4444' }}>-1 Wrong</span>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div style={{ background: '#18181b', borderRadius: '12px', border: '1px solid #27272a', padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #27272a', paddingBottom: '1rem' }}>
                            <span style={{ color: '#60a5fa', fontWeight: '700', fontSize: '1.1rem' }}>Question {currentQuestion + 1}</span>
                        </div>

                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#e4e4e7', marginBottom: '2.5rem', flex: 1 }}>
                            {questions[currentQuestion].text}
                        </p>

                        {/* Options Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                            {questions[currentQuestion].options.map(opt => {
                                const isSelected = answers[questions[currentQuestion].id] === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleAnswer(opt.id)}
                                        className="btn-reset"
                                        style={{
                                            padding: '1.25rem', textAlign: 'left',
                                            background: isSelected ? 'rgba(59, 130, 246, 0.15)' : '#27272a',
                                            border: isSelected ? '1px solid #3b82f6' : '1px solid transparent',
                                            borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: isSelected ? '#3b82f6' : '#3f3f46',
                                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: '700', flexShrink: 0
                                        }}>
                                            {opt.id}
                                        </div>
                                        <span style={{ color: isSelected ? 'white' : '#d4d4d8', fontWeight: '500' }}>{opt.text}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={toggleMarkForReview} className="btn-reset" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: markedForReview.has(questions[currentQuestion].id) ? '#a855f7' : '#71717a', fontWeight: '600' }}>
                                <Bookmark size={20} fill={markedForReview.has(questions[currentQuestion].id) ? '#a855f7' : 'none'} />
                                {markedForReview.has(questions[currentQuestion].id) ? 'Marked' : 'Mark for Review'}
                            </button>
                            <button onClick={() => {
                                const newAnswers = { ...answers };
                                delete newAnswers[questions[currentQuestion].id];
                                setAnswers(newAnswers);
                            }} className="btn-reset" style={{ color: '#71717a', fontWeight: '600', fontSize: '0.9rem' }}>Clear Response</button>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={handlePrev} disabled={currentQuestion === 0}
                                className="btn-reset"
                                style={{
                                    padding: '10px 24px', background: '#27272a', color: 'white', borderRadius: '8px',
                                    opacity: currentQuestion === 0 ? 0.5 : 1, fontWeight: '600'
                                }}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                className="btn-reset"
                                style={{ padding: '10px 24px', background: '#3b82f6', color: 'white', borderRadius: '8px', fontWeight: '600' }}
                            >
                                Save & Next
                            </button>
                        </div>
                    </div>

                </div>

                {/* Sidebar - Palette */}
                {isSidebarOpen && (
                    <div style={{
                        width: '320px', background: '#18181b', borderLeft: '1px solid #27272a',
                        display: 'flex', flexDirection: 'column',
                        position: isMobile ? 'absolute' : 'static',
                        zIndex: 50, top: 0, bottom: 0, right: 0
                    }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #27272a' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div> Answered
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div> Not Answered
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#a855f7' }}></div> Review
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27272a' }}></div> Not Visited
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>Question Palette</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                                {questions.map((q, idx) => {
                                    const qId = q.id;
                                    let bg = '#27272a';
                                    let color = '#a1a1aa';
                                    let border = 'none';

                                    if (answers[qId]) { bg = '#10b981'; color = 'white'; }
                                    else if (markedForReview.has(qId)) { bg = '#a855f7'; color = 'white'; }
                                    else if (visited.has(idx) && !answers[qId]) { bg = '#ef4444'; color = 'white'; }

                                    if (currentQuestion === idx) border = '2px solid white';

                                    return (
                                        <button
                                            key={qId}
                                            onClick={() => {
                                                setCurrentQuestion(idx);
                                                setVisited(v => new Set(v).add(idx));
                                                if (isMobile) setIsSidebarOpen(false);
                                            }}
                                            className="btn-reset"
                                            style={{
                                                aspectRatio: '1', borderRadius: '8px', background: bg, color: color,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: '600', fontSize: '0.9rem', border: border,
                                                transition: 'all 0.1s'
                                            }}
                                        >
                                            {qId}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestPlayer;
