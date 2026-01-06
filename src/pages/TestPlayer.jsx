
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronLeft, ChevronRight, AlertCircle,
    CheckCircle, Bookmark, Grid, Menu, X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// Import Real Questions
import { realQuestions as questionPool } from '../data/realQuestions';

const TestPlayer = () => {
    const navigate = useNavigate();
    const { testId } = useParams();

    // Determine Test Context
    const isMedical = testId?.includes('medical') || testId?.includes('neet') || testId?.includes('biology');
    const isEngineering = testId?.includes('jee') || testId?.includes('math') || testId?.includes('engineering');

    // Fallback: If unknown, show all
    const relevantSubjects = isMedical
        ? ['Physics', 'Chemistry', 'Biology']
        : isEngineering
            ? ['Physics', 'Chemistry', 'Mathematics']
            : ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

    // Configuration
    const TOTAL_QUESTIONS = 30; // Using 30 real questions for now
    const DURATION_MINUTES = 60;

    // State
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(DURATION_MINUTES * 60);
    const [answers, setAnswers] = useState({});
    const [visited, setVisited] = useState(new Set([0]));
    const [markedForReview, setMarkedForReview] = useState(new Set());
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    // Load and Shuffle Questions
    const [questions] = useState(() => {
        // Filter by subject
        let filtered = questionPool.filter(q => relevantSubjects.includes(q.subject));

        // If not enough questions, use all
        if (filtered.length === 0) filtered = questionPool;

        // Shuffle (Fisher-Yates)
        for (let i = filtered.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }

        // Limit to TOTAL_QUESTIONS or available
        const selected = filtered.slice(0, TOTAL_QUESTIONS);

        // Map to expected format if needed (realQuestions already match mostly, but let's ensure)
        return selected.map((q, i) => ({
            id: i + 1, // Display ID
            originalId: q.id,
            subject: q.subject,
            text: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer
        }));
    });

    const testTitle = isMedical ? 'Medical Diagnostic Test' : isEngineering ? 'JEE Diagnostic Test' : 'Comprehensive Assessment';

    // Question Timer (60s per question)
    const [questionTimer, setQuestionTimer] = useState(60);

    // Reset question timer when current question changes
    useEffect(() => {
        setQuestionTimer(60);
    }, [currentQuestion]);

    // Question Timer Countdown & Auto-Skip
    useEffect(() => {
        const qTimer = setInterval(() => {
            setQuestionTimer((prev) => {
                if (prev <= 1) {
                    // Time Up for this question -> Auto Next
                    handleNext();
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(qTimer);
    }, [currentQuestion, questions.length]); // Depend on currentQuestion so handleNext uses correct index

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
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'linear-gradient(to bottom right, #09090b, #1e1b4b)',
            display: 'flex', flexDirection: 'column', color: '#f4f4f5'
        }}>

            {/* Header */}
            <header style={{
                height: '64px', background: 'rgba(24, 24, 27, 0.6)', backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 1rem' : '0 1.5rem',
                flexShrink: 0, zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflow: 'hidden' }}>
                    {!isMobile && (
                        <div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0, background: 'linear-gradient(90deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {testTitle}
                            </h2>
                        </div>
                    )}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '100px',
                        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Clock size={14} color={questionTimer < 10 ? '#ef4444' : '#fbbf24'} />
                        {!isMobile && <span style={{ color: 'var(--text-muted)' }}>Q-Time:</span>}
                        <span style={{ fontWeight: '700', color: questionTimer < 10 ? '#ef4444' : 'white', minWidth: '20px' }}>{questionTimer}s</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
                    {/* Timer */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                        padding: '6px 14px', borderRadius: '100px',
                        border: timeLeft < 300 ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(99, 102, 241, 0.3)',
                    }}>
                        <Clock size={16} color={timeLeft < 300 ? '#ef4444' : '#818cf8'} />
                        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: '700', fontSize: '1rem', color: timeLeft < 300 ? '#ef4444' : 'white' }}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="btn-reset"
                        style={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white', padding: isMobile ? '8px 16px' : '8px 24px', borderRadius: '100px',
                            fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {isMobile ? 'Submit' : 'Submit Test'}
                    </button>

                    <button
                        className="btn-reset lg:hidden"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{ display: isMobile ? 'flex' : 'none', color: 'white', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Body */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

                {/* Main Question Area */}
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: isMobile ? '1rem' : '2rem' }}>

                    {/* Top Bar: Subject & Marks */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {['Physics', 'Chemistry', 'Mathematics'].map(Sub => (
                                <button
                                    key={Sub}
                                    className="btn-reset"
                                    style={{
                                        padding: '6px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '600',
                                        background: questions[currentQuestion].subject === Sub ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                                        color: questions[currentQuestion].subject === Sub ? '#a5b4fc' : '#a1a1aa',
                                        border: questions[currentQuestion].subject === Sub ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {Sub}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', fontWeight: '600', background: 'rgba(0,0,0,0.2)', padding: '6px 12px', borderRadius: '8px' }}>
                            <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> +4</span>
                            <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={14} /> -1</span>
                        </div>
                    </div>

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                        >
                            {/* Question Card */}
                            <div className="glass-card" style={{
                                background: 'rgba(30, 30, 35, 0.6)', backdropFilter: 'blur(20px)',
                                borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)',
                                padding: isMobile ? '1.5rem' : '2.5rem', marginBottom: '2rem',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)'
                            }}>
                                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                        color: 'white', padding: '4px 12px', borderRadius: '8px',
                                        fontWeight: '700', fontSize: '0.9rem', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
                                    }}>
                                        Q{currentQuestion + 1}
                                    </span>
                                    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' }}></div>
                                </div>

                                <p style={{
                                    fontSize: isMobile ? '1.1rem' : '1.35rem', lineHeight: '1.6',
                                    color: '#f4f4f5', fontWeight: '500', marginBottom: '2.5rem',
                                    fontFamily: '"Plus Jakarta Sans", sans-serif'
                                }}>
                                    {questions[currentQuestion].text}
                                </p>

                                {/* Options */}
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.25rem' }}>
                                    {questions[currentQuestion].options.map(opt => {
                                        const isSelected = answers[questions[currentQuestion].id] === opt.id;
                                        return (
                                            <motion.button
                                                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                                whileTap={{ scale: 0.99 }}
                                                key={opt.id}
                                                onClick={() => handleAnswer(opt.id)}
                                                className="btn-reset"
                                                style={{
                                                    padding: '1.25rem', textAlign: 'left',
                                                    background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                                                    border: isSelected ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px',
                                                    transition: 'all 0.2s', position: 'relative', overflow: 'hidden'
                                                }}
                                            >
                                                <div style={{
                                                    width: '36px', height: '36px', borderRadius: '10px',
                                                    background: isSelected ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                                                    color: isSelected ? 'white' : '#71717a',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: '700', fontSize: '1rem', flexShrink: 0,
                                                    border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.1)'
                                                }}>
                                                    {opt.id}
                                                </div>
                                                <span style={{ color: isSelected ? 'white' : '#d4d4d8', fontWeight: isSelected ? '600' : '400', fontSize: '1.05rem' }}>{opt.text}</span>
                                                {isSelected && (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginLeft: 'auto' }}>
                                                        <CheckCircle size={20} color="#3b82f6" fill="rgba(59, 130, 246, 0.2)" />
                                                    </motion.div>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Nav */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginTop: 'auto', paddingTop: '1rem',
                        borderTop: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={toggleMarkForReview} className="btn-reset" title="Mark for Review" style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                color: markedForReview.has(questions[currentQuestion].id) ? '#a855f7' : '#a1a1aa',
                                fontWeight: '600', padding: '10px 16px', background: 'rgba(255,255,255,0.03)',
                                borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
                                transition: 'all 0.2s'
                            }}>
                                <Bookmark size={18} fill={markedForReview.has(questions[currentQuestion].id) ? '#a855f7' : 'none'} />
                                <span className={isMobile ? 'hidden' : 'block'}>{markedForReview.has(questions[currentQuestion].id) ? 'Marked' : 'Mark for Review'}</span>
                            </button>
                            <button onClick={() => {
                                const newAnswers = { ...answers };
                                delete newAnswers[questions[currentQuestion].id];
                                setAnswers(newAnswers);
                            }} className="btn-reset" title="Clear Response" style={{
                                color: '#a1a1aa', fontWeight: '600', fontSize: '0.9rem', padding: '10px 16px',
                                background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <span className={isMobile ? 'block' : 'hidden'}><X size={18} /></span>
                                <span className={isMobile ? 'hidden' : 'block'}>Clear Response</span>
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={handlePrev} disabled={currentQuestion === 0}
                                className="btn-reset"
                                style={{
                                    padding: isMobile ? '10px 16px' : '10px 24px', background: 'rgba(255,255,255,0.05)',
                                    color: 'white', borderRadius: '12px', opacity: currentQuestion === 0 ? 0.5 : 1,
                                    fontWeight: '600', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <span className={isMobile ? 'hidden' : 'block'}>Previous</span>
                                <span className={isMobile ? 'block' : 'hidden'}><ChevronLeft size={20} /></span>
                            </button>
                            <button
                                onClick={handleNext}
                                className="btn-reset"
                                style={{
                                    padding: isMobile ? '10px 20px' : '10px 32px',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    color: 'white', borderRadius: '12px', fontWeight: '700', fontSize: '0.95rem',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
                                }}
                            >
                                <span>Save & Next</span> <ChevronRight size={18} className={isMobile ? 'hidden' : 'block'} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Sidebar - Palette */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                width: '320px', background: 'rgba(24, 24, 27, 0.95)', backdropFilter: 'blur(20px)',
                                borderLeft: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', flexDirection: 'column',
                                position: isMobile ? 'absolute' : 'static',
                                zIndex: 50, top: 0, bottom: 0, right: 0
                            }}
                        >
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>Question Palette</h3>
                                {isMobile && <button onClick={() => setIsSidebarOpen(false)} className="btn-reset" style={{ color: 'var(--text-muted)' }}><X size={20} /></button>}
                            </div>

                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div> Answered
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div> Skipped
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></div> Review
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a1a1aa' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27272a', border: '1px solid #52525b' }}></div> Not Visited
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                                    {questions.map((q, idx) => {
                                        const qId = q.id;
                                        let bg = 'rgba(255,255,255,0.03)';
                                        let color = '#a1a1aa';
                                        let border = '1px solid rgba(255,255,255,0.1)';

                                        if (answers[qId]) { bg = '#10b981'; color = 'white'; border = 'none'; }
                                        else if (markedForReview.has(qId)) { bg = '#a855f7'; color = 'white'; border = 'none'; }
                                        else if (visited.has(idx) && !answers[qId]) { bg = '#ef4444'; color = 'white'; border = 'none'; }

                                        if (currentQuestion === idx) {
                                            border = '2px solid #3b82f6';
                                            if (!answers[qId] && !markedForReview.has(qId)) bg = 'rgba(59, 130, 246, 0.1)';
                                        }

                                        return (
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                key={qId}
                                                onClick={() => {
                                                    setCurrentQuestion(idx);
                                                    setVisited(v => new Set(v).add(idx));
                                                    if (isMobile) setIsSidebarOpen(false);
                                                }}
                                                className="btn-reset"
                                                style={{
                                                    aspectRatio: '1', borderRadius: '10px', background: bg, color: color,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: '700', fontSize: '0.85rem', border: border,
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {qId}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TestPlayer;
