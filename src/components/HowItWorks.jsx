import React from 'react';
import { motion } from 'framer-motion';

const stepData = [
    { num: '01', title: 'Interactive Learning', desc: 'Engage with bite-sized, high-impact modules that simplify the most challenging concepts.' },
    { num: '02', title: 'Adaptive Assessments', desc: 'Our machine learning algorithms tailor your practice sessions to your unique learning curve.' },
    { num: '03', title: 'Collaborative Environment', desc: 'Learn alongside dedicated peers in collaborative live sessions and peer-to-peer benchmarking.' },
    { num: '04', title: 'Strategic Analytics', desc: 'Receive detailed reports on cognitive strengths and mapping your path to improvement.' },
];

const HowItWorks = () => {
    return (
        <section id="methodology" style={{ padding: '120px 0', background: 'var(--background)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <div className="academic-badge" style={{ marginBottom: '1.5rem' }}>
                        OUR METHODOLOGY
                    </div>
                    <h2 style={{ fontSize: 'var(--font-sizes-h2)', fontWeight: '800' }}>A Scientific Approach to <span className="gradient-text">Learning.</span></h2>
                </div>

                <div className="wide-grid">
                    {stepData.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            style={{
                                position: 'relative',
                                padding: '2.5rem',
                                background: 'var(--surface)',
                                borderRadius: '24px',
                                border: '1px solid var(--border)',
                                backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)'
                            }}
                        >
                            <div style={{
                                fontSize: '5rem',
                                fontWeight: '900',
                                color: 'var(--primary)',
                                opacity: 0.05,
                                position: 'absolute',
                                top: '10px',
                                right: '20px',
                                pointerEvents: 'none',
                                fontFamily: 'Outfit'
                            }}>
                                {step.num}
                            </div>
                            <div style={{ width: '40px', height: '4px', background: 'var(--primary)', marginBottom: '1.5rem', borderRadius: '2px' }}></div>
                            <h3 style={{ fontSize: 'var(--font-sizes-h3)', marginBottom: '1.2rem', fontWeight: '700' }}>{step.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: 'var(--font-sizes-body)' }}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
