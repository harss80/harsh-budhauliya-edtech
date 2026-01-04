import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, PenTool, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="section-padding" style={{ background: 'var(--bg-gradient)', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#e0f2fe', color: 'var(--primary-blue)', borderRadius: '20px', fontWeight: '600', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        🎓 For NEET & JEE Aspirants
                    </div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
                        Crack NEET & JEE with <span className="text-primary">Smart Practice</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-gray)', marginBottom: '2.5rem', maxWidth: '500px' }}>
                        Practice curated questions for Class 11, 12 & Droppers. Boost your preparation with our smart question bank.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/questions" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                            Start Practicing <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={18} className="text-accent" /> Concept-based
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={18} className="text-accent" /> Exam-focused
                        </div>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ position: 'relative' }}
                >
                    {/* Floating Icons Animation would go here ideally */}
                    <img
                        src="/hero-illustration.png"
                        alt="Student Studying"
                        style={{ width: '100%', height: 'auto', borderRadius: '20px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
                    />

                    {/* Floating Stickers */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '3rem', background: 'white', borderRadius: '50%', padding: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    >
                        📚
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                        style={{ position: 'absolute', bottom: '40px', left: '-30px', fontSize: '3rem', background: 'white', borderRadius: '50%', padding: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    >
                        🧬
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
