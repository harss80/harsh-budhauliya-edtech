import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveBattle = () => {
    const [activeUser, setActiveUser] = useState({ name: 'User123', score: 10 });
    const [opponent, setOpponent] = useState({ name: 'Opponent', score: 8 });

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveUser(prev => ({ ...prev, score: prev.score + Math.floor(Math.random() * 5) }));
            setOpponent(prev => ({ ...prev, score: prev.score + Math.floor(Math.random() * 5) }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="section-wrapper" style={{ minHeight: '60vh', background: '#f8fafc' }}>
            <div className="chapter-title">
                <span className="chapter-number" style={{ color: '#d1d5db' }}>03</span>
                <div>
                    <h2 style={{ fontSize: '2.5rem' }}>Live Battle Arena</h2>
                    <p style={{ color: '#6b7280' }}>Challenge peers in real-time.</p>
                </div>
            </div>

            <div style={{ padding: '3rem', background: 'white', borderRadius: '20px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '2rem', color: 'var(--royal-blue)' }}>PHYSICS DUEL - ROUND 1</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem' }}>🦸‍♂️</div>
                        <h3>You</h3>
                        <motion.div
                            key={activeUser.score}
                            initial={{ scale: 1.5, color: '#2563eb' }}
                            animate={{ scale: 1, color: '#1f2937' }}
                            style={{ fontSize: '2rem', fontWeight: 'bold' }}
                        >
                            {activeUser.score}
                        </motion.div>
                    </div>

                    <div style={{ fontSize: '2rem', fontStyle: 'italic', color: '#9ca3af' }}>VS</div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem' }}>🦹</div>
                        <h3>{opponent.name}</h3>
                        <motion.div
                            key={opponent.score}
                            initial={{ scale: 1.5, color: '#dc2626' }}
                            animate={{ scale: 1, color: '#1f2937' }}
                            style={{ fontSize: '2rem', fontWeight: 'bold' }}
                        >
                            {opponent.score}
                        </motion.div>
                    </div>
                </div>

                <p style={{ color: '#6b7280' }}>Subject: Rotational Motion • Difficulty: Hard</p>
                <button className="btn btn-primary" style={{ marginTop: '2rem' }}>Enter Arena</button>
            </div>
        </section>
    );
};

export default LiveBattle;
