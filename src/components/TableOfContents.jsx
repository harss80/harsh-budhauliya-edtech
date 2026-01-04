import React from 'react';
import { motion } from 'framer-motion';

const TableOfContents = () => {
    const chapters = [
        { num: '01', title: 'Smart Practice', desc: 'Adaptive questions for mastery', color: '#2563eb' },
        { num: '02', title: 'Live Testing', desc: 'Real-time exam simulation', color: '#10b981' },
        { num: '03', title: 'Expert Guidance', desc: 'Strategies from toppers', color: '#f59e0b' },
        { num: '04', title: 'Performance Stats', desc: 'Deep analytics of your growth', color: '#8b5cf6' },
    ];

    return (
        <section className="section-wrapper" style={{ minHeight: '80vh' }}>
            <div className="chapter-title">
                <span className="chapter-number" style={{ color: '#d1d5db' }}>02</span>
                <div>
                    <h2 style={{ fontSize: '2.5rem' }}>Table of Contents</h2>
                    <p style={{ color: '#6b7280' }}>Your personalized curriculum.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
                {chapters.map((chap, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ translateY: -10 }}
                        style={{
                            background: 'white',
                            padding: '2rem',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                            borderLeft: `4px solid ${chap.color}`,
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#f3f4f6', position: 'absolute', right: '1rem', top: '0', zIndex: 0 }}>
                            {chap.num}
                        </div>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{chap.title}</h3>
                            <p style={{ color: '#6b7280' }}>------------------------</p>
                            <p style={{ color: '#4b5563', marginTop: '1rem' }}>{chap.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TableOfContents;
