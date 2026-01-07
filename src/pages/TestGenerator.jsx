import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chaptersList } from '../data/realQuestions';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, CheckCircle, Layers, Zap, BookOpen, Activity } from 'lucide-react';

const TestGenerator = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState({
        exam: 'NEET', // Default
        class: [],
        subjects: [],
        chapters: [],
        questionCount: 10
    });

    // Helper to toggle selection in arrays
    const toggleSelection = (field, value) => {
        setConfig(prev => {
            const current = prev[field];
            if (current.includes(value)) {
                return { ...prev, [field]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...current, value] };
            }
        });
    };

    // Auto-select subjects based on Exam
    useEffect(() => {
        if (config.exam === 'NEET') {
            setConfig(prev => ({ ...prev, subjects: ['Physics', 'Chemistry', 'Biology'] }));
        } else {
            setConfig(prev => ({ ...prev, subjects: ['Physics', 'Chemistry', 'Mathematics'] }));
        }
    }, [config.exam]);

    const getAvailableChapters = () => {
        let chapters = [];
        const classes = config.class.length > 0 ? config.class : ['Class 11', 'Class 12'];

        config.subjects.forEach(sub => {
            if (chaptersList[sub]) {
                classes.forEach(cls => {
                    if (chaptersList[sub][cls]) {
                        // Tag each chapter with its subject for better UI grouping
                        const subChapters = chaptersList[sub][cls].map(c => ({ name: c, subject: sub, class: cls }));
                        chapters = [...chapters, ...subChapters];
                    }
                });
            }
        });
        return chapters;
    };

    const handleStartTest = () => {
        // Validation
        if (config.chapters.length === 0) {
            alert("Please select at least one chapter!");
            return;
        }

        // Save config to local storage
        localStorage.setItem('custom_test_config', JSON.stringify(config));
        navigate('/attempt-test/custom-generated');
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // --- UI COMPONENTS ---

    const StepIndicator = () => (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
                {[1, 2, 3, 4].map(s => (
                    <div key={s} style={{
                        width: '40px', height: '40px',
                        borderRadius: '50%',
                        background: s <= step ? 'var(--primary)' : 'var(--surface)',
                        border: s <= step ? 'none' : '1px solid rgba(255,255,255,0.2)',
                        color: s <= step ? 'white' : 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '700',
                        boxShadow: s <= step ? '0 0 15px var(--primary-glow)' : 'none',
                        transition: 'all 0.3s ease'
                    }}>
                        {s < step ? <Check size={20} /> : s}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="section-padding" style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="academic-badge" style={{ marginBottom: '1rem' }}>Custom Practice</div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                        Build Your <span className="gradient-text">Perfect Test</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Select specific topics to target your weak areas.</p>
                </div>

                <StepIndicator />

                <div className="glass-card" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>

                    <div style={{ flex: 1, padding: '2rem' }}>
                        <AnimatePresence mode='wait'>

                            {/* STEP 1: EXAM & CLASS */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Zap color="#f59e0b" fill="rgba(245, 158, 11, 0.2)" /> Target Exam & Class
                                    </h2>

                                    <div style={{ marginBottom: '3rem' }}>
                                        <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Target Exam</label>
                                        <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                            {['NEET', 'JEE Main'].map(e => (
                                                <button
                                                    key={e}
                                                    onClick={() => setConfig({ ...config, exam: e })}
                                                    className="btn-reset"
                                                    style={{
                                                        padding: '2rem',
                                                        borderRadius: '16px',
                                                        border: config.exam === e ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                                                        background: config.exam === e ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
                                                        textAlign: 'left',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: config.exam === e ? 'white' : 'var(--text-muted)', marginBottom: '8px' }}>{e}</div>
                                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{e === 'NEET' ? 'Medical Entrance' : 'Engineering Entrance'}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-muted)', fontWeight: '600' }}>Select Class</label>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            {['Class 11', 'Class 12'].map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => toggleSelection('class', c)}
                                                    className="btn-reset"
                                                    style={{
                                                        flex: '1 1 150px',
                                                        padding: '1.5rem',
                                                        borderRadius: '12px',
                                                        border: config.class.includes(c) ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
                                                        background: config.class.includes(c) ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)',
                                                        color: config.class.includes(c) ? 'white' : 'var(--text-muted)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                                        fontWeight: '600',
                                                        fontSize: '1.1rem',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {config.class.includes(c) && <CheckCircle size={20} color="var(--accent)" />}
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                        {config.class.length === 0 && <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#ef4444' }}>* Please select at least one class</p>}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: SUBJECTS */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    style={{ height: '100%' }}
                                >
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Activity color="#ec4899" fill="rgba(236, 72, 153, 0.2)" /> Select Subjects
                                    </h2>
                                    <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                        {(config.exam === 'NEET' ? ['Physics', 'Chemistry', 'Biology'] : ['Physics', 'Chemistry', 'Mathematics']).map(sub => (
                                            <button
                                                key={sub}
                                                onClick={() => toggleSelection('subjects', sub)}
                                                className="btn-reset"
                                                style={{
                                                    padding: '2rem',
                                                    borderRadius: '16px',
                                                    background: config.subjects.includes(sub) ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                                                    border: config.subjects.includes(sub) ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s',
                                                    boxShadow: config.subjects.includes(sub) ? '0 10px 30px -5px var(--primary-glow)' : 'none',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>{sub}</h3>
                                                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                                    {config.subjects.includes(sub) ? 'Included' : 'Click to Add'}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: CHAPTERS */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                                        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <Layers color="#10b981" fill="rgba(16, 185, 129, 0.2)" /> Select Chapters
                                        </h2>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button
                                                className="btn-reset"
                                                style={{ fontSize: '0.9rem', color: 'var(--primary-light)', fontWeight: '600', padding: '8px 16px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}
                                                onClick={() => {
                                                    const all = getAvailableChapters().map(c => c.name);
                                                    setConfig(prev => ({ ...prev, chapters: all }));
                                                }}
                                            >
                                                Select All
                                            </button>
                                            <button
                                                className="btn-reset"
                                                style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', padding: '8px 16px' }}
                                                onClick={() => setConfig(prev => ({ ...prev, chapters: [] }))}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', height: '400px' }} className="custom-scrollbar">
                                        {config.subjects.length === 0 ? (
                                            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                                                Please select subjects in the previous step first.
                                            </div>
                                        ) : config.subjects.map(sub => (
                                            <div key={sub} style={{ marginBottom: '2.5rem' }}>
                                                <h3 style={{
                                                    fontSize: '1.2rem', color: 'white', marginBottom: '1.5rem',
                                                    display: 'flex', alignItems: 'center', gap: '10px',
                                                    position: 'sticky', top: 0, background: 'rgba(21, 23, 30, 0.95)',
                                                    padding: '10px 0', zIndex: 10, backdropFilter: 'blur(10px)'
                                                }}>
                                                    <span style={{ width: '4px', height: '24px', background: 'var(--primary)', borderRadius: '4px', display: 'block' }}></span>
                                                    {sub}
                                                </h3>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                                    {getAvailableChapters().filter(c => c.subject === sub).map(chap => (
                                                        <button
                                                            key={chap.name}
                                                            onClick={() => toggleSelection('chapters', chap.name)}
                                                            className="btn-reset"
                                                            style={{
                                                                padding: '1rem',
                                                                background: config.chapters.includes(chap.name) ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)',
                                                                border: config.chapters.includes(chap.name) ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255,255,255,0.08)',
                                                                borderRadius: '10px',
                                                                textAlign: 'left',
                                                                fontSize: '0.95rem',
                                                                display: 'flex',
                                                                alignItems: 'flex-start',
                                                                gap: '12px',
                                                                transition: 'all 0.2s',
                                                                fontWeight: config.chapters.includes(chap.name) ? '600' : '400',
                                                                color: config.chapters.includes(chap.name) ? 'white' : 'var(--text-muted)'
                                                            }}
                                                        >
                                                            <div style={{
                                                                width: '20px', height: '20px', borderRadius: '6px',
                                                                border: config.chapters.includes(chap.name) ? 'none' : '2px solid rgba(255,255,255,0.2)',
                                                                background: config.chapters.includes(chap.name) ? '#10b981' : 'transparent',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                flexShrink: 0, marginTop: '2px'
                                                            }}>
                                                                {config.chapters.includes(chap.name) && <Check size={14} color="white" strokeWidth={3} />}
                                                            </div>
                                                            <div style={{ flex: 1 }}>{chap.name}</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: REVIEW & START */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem' }}
                                >
                                    <div style={{
                                        width: '100px', height: '100px', background: 'linear-gradient(135deg, var(--primary), var(--academic-blue))',
                                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '2.5rem', boxShadow: '0 20px 40px -10px var(--primary-glow)'
                                    }}>
                                        <BookOpen size={48} color="white" />
                                    </div>
                                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Ready to Start?</h2>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '500px' }}>
                                        You have selected <strong style={{ color: 'white' }}>{config.chapters.length} chapters</strong> from your customized syllabus. The system will now generate a randomized set of questions.
                                    </p>

                                    <div style={{
                                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                                        padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '400px', marginBottom: '3rem'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Target Exam</span>
                                            <span style={{ fontWeight: '700', color: 'white' }}>{config.exam}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Subjects</span>
                                            <span style={{ fontWeight: '700', color: 'white' }}>{config.subjects.length} Selected</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Mode</span>
                                            <span style={{ fontWeight: '700', color: '#10b981' }}>Practice Mode</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleStartTest}
                                        className="btn-reset"
                                        style={{
                                            padding: '1.2rem 4rem',
                                            fontSize: '1.2rem', fontWeight: '700',
                                            background: 'white', color: 'black',
                                            borderRadius: '100px',
                                            boxShadow: '0 10px 30px -5px rgba(255,255,255,0.3)',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        Start Practice Session
                                    </button>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons Footer */}
                    <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {step > 1 ? (
                            <button onClick={prevStep} className="btn-reset" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontWeight: '600', padding: '10px 20px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
                                <ChevronLeft size={20} /> Back
                            </button>
                        ) : <div></div>}

                        {step < 4 ? (
                            <button
                                onClick={nextStep}
                                className="btn-reset"
                                disabled={step === 1 && config.class.length === 0}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    color: 'white', fontWeight: '700',
                                    padding: '12px 28px', borderRadius: '100px',
                                    background: (step === 1 && config.class.length === 0) ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                                    opacity: (step === 1 && config.class.length === 0) ? 0.5 : 1,
                                    cursor: (step === 1 && config.class.length === 0) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Next Step <ChevronRight size={20} />
                            </button>
                        ) : null}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TestGenerator;
