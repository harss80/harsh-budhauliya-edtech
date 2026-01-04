import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { questionPool } from '../data/questions';
import { ArrowLeft, CheckCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Practice = () => {
    const { exam } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        // Filter questions based on exam (NEET or JEE) + Common questions (BOTH)
        const filtered = questionPool.filter(q => q.type === 'BOTH' || q.type === exam);
        // Shuffle and pick 10 for demo (or all)
        const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuestions(shuffled);
    }, [exam]);

    const handleOptionClick = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleNext = () => {
        if (selectedOption === null) return;

        // Check answer
        if (selectedOption === questions[currentQIndex].answer) {
            setScore(score + 1);
        }

        setIsAnswered(false);
        setSelectedOption(null);

        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(currentQIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const restart = () => {
        window.location.reload();
    };

    if (questions.length === 0) return <div className="section-padding text-center">Loading Questions...</div>;

    if (showResult) {
        return (
            <div className="section-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ textAlign: 'center', background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%' }}
                >
                    <div style={{ marginBottom: '1.5rem', color: 'var(--accent-green)' }}>
                        <CheckCircle size={64} style={{ margin: '0 auto' }} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Practice Completed!</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)', marginBottom: '2rem' }}>
                        You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
                    </p>
                    <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', fontStyle: 'italic', color: 'var(--primary-blue-dark)' }}>
                        "Success is the sum of small efforts, repeated day in and day out."
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button onClick={restart} className="btn btn-primary"> <RefreshCw size={18} /> Practice Again</button>
                        <Link to="/" className="btn" style={{ border: '1px solid #e5e7eb' }}>Go Home</Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQ = questions[currentQIndex];
    const progress = ((currentQIndex) / questions.length) * 100;

    return (
        <div className="section-padding" style={{ background: 'var(--bg-soft)', minHeight: '90vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>

                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/questions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)', fontWeight: '500' }}>
                        <ArrowLeft size={20} /> Exit Practice
                    </Link>
                    <div style={{ fontWeight: '600', color: 'var(--primary-blue)' }}>
                        Question {currentQIndex + 1}/{questions.length}
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', marginBottom: '2rem', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{ height: '100%', background: 'var(--primary-blue)', borderRadius: '3px' }}
                    />
                </div>

                <motion.div
                    key={currentQ.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                >
                    <span style={{ display: 'inline-block', padding: '4px 12px', background: '#f3f4f6', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-gray)', marginBottom: '1rem' }}>
                        {currentQ.subject}
                    </span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '2rem', lineHeight: '1.5' }}>
                        {currentQ.question}
                    </h2>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {currentQ.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(idx)}
                                style={{
                                    textAlign: 'left',
                                    padding: '1.2rem',
                                    borderRadius: '12px',
                                    border: selectedOption === idx ? '2px solid var(--primary-blue)' : '1px solid #e5e7eb',
                                    background: selectedOption === idx ? '#eff6ff' : 'white',
                                    fontSize: '1.1rem',
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    fontWeight: selectedOption === idx ? '500' : '400'
                                }}
                            >
                                <span style={{ display: 'inline-flex', width: '28px', height: '28px', background: selectedOption === idx ? 'var(--primary-blue)' : '#f3f4f6', color: selectedOption === idx ? 'white' : 'gray', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', marginRight: '1rem', fontWeight: '600' }}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                {opt}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleNext}
                            disabled={selectedOption === null}
                            className="btn btn-primary"
                            style={{ opacity: selectedOption === null ? 0.5 : 1, cursor: selectedOption === null ? 'not-allowed' : 'pointer' }}
                        >
                            Next Question <ChevronRight size={20} />
                        </button>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Practice;
