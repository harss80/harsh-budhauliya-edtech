
import React from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, Users, Zap, Search,
    ArrowRight, Star, Heart, Coffee,
    Monitor, Video, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {

    const benefits = [
        { icon: Zap, title: "High Impact", desc: "Shape the future of millions of students across India." },
        { icon: Star, title: "Competitive Pay", desc: "Best-in-industry compensation and ESOPs for top performers." },
        { icon: Heart, title: "Wellness", desc: "Comprehensive health insurance and wellness leave policy." },
        { icon: Users, title: "Great Culture", desc: "Work with ex-Google, ex-Amazon, and IITian colleagues." },
        { icon: Coffee, title: "Flexible Work", desc: "Remote-first culture with optional office hubs." },
        { icon: Monitor, title: "Tech First", desc: "Access to the latest MacBooks and software tools." }
    ];

    const openRoles = [
        { title: "Senior React Developer", team: "Engineering", type: "Remote", link: "#" },
        { title: "Product Designer (UX/UI)", team: "Design", type: "Bangalore", link: "#" },
        { title: "Academic Counselor", team: "Sales", type: "Noida", link: "#" },
        { title: "Social Media Manager", team: "Marketing", type: "Remote", link: "#" }
    ];

    return (
        <div style={{ background: '#050505', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: 'white', paddingTop: '80px' }}>

            {/* Hero Section */}
            <section style={{ padding: '80px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 24px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '8px 16px', borderRadius: '100px', fontSize: '0.9rem', fontWeight: '700', marginBottom: '2rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <Briefcase size={16} /> We are Hiring!
                    </div>
                    <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Build the Future of <br />
                        <span className="gradient-text" style={{ background: 'linear-gradient(to right, #34d399, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Education.</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#a1a1aa', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                        Join a team of dreamers and doers who are obsessed with making quality education accessible to every corner of the world.
                    </p>

                    <button onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })} className="btn-reset" style={{ padding: '16px 36px', background: 'white', color: 'black', borderRadius: '100px', fontWeight: '700', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        View Openings <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            {/* Educator CTA Box (Featured) */}
            <section style={{ padding: '40px 0' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                        borderRadius: '24px', padding: '3rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px -12px rgba(49, 46, 129, 0.5)'
                    }}>
                        <div style={{ maxWidth: '600px' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                                <span style={{ background: '#4f46e5', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>RECOMMENDED</span>
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '1rem' }}>Become an Educator</h2>
                            <p style={{ fontSize: '1.1rem', color: '#c7d2fe', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Are you passionate about teaching? Join our star faculty pool. Upload your demo lectures, set your own schedule, and reach millions of students.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                                {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'].map(sub => (
                                    <span key={sub} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e0e7ff', fontSize: '0.9rem', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '100px' }}>
                                        <CheckCircle size={14} /> {sub}
                                    </span>
                                ))}
                            </div>
                            <Link to="/teacher-registration" className="btn-reset" style={{ padding: '14px 32px', background: 'white', color: '#1e1b4b', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Apply as Educator <Video size={18} />
                            </Link>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ width: '300px', height: '300px', background: 'white', borderRadius: '20px', padding: '10px', transform: 'rotate(3deg)' }}>
                                <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} alt="Teacher" />
                                <div style={{ position: 'absolute', bottom: '20px', left: '-30px', background: '#f59e0b', color: 'black', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                    Earn ₹1L - ₹5L / Month
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem' }}>Why Join Us?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {benefits.map((b, i) => (
                            <div key={i} style={{ padding: '2rem', background: '#18181b', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#10b981' }}>
                                    <b.icon size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{b.title}</h3>
                                <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section id="openings" style={{ padding: '80px 0', background: '#0a0a0c' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '3rem' }}>Current Openings</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {openRoles.map((role, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: '#18181b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.2s', cursor: 'pointer' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                            >
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px' }}>{role.title}</h3>
                                    <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{role.team} • {role.type}</div>
                                </div>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ArrowRight size={20} color="white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Careers;
