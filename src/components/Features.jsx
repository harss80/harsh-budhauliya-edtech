import React from 'react';
import { Target, BookOpen, Users, Zap } from 'lucide-react';

const icons = {
    Target: <Target size={40} className="text-primary" />,
    BookOpen: <BookOpen size={40} className="text-accent" />,
    Users: <Users size={40} className="text-primary" />,
    Zap: <Zap size={40} className="text-accent" />
};

const FeatureCard = ({ icon, title, text }) => (
    <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid #f3f4f6',
        transition: 'transform 0.3s ease',
        cursor: 'default'
    }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
        <div style={{ marginBottom: '1.5rem', background: '#f0f9ff', width: 'fit-content', padding: '1rem', borderRadius: '12px' }}>
            {icons[icon]}
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>{title}</h3>
        <p style={{ color: 'var(--text-gray)' }}>{text}</p>
    </div>
);

const Features = () => {
    return (
        <section className="section-padding" style={{ backgroundColor: 'white' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Why Digimentors?</h2>
                    <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>Everything you need to crack your dream exam.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <FeatureCard
                        icon="Target"
                        title="NEET & JEE Focused"
                        text="Curated specifically for medical and engineering aspirants with exam-relevant patterns."
                    />
                    <FeatureCard
                        icon="BookOpen"
                        title="Concept-based Learning"
                        text="Questions designed to build strong conceptual clarity from basics to advanced."
                    />
                    <FeatureCard
                        icon="Users"
                        title="For 11th, 12th & Droppers"
                        text="Tailored content for every stage of your preparation journey."
                    />
                    <FeatureCard
                        icon="Zap"
                        title="Smart Question Bank"
                        text="Adaptive difficulty levels to test your skills at every step."
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
