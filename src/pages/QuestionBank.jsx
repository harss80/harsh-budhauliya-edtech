
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Microscope, Calculator, ArrowRight, BookOpen, Atom, PenTool, Target, Brain, Sparkles, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const QuestionBank = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    const handleSelect = (exam) => {
        navigate(`/practice/${exam}/all`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const categories = ['All', 'Medical', 'Engineering', 'Foundation'];

    return (
        <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '100px', paddingBottom: '80px', color: 'white', fontFamily: '"Inter", sans-serif' }}>
            <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}
                >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '8px 16px', borderRadius: '100px', fontSize: '0.9rem', fontWeight: '600' }}>
                        <Brain size={18} /> <span style={{ letterSpacing: '0.05em' }}>INFINITE QUESTION BANK</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Practice Perfect. <br />
                        <span style={{ background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Score Perfect.</span>
                    </h1>
                    <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                        Access over 50,000+ premium questions tailored for JEE, NEET, and Foundation. AI-driven difficulty adjustment included.
                    </p>

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className="btn-reset"
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '100px',
                                    background: filter === cat ? 'white' : 'rgba(255,255,255,0.05)',
                                    color: filter === cat ? 'black' : '#a1a1aa',
                                    border: filter === cat ? '1px solid white' : '1px solid rgba(255,255,255,0.1)',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Background Glow */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none', filter: 'blur(100px)' }}></div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}
                >

                    {/* NEET Card */}
                    {(filter === 'All' || filter === 'Medical') && (
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ y: -10, boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.2)' }}
                            style={{ background: '#18181b', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ height: '200px', background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent)' }} />
                                <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <Microscope size={40} color="white" />
                                </div>
                                <div style={{ position: 'absolute', bottom: '20px', left: '24px', color: 'white' }}>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '800', lineHeight: 1 }}>NEET UG</h2>
                                    <div style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: '600', letterSpacing: '0.05em' }}>MEDICAL ENTRANCE</div>
                                </div>
                            </div>

                            <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#d4d4d8', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px' }}><Atom size={14} color="#34d399" /> Physics</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#d4d4d8', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px' }}><Target size={14} color="#34d399" /> Chemistry</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#d4d4d8', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px' }}><Microscope size={14} color="#34d399" /> Biology</span>
                                </div>

                                <p style={{ color: '#a1a1aa', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                                    Comprehensive coverage of PCB with special focus on NCERT-based questions for Biology.
                                </p>

                                <button
                                    onClick={() => handleSelect('NEET')}
                                    className="btn-reset"
                                    style={{ marginTop: 'auto', width: '100%', padding: '18px', background: '#10b981', color: 'black', borderRadius: '14px', fontWeight: '700', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                                >
                                    Start Practice <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* JEE Card */}
                    {(filter === 'All' || filter === 'Engineering') && (
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ y: -10, boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.2)' }}
                            style={{ background: '#18181b', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ height: '200px', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2), transparent)' }} />
                                <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <Calculator size={40} color="white" />
                                </div>
                                <div style={{ position: 'absolute', bottom: '20px', left: '24px', color: 'white' }}>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '800', lineHeight: 1 }}>JEE Main</h2>
                                    <div style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: '600', letterSpacing: '0.05em' }}>ENGINEERING ENTRANCE</div>
                                </div>
                            </div>

                            <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#d4d4d8', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px' }}><Atom size={14} color="#60a5fa" /> Physics</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#d4d4d8', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px' }}><Target size={14} color="#60a5fa" /> Chemistry</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#d4d4d8', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px' }}><PenTool size={14} color="#60a5fa" /> Maths</span>
                                </div>

                                <p style={{ color: '#a1a1aa', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                                    Master PCM with problems ranging from Mains to Advanced level.
                                </p>

                                <button
                                    onClick={() => handleSelect('JEE')}
                                    className="btn-reset"
                                    style={{ marginTop: 'auto', width: '100%', padding: '18px', background: '#3b82f6', color: 'white', borderRadius: '14px', fontWeight: '700', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
                                >
                                    Start Practice <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                </motion.div>
            </div>
        </div>
    );
};

export default QuestionBank;
