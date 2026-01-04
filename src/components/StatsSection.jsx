import React from 'react';
import { motion } from 'framer-motion';
import { Users, Book, Trophy, Target } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
        className="glass-card"
        style={{
            padding: '3rem 2rem',
            borderRadius: '32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        {/* Academic Data Markers */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '2px', height: '20px', background: 'var(--primary)', opacity: 0.3 }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '2px', height: '20px', background: 'var(--primary)', opacity: 0.3 }}></div>

        <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary-light)', border: '1px solid rgba(99,102,241,0.1)' }}>
            <Icon size={32} strokeWidth={1.5} />
        </div>
        <h3 style={{ fontSize: 'var(--font-sizes-h1)', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative' }}>
            {value}
            <span style={{ position: 'absolute', top: '-10px', right: '-20px', fontSize: '0.8rem', color: 'var(--primary)', opacity: 0.6 }}>[DATA]</span>
        </h3>
        <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: 'var(--font-sizes-sm)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</p>
    </motion.div>
);

const StatsSection = () => {
    return (
        <section id="success" style={{ padding: '100px 0', background: 'var(--background)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div className="academic-badge" style={{ marginBottom: '1.5rem' }}>
                        OUTCOMES & IMPACT
                    </div>
                    <h2 style={{ fontSize: 'var(--font-sizes-h2)', fontWeight: '800' }}>Proven Results in <span className="gradient-text">Academic Excellence.</span></h2>
                </div>
                <div className="responsive-grid">
                    <StatCard icon={Users} value="50k+" label="Mentored Scholars" delay={0} />
                    <StatCard icon={Book} value="10k+" label="Academic Modules" delay={0.1} />
                    <StatCard icon={Trophy} value="98.4%" label="Average Improvement" delay={0.2} />
                    <StatCard icon={Target} value="AIR 1" label="National Rankers" delay={0.3} />
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
