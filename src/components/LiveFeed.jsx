import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

const names = ['Aman', 'Siddharth', 'Megha', 'Rahul', 'Anamika', 'Tanmay', 'Kavya'];
const actions = ['completed Calculus Module', 'scored 98% in Biology Quiz', 'advanced to Medical Prep Phase 2', 'joined the Top 1% in Mathematics', 'earned the Excellence Badge'];

const LiveFeed = () => {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        // Initial empty state is already set by useState([])

        const interval = setInterval(() => {
            const newActivity = {
                id: Date.now(),
                name: names[Math.floor(Math.random() * names.length)],
                action: actions[Math.floor(Math.random() * actions.length)],
                // Using 'adventurer' style for 3D cartoon look, distinct seed for every user
                avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${Date.now()}&backgroundColor=b6e3f4,c0aede,d1d4f9`
            };
            setFeed(prev => [newActivity, ...prev].slice(0, 4)); // Keep last 4 items
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="community" className="section-padding" style={{ borderTop: '1px solid var(--border)', position: 'relative' }}>
            {/* Academic Blueprint Background */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }}></div>
            <div className="container grid-2-cols" style={{ alignItems: 'center', gap: '3rem' }}>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                        <div className="academic-badge">
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', marginRight: '8px' }}></span>
                            ACADEMIC PULSE
                        </div>
                    </div>
                    <h2 style={{ fontSize: 'var(--font-sizes-h2)', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: '800' }}>
                        Join a <span className="gradient-text">Scholastic Community</span> that Inspires.
                    </h2>
                    <p style={{ fontSize: 'var(--font-sizes-body-lg)', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.6 }}>
                        Collaborate with thousands of top-tier aspirants. Engage in peer-to-peer benchmarking, shared knowledge labs, and real-time academic competitive analysis.
                    </p>

                    <div style={{ padding: '1px', background: 'linear-gradient(135deg, var(--primary), var(--academic-blue))', borderRadius: '24px' }}>
                        <div style={{ background: 'var(--surface)', borderRadius: '23px', padding: '1.5rem' }}>
                            <h4 style={{ marginBottom: '2rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px', color: 'white', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                <Activity size={22} color="var(--primary-light)" />
                                <span style={{ letterSpacing: '0.05em' }}>LIVE ACADEMIC TELEMETRY</span>
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '280px', overflow: 'hidden', position: 'relative' }}>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, var(--surface), transparent)', zIndex: 10 }}></div>
                                <AnimatePresence mode='popLayout'>
                                    {feed.length === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}
                                        >
                                            Waiting for incoming telemetry...
                                        </motion.div>
                                    ) : (
                                        feed.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                layout
                                                style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                                            >
                                                <img
                                                    src={item.avatar}
                                                    alt="Avatar"
                                                    style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                                                />
                                                <div>
                                                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'white' }}>{item.name}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.action}</div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="only-desktop" style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                        position: 'absolute',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                        opacity: 0.3
                    }}></div>
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ textAlign: 'center', zIndex: 1 }}
                    >
                        <div style={{ fontSize: '8rem', fontWeight: '900', color: 'white', letterSpacing: '-0.05em', lineHeight: 1 }}>
                            50K+
                        </div>
                        <div className="academic-badge" style={{ marginTop: '1rem', color: 'var(--text-main)', border: 'none', background: 'transparent' }}>
                            SCHOLARS ACTIVE TODAY
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default LiveFeed;
