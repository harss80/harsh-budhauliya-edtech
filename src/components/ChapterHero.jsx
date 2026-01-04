import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChapterHero = () => {
    return (
        <section className="section-wrapper" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(300px, 0.8fr)', gap: '4rem', alignItems: 'center', width: '100%' }}>

                <div style={{ position: 'relative' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="handwritten" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem', transform: 'rotate(-2deg)' }}>
                            Chapter 1: The Beginning
                        </span>
                        <h1 style={{ fontSize: '5rem', lineHeight: '0.9', marginBottom: '2rem', color: '#111827' }}>
                            Rewrite Your <br /><span style={{ color: 'var(--royal-blue)' }}>Destiny.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '3rem', maxWidth: '500px', lineHeight: '1.8' }}>
                            The comprehensive digital guide to cracking NEET & JEE.
                            Structured practice, concept mastery, and proven strategies
                            documented for your success.
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <Link to="/questions" className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '1.2rem', borderRadius: '50px' }}>
                                Start Reading <ArrowRight size={20} />
                            </Link>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ display: 'flex' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>4.9/5 Student Rating</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 3D Book Illustration */}
                <motion.div
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ perspective: '1000px' }}
                >
                    <div style={{
                        width: '100%',
                        paddingBottom: '120%',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                        borderRadius: '20px 4px 4px 20px',
                        boxShadow: '20px 20px 50px rgba(0,0,0,0.3), inset 5px 0 20px rgba(255,255,255,0.1)',
                        position: 'relative',
                        transform: 'rotateY(-15deg) rotateX(5deg)',
                        transformStyle: 'preserve-3d'
                    }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', width: '80%' }}>
                            <div style={{ fontSize: '1.5rem', letterSpacing: '4px', marginBottom: '2rem', opacity: 0.8 }}>EDITION 2026</div>
                            <h2 style={{ fontSize: '3.5rem', fontFamily: 'Cinzel', marginBottom: '1rem' }}>DIGI<br />MENTORS</h2>
                            <div style={{ width: '60px', height: '4px', background: 'var(--highlight-gold)', margin: '2rem auto' }}></div>
                            <p style={{ fontStyle: 'italic', opacity: 0.9 }}>The Ultimate Guide</p>
                        </div>

                        {/* Pages Effect */}
                        <div style={{
                            position: 'absolute',
                            right: '-15px',
                            top: '5px',
                            bottom: '5px',
                            width: '20px',
                            background: '#f8fafc',
                            borderRadius: '0 4px 4px 0',
                            boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.1)',
                            transform: 'translateZ(-10px)'
                        }}></div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default ChapterHero;
