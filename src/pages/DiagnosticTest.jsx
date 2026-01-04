import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, ChevronRight, BarChart2 } from 'lucide-react';

const questions = [
    {
        id: 1,
        text: "A particle is projected with velocity 20 m/s at an angle of 60° with the horizontal. The radius of curvature of the trajectory at the highest point is:",
        options: ["10 m", "20 m", "5 m", "40 m"],
        correct: 0, // 10 m
        subject: "Physics",
        topic: "Kinematics"
    },
    {
        id: 2,
        text: "Which of the following compounds will exhibit geometrical isomerism?",
        options: ["1-Butene", "2-Butene", "Propene", "Isobutene"],
        correct: 1, // 2-Butene
        subject: "Chemistry",
        topic: "Organic Chemistry"
    },
    {
        id: 3,
        text: "The value of integral ∫(0 to π/2) (sin x / (sin x + cos x)) dx is:",
        options: ["π/2", "π/4", "π", "0"],
        correct: 1, // π/4
        subject: "Mathematics",
        topic: "Calculus"
    }
];

const DiagnosticTest = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60); // 1 minute per question
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [timeTaken, setTimeTaken] = useState([]);

    // Timer Logic
    useEffect(() => {
        if (isFinished) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleNext(); // Auto skip
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [activeQuestion, isFinished]);

    const handleOptionSelect = (idx) => {
        setSelectedOption(idx);
    };

    const handleNext = () => {
        // Record analytics
        const currentTimeSpent = 60 - timeLeft;
        setTimeTaken([...timeTaken, currentTimeSpent]);

        // Check Correctness
        if (selectedOption !== null && selectedOption === questions[activeQuestion].correct) {
            setScore(score + 1);
        }

        if (activeQuestion < questions.length - 1) {
            setActiveQuestion(activeQuestion + 1);
            setSelectedOption(null);
            setTimeLeft(60);
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card"
                    style={{ padding: '3rem', maxWidth: '600px', width: '100%', textAlign: 'center', borderRadius: '2rem' }}
                >
                    <div style={{ width: '80px', height: '80px', background: 'var(--primary-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <BarChart2 size={40} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Diagnostic Complete</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Here is your initial performance analysis.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem', textAlign: 'left' }}>
                        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Estimated Rank</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white' }}>AIR {(3 - score) * 1500 + 450}</div>
                        </div>
                        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Accuracy Score</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent)' }}>{Math.round((score / questions.length) * 100)}%</div>
                        </div>
                    </div>

                    <button className="btn-reset" style={{ width: '100%', padding: '18px', background: 'var(--primary)', color: 'white', borderRadius: '100px', fontWeight: '700' }} onClick={() => window.location.href = '/login'}>
                        Detailed Analysis & Solutions
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentQ = questions[activeQuestion];

    return (
        <section style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '100vh', background: 'var(--background)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                {/* Header: Progress & Timer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <div className="academic-badge" style={{ marginBottom: '1rem' }}>DIAGNOSTIC PROTOCOL</div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>Question {activeQuestion + 1} <span style={{ color: 'var(--text-muted)' }}>/ {questions.length}</span></h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: timeLeft < 10 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)', borderRadius: '100px', border: timeLeft < 10 ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)' }}>
                            <Clock size={18} color={timeLeft < 10 ? '#ef4444' : 'white'} />
                            <span style={{ fontWeight: '700', color: timeLeft < 10 ? '#ef4444' : 'white', fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>{timeLeft}</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginBottom: '4rem', borderRadius: '10px' }}>
                    <motion.div
                        animate={{ width: `${((activeQuestion + 1) / questions.length) * 100}%` }}
                        style={{ height: '100%', background: 'var(--primary)', borderRadius: '10px' }}
                    />
                </div>

                {/* Question Area */}
                <div className="glass-card" style={{ padding: '3rem', borderRadius: '2rem', marginBottom: '2rem' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2.5rem', lineHeight: 1.5, color: 'white' }}>
                        {currentQ.text}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                        {currentQ.options.map((opt, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleOptionSelect(idx)}
                                className="btn-reset"
                                style={{
                                    padding: '20px 24px',
                                    borderRadius: '16px',
                                    border: selectedOption === idx ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                                    background: selectedOption === idx ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                                    color: selectedOption === idx ? 'white' : 'var(--text-muted)',
                                    textAlign: 'left',
                                    fontSize: '1.1rem',
                                    fontWeight: '500',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        border: selectedOption === idx ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.8rem', fontWeight: '700'
                                    }}>
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    {opt}
                                </span>
                                {selectedOption === idx && <CheckCircle size={20} color="var(--primary)" />}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={handleNext}
                        disabled={selectedOption === null}
                        className="btn-reset"
                        style={{
                            padding: '16px 40px',
                            background: selectedOption !== null ? 'white' : 'rgba(255,255,255,0.1)',
                            color: selectedOption !== null ? 'black' : 'rgba(255,255,255,0.3)',
                            borderRadius: '100px',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.3s'
                        }}
                    >
                        {activeQuestion === questions.length - 1 ? 'Finish Analysis' : 'Next Question'} <ChevronRight size={20} />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default DiagnosticTest;
