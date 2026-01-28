import React from 'react';
import { motion } from 'framer-motion';
import { Users, Book, Trophy, Target } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className="card-base"
        style={{
            padding: '40px 24px',
            borderRadius: '24px',
            textAlign: 'center',
            background: 'var(--surface)'
        }}
    >
        <div style={{ width: '64px', height: '64px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--primary)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
            <Icon size={32} />
        </div>
        <h3 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-main)' }}>
            {value}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{label}</p>
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
