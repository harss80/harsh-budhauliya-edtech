import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import CourseExplorer from '../components/CourseExplorer';
import HowItWorks from '../components/HowItWorks';
import LiveFeed from '../components/LiveFeed';
import Popup from '../components/Popup';
import { ArrowUpRight } from 'lucide-react';

const FooterCTA = () => (
    <section style={{ padding: '80px 0', textAlign: 'center', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, background: 'radial-gradient(circle at center, var(--primary-glow) 0%, transparent 70%)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className="academic-badge" style={{ marginBottom: '2rem' }}>ADMISSION OPEN 2024</div>
            <h2 style={{ fontSize: 'var(--font-sizes-h2)', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                Begin Your Journey to <br /><span className="gradient-text">Academic Excellence.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sizes-body-lg)', marginBottom: '3.5rem', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
                Join 50,000+ students already mastering their future with Digimentors.
            </p>
            <button className="btn-reset" style={{ padding: '18px 40px', background: 'white', color: 'black', fontSize: '1rem', fontWeight: '800', borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', width: 'auto', maxWidth: '100%' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                Start Learning Now <ArrowUpRight size={24} />
            </button>
            <p style={{ marginTop: '2.5rem', color: 'var(--text-dim)', fontSize: '0.95rem' }}>Limited seats available for the 2024 Academic Session.</p>
        </div>
    </section>
);

const Home = () => {
    return (
        <div style={{ background: 'var(--background)' }}>
            <HeroSection />
            <StatsSection />
            <CourseExplorer />
            <HowItWorks />
            <LiveFeed />
            <FooterCTA />
        </div>
    );
};

export default Home;
