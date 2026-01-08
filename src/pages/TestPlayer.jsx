
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, ChevronLeft, ChevronRight, AlertCircle,
    CheckCircle, Bookmark, Grid, Menu, X, MoreVertical,
    HelpCircle
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
    const DURATION_MINUTES = 60; // 1 hour standard

    // State
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(DURATION_MINUTES * 60);
    const [timePerQuestion, setTimePerQuestion] = useState({});
    const [answers, setAnswers] = useState({});
    const [visited, setVisited] = useState(new Set([0]));
    const [markedForReview, setMarkedForReview] = useState(new Set());
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    // Load and Shuffle Questions
    const [questions] = useState(() => {
        let filtered = [];

        if (testId === 'custom-generated') {
            const config = JSON.parse(localStorage.getItem('custom_test_config') || '{}');
            if (config.chapters && config.chapters.length > 0) {
                // Filter by selected chapters
                filtered = questionPool.filter(q => config.chapters.includes(q.chapter));
                // Optional: Filter by class
                if (config.class && config.class.length > 0) {
                    filtered = filtered.filter(q => config.class.includes(q.class));
                }
            } else {
                // Fallback for custom if no config (e.g. direct link)
                filtered = questionPool;
            }
        } else {
            // Standard Exam Logic
            filtered = questionPool.filter(q => relevantSubjects.includes(q.subject));
        }

        // Shuffle (Fisher-Yates) for randomness
        for (let i = filtered.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }

        // Limit Questions
        // For custom: use all matching questions (max 100 to be safe)
        // For standard: use 50
        const MAX_QS = testId === 'custom-generated' ? 100 : 50;
        const selected = filtered.slice(0, MAX_QS);

        // Map to display format
        return selected.map((q, i) => ({
            id: i + 1, // Display ID (1, 2, 3...)
            originalId: q.id,
            subject: q.subject,
            text: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            chapter: q.chapter,
            class: q.class
        }));
    });

    const testTitle = testId === 'custom-generated'
        ? 'Custom Practice Session'
        : (isMedical ? 'Medical Diagnostic Test' : isEngineering ? 'JEE Diagnostic Test' : 'Comprehensive Assessment');

    // Question Timer (60s per question)
    const [questionTimer, setQuestionTimer] = useState(60);

    // Reset question timer when current question changes
    useEffect(() => {
        setQuestionTimer(60);
    }, [currentQuestion]);

    // Track time updated per second for current question
    useEffect(() => {
        const tracker = setInterval(() => {
            if (questions[currentQuestion]) {
                setTimePerQuestion(prev => ({
                    ...prev,
                    [questions[currentQuestion].id]: (prev[questions[currentQuestion].id] || 0) + 1
                }));
            }
        }, 1000);
        return () => clearInterval(tracker);
    }, [currentQuestion, questions]);

    // Question Timer Countdown & Auto-Skip
    useEffect(() => {
        if (!questions.length) return;

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
    }, [currentQuestion, questions.length]);

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

    // Global Timer
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

        // Detailed Analysis Data Structures
        const subjectStats = {};
        const questionData = [];

        questions.forEach(q => {
            const userAns = answers[q.id];
            const isAttempted = userAns !== undefined;
            const isCorrect = userAns === q.correctAnswer;
            const timeTaken = timePerQuestion[q.id] || 0;

            if (isAttempted) attemptedCount++;
            if (isCorrect) correctCount++;

            // Update Subject Stats
            if (!subjectStats[q.subject]) {
                subjectStats[q.subject] = {
                    total: 0,
                    attempted: 0,
                    correct: 0,
                    time: 0,
                    score: 0
                };
            }
            subjectStats[q.subject].total++;
            subjectStats[q.subject].time += timeTaken;
            if (isAttempted) subjectStats[q.subject].attempted++;
            if (isCorrect) {
                subjectStats[q.subject].correct++;
                subjectStats[q.subject].score += 4;
            } else if (isAttempted) {
                subjectStats[q.subject].score -= 1;
            }

            // Push detailed question data
            questionData.push({
                ...q,
                userAnswer: userAns,
                isCorrect,
                isAttempted,
                timeTaken
            });
        });

        // Format Subject Stats for Analysis Page
        const subjectAnalysis = Object.keys(subjectStats).map(sub => {
            const stats = subjectStats[sub];
            return {
                subject: sub,
                score: stats.score,
                max: stats.total * 4,
                accuracy: stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0,
                time: formatTime(stats.time),
                color: sub === 'Physics' ? '#f59e0b' : sub === 'Chemistry' ? '#10b981' : '#6366f1' // Standard colors
            };
        });

        const resultData = {
            totalQuestions: questions.length,
            attempted: attemptedCount,
            correct: correctCount,
            wrong: attemptedCount - correctCount,
            score: (correctCount * 4) - ((attemptedCount - correctCount) * 1),
            maxScore: questions.length * 4,
            accuracy: attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0,
            timeSpent: formatTime((DURATION_MINUTES * 60) - timeLeft),
            timestamp: new Date().toLocaleDateString(),
            subjectAnalysis,
            questionData
        };

        const history = JSON.parse(localStorage.getItem('digimentors_test_history') || '[]');
        history.unshift({ ...resultData, name: testTitle, status: 'Completed', date: new Date().toLocaleDateString() });
        localStorage.setItem('digimentors_test_history', JSON.stringify(history));

        navigate('/analysis', { state: { result: resultData } });
    };

    if (questions.length === 0) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: 'white', flexDirection: 'column' }}>
                <h2>No questions found for this configuration.</h2>
                <button onClick={() => navigate('/test-generator')} className="btn-reset" style={{ marginTop: '1rem', color: '#3b82f6', textDecoration: 'underline' }}>Go Back</button>
            </div>
        )
    }

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#09090b',
            display: 'flex', flexDirection: 'column', color: '#f4f4f5',
            fontFamily: '"Inter", sans-serif'
        }}>

            {/* --- TOP HEADER --- */}
            <header style={{
                height: '70px', background: 'rgba(24, 24, 27, 0.8)', backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 1rem' : '0 2rem',
                flexShrink: 0, zIndex: 60
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Logo/Title */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: '700', color: 'white', margin: 0 }}>
                            {testTitle}
                        </h2>
                        {!isMobile && <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>ID: {testId === 'custom-generated' ? 'CUST-GEN' : testId.toUpperCase()}</span>}
                    </div>

                    {/* Question Timer Badge */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '100px',
                        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem',
                        border: '1px solid rgba(255,255,255,0.08)'
                    }}>
                        <Clock size={16} color={questionTimer < 10 ? '#ef4444' : '#fbbf24'} />
                        <span style={{ color: '#a1a1aa', fontSize: '0.8rem', display: isMobile ? 'none' : 'inline' }}>Time Left:</span>
                        <span style={{ fontWeight: '700', color: questionTimer < 10 ? '#ef4444' : 'white', minWidth: '24px' }}>{questionTimer}s</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Global Timer */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        background: '#1e1b4b',
                        padding: '8px 16px', borderRadius: '12px',
                        border: '1px solid #312e81',
                        color: '#a5b4fc',
                        fontWeight: '700', fontSize: '1.1rem'
                    }}>
                        <Clock size={18} />
                        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatTime(timeLeft)}</span>
                    </div>

                    {/* Submit Button (Desktop) */}
                    {!isMobile && (
                        <button
                            onClick={handleSubmit}
                            className="btn-reset"
                            style={{
                                background: '#ef4444',
                                color: 'white', padding: '10px 24px', borderRadius: '12px',
                                fontWeight: '700', fontSize: '0.95rem',
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                            }}
                        >
                            Finish Test
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    {isMobile && (
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="btn-reset"
                            style={{ padding: '8px', color: 'white' }}
                        >
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

                {/* Scrollable Questions Area */}
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: isMobile ? '1rem' : '2rem' }}>

                    {/* Progress Bar (Top) */}
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', marginBottom: '2rem', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            transition={{ ease: "easeOut" }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                        />
                    </div>

                    {/* Subject Tabs */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {['Physics', 'Chemistry', 'Biology', 'Mathematics'].filter(sub => questions.some(q => q.subject === sub)).map(Sub => (
                                <span
                                    key={Sub}
                                    style={{
                                        padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '600',
                                        background: questions[currentQuestion].subject === Sub ? 'white' : 'transparent',
                                        color: questions[currentQuestion].subject === Sub ? 'black' : '#71717a',
                                        border: questions[currentQuestion].subject === Sub ? '1px solid white' : '1px solid rgba(255,255,255,0.1)',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {Sub}
                                </span>
                            ))}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>
                            Question <span style={{ color: 'white', fontWeight: '700' }}>{currentQuestion + 1}</span> of {questions.length}
                        </div>
                    </div>

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                        >
                            {/* Question Content */}
                            <div style={{
                                flex: 1,
                                background: '#18181b',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '24px',
                                padding: isMobile ? '1.5rem' : '3rem',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '12px', background: '#27272a',
                                        color: '#3b82f6', fontWeight: '800', fontSize: '1.2rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                    }}>
                                        Q
                                    </div>
                                    <h3 style={{
                                        fontSize: isMobile ? '1.1rem' : '1.4rem',
                                        lineHeight: '1.6', color: '#f4f4f5', fontWeight: '500', margin: 0
                                    }}>
                                        {questions[currentQuestion].text}
                                    </h3>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
                                    {questions[currentQuestion].options.map(opt => {
                                        const isSelected = answers[questions[currentQuestion].id] === opt.id;
                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => handleAnswer(opt.id)}
                                                className="btn-reset"
                                                style={{
                                                    padding: '1.25rem', textAlign: 'left',
                                                    background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.02)',
                                                    border: isSelected ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px',
                                                    transition: 'all 0.2s', position: 'relative'
                                                }}
                                            >
                                                <div style={{
                                                    width: '32px', height: '32px', borderRadius: '50%',
                                                    background: isSelected ? '#3b82f6' : 'rgba(255,255,255,0.08)',
                                                    color: isSelected ? 'white' : '#71717a',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontWeight: '700', fontSize: '0.9rem', flexShrink: 0
                                                }}>
                                                    {opt.id}
                                                </div>
                                                <span style={{ color: isSelected ? 'white' : '#d4d4d8', fontSize: '1rem' }}>{opt.text}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Bottom Action Bar */}
                    <div style={{
                        display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
                        paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem', width: isMobile ? '100%' : 'auto' }}>
                            <button onClick={toggleMarkForReview} className="btn-reset" style={{
                                flex: isMobile ? 1 : 'unset', padding: '12px 20px', borderRadius: '12px',
                                background: markedForReview.has(questions[currentQuestion].id) ? '#a855f7' : 'rgba(255,255,255,0.05)',
                                color: markedForReview.has(questions[currentQuestion].id) ? 'white' : '#a1a1aa',
                                fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                transition: 'all 0.2s'
                            }}>
                                <Bookmark size={18} fill={markedForReview.has(questions[currentQuestion].id) ? 'currentColor' : 'none'} />
                                {markedForReview.has(questions[currentQuestion].id) ? 'Marked' : 'Mark Review'}
                            </button>
                            <button onClick={() => {
                                const newAns = { ...answers };
                                delete newAns[questions[currentQuestion].id];
                                setAnswers(newAns);
                            }} className="btn-reset" style={{
                                flex: isMobile ? 1 : 'unset', padding: '12px', borderRadius: '12px',
                                background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                                color: '#a1a1aa', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}>
                                <X size={18} /> Clear
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', width: isMobile ? '100%' : 'auto' }}>
                            <button onClick={handlePrev} disabled={currentQuestion === 0} className="btn-reset" style={{
                                padding: '12px 24px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)',
                                color: 'white', opacity: currentQuestion === 0 ? 0.3 : 1, cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
                            }}>
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={handleNext} className="btn-reset" style={{
                                flex: 1, padding: '12px 32px', borderRadius: '12px', background: 'white',
                                color: 'black', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}>
                                Save & Next <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* --- RIGHT SIDEBAR (PALETTE) --- */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{
                                width: isMobile ? '100%' : '320px',
                                background: '#121214', borderLeft: '1px solid rgba(255,255,255,0.08)',
                                display: 'flex', flexDirection: 'column',
                                position: isMobile ? 'absolute' : 'static',
                                zIndex: 100, top: 0, bottom: 0, right: 0
                            }}
                        >
                            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'white' }}>Question Palette</h3>
                                {isMobile && <button onClick={() => setIsSidebarOpen(false)} className="btn-reset" style={{ color: '#a1a1aa' }}><X size={20} /></button>}
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                                {/* Legend */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                                        <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Answered</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                                        <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Skipped</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></div>
                                        <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Review</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27272a', border: '1px solid #3f3f46' }}></div>
                                        <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>Not Visited</span>
                                    </div>
                                </div>

                                {/* Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                                    {questions.map((q, idx) => {
                                        const qId = q.id;
                                        let bg = '#18181b';
                                        let color = '#a1a1aa';
                                        let border = '1px solid rgba(255,255,255,0.1)';

                                        if (answers[qId]) { bg = '#10b981'; color = 'white'; border = 'none'; }
                                        else if (markedForReview.has(qId)) { bg = '#a855f7'; color = 'white'; border = 'none'; }
                                        else if (visited.has(idx) && !answers[qId]) { bg = '#ef4444'; color = 'white'; border = 'none'; }

                                        if (currentQuestion === idx) {
                                            border = '2px solid white';
                                        }

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
                                                    fontWeight: '700', fontSize: '0.85rem', border: border,
                                                    transition: 'all 0.1s'
                                                }}
                                            >
                                                {qId}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mobile Submit Button inside Menu */}
                            {isMobile && (
                                <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <button
                                        onClick={handleSubmit}
                                        className="btn-reset"
                                        style={{
                                            width: '100%', background: '#ef4444', color: 'white',
                                            padding: '14px', borderRadius: '12px', fontWeight: '700'
                                        }}
                                    >
                                        Finish Test
                                    </button>
                                </div>
                            )}

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default TestPlayer;
