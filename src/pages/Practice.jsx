
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { realQuestions as questionPool } from '../data/realQuestions';
import { ArrowLeft, CheckCircle, RefreshCw, ChevronRight, AlertCircle, Clock, XCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Practice = () => {
    const { exam } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState({}); // Store all answers { qId: selectedOption }
    const [showResult, setShowResult] = useState(false);

    // --- Timer State (Mock for now, could be improved) ---
    const [timeLeft, setTimeLeft] = useState(600); // 10 mins for 10 q

    useEffect(() => {
        // Filter questions based on exam
        const subjects = exam === 'NEET'
            ? ['Physics', 'Chemistry', 'Biology']
            : ['Physics', 'Chemistry', 'Mathematics'];

        // Mock filter logic (using existing pool)
        const filtered = questionPool.filter(q => subjects.includes(q.subject));
        // Shuffle & Limit
        const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuestions(shuffled);
    }, [exam]);

    useEffect(() => {
        if (!showResult && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, showResult]);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionSelect = (optionId) => {
        if (showResult) return;
        setSelectedOption(optionId);
    };

    const handleNext = () => {
        // Save Answer
        if (selectedOption !== null) {
            setAnswers(prev => ({ ...prev, [questions[currentQIndex].id]: selectedOption }));
        }

        setSelectedOption(null); // Reset for next Q

        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            finishTest();
        }
    };

    const finishTest = () => {
        setShowResult(true);
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) correct++;
        });
        return correct;
    };

    if (questions.length === 0) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: 'white' }}>
            <div className="spinner" style={{ borderTopColor: '#3b82f6', borderLeftColor: '#3b82f6' }}></div>
        </div>
    );

    if (showResult) {
        const score = calculateScore();
        const percentage = Math.round((score / questions.length) * 100);
        let feedback = { msg: "Expert Level", color: "#10b981", sub: "Fantastic performance!" };
        if (percentage < 80) feedback = { msg: "Good Job", color: "#f59e0b", sub: "Keep practicing to reach the top." };
        if (percentage < 50) feedback = { msg: "Keep Improved", color: "#ef4444", sub: "Review your weak areas." };

        return (
            <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: '"Inter", sans-serif' }}>
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ background: '#18181b', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.08)', padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                >
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                        style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${feedback.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: `2px solid ${feedback.color}` }}
                    >
                        <CheckCircle size={40} color={feedback.color} />
                    </motion.div>

                    <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'white', marginBottom: '8px' }}>{feedback.msg}</h2>
                    <p style={{ color: '#a1a1aa', marginBottom: '2.5rem' }}>{feedback.sub}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                        {[
                            { label: 'Score', val: score, color: 'white' },
                            { label: 'Accuracy', val: `${percentage}%`, color: feedback.color },
                            { label: 'Questions', val: questions.length, color: 'white' },
                        ].map((s, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '4px' }}>{s.label}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: s.color }}>{s.val}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gap: '12px' }}>
                        <button onClick={() => window.location.reload()} className="btn-reset" style={{ width: '100%', padding: '16px', background: '#3b82f6', color: 'white', borderRadius: '14px', fontWeight: '700', fontSize: '1rem' }}>Practice Again</button>
                        <Link to="/" className="btn-reset" style={{ width: '100%', padding: '16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '14px', fontWeight: '600', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Dashboard</Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQ = questions[currentQIndex];
    const progress = ((currentQIndex + 1) / questions.length) * 100;

    return (
        <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '100px', paddingBottom: '40px', color: 'white', fontFamily: '"Inter", sans-serif' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>

                {/* Top Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <Link to="/questions" style={{ color: '#a1a1aa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600' }}>
                        <ArrowLeft size={18} /> Exit Test
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '6px 12px', borderRadius: '100px', fontWeight: '700', fontSize: '0.9rem' }}>
                        <Clock size={16} /> {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
                    <motion.div
                        animate={{ width: `${progress}%` }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: '100px' }}
                    />
                </div>

                {/* Question Card */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem' }}>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentQ.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Question {currentQIndex + 1}</span>
                                    <span style={{ fontSize: '0.85rem', color: '#a1a1aa', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '8px' }}>{currentQ.subject}</span>
                                </div>
                                <h2 style={{ fontSize: '1.6rem', fontWeight: '600', lineHeight: '1.5', color: 'white' }}>{currentQ.question}</h2>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {currentQ.options.map(opt => {
                                    const isSelected = selectedOption === opt.id;
                                    return (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleOptionSelect(opt.id)}
                                            className="btn-reset"
                                            style={{
                                                textAlign: 'left',
                                                padding: '20px',
                                                borderRadius: '16px',
                                                background: isSelected ? 'rgba(59, 130, 246, 0.15)' : '#18181b',
                                                border: isSelected ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.08)',
                                                color: isSelected ? 'white' : '#d4d4d8',
                                                fontSize: '1.05rem',
                                                transition: 'all 0.2s',
                                                display: 'flex', alignItems: 'center', gap: '16px',
                                                position: 'relative'
                                            }}
                                        >
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '8px',
                                                background: isSelected ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                                                color: isSelected ? 'white' : '#a1a1aa',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'
                                            }}>
                                                {opt.id}
                                            </div>
                                            {opt.text}
                                        </button>
                                    );
                                })}
                            </div>

                            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'end' }}>
                                <button
                                    onClick={handleNext}
                                    style={{
                                        padding: '16px 40px', background: selectedOption ? 'white' : 'rgba(255,255,255,0.1)',
                                        color: selectedOption ? 'black' : 'rgba(255,255,255,0.3)',
                                        borderRadius: '100px', fontWeight: '700', fontSize: '1rem', border: 'none', cursor: selectedOption ? 'pointer' : 'not-allowed',
                                        display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                                    }}
                                >
                                    {currentQIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'} <ChevronRight size={18} />
                                </button>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default Practice;
