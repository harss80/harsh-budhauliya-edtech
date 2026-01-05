import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Changed Link to useNavigate
import { LeadFormPopup } from './Popup';

const CourseCard = ({ title, subjects, number, gradient, onStart }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card"
            style={{
                height: '100%',
                minHeight: '400px',
                borderRadius: '2rem',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            {/* Subtle Gradient Glow */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px',
                height: '300px',
                background: gradient,
                opacity: 0.1,
                filter: 'blur(80px)',
                borderRadius: '50%',
                pointerEvents: 'none',
                transform: 'translate(30%, -30%)'
            }}></div>
            {/* Academic ID Background */}
            <div style={{
                position: 'absolute',
                top: '-10px',
                right: '20px',
                fontSize: '8rem',
                fontWeight: '900',
                color: 'white',
                opacity: 0.02,
                fontFamily: 'Outfit',
                pointerEvents: 'none'
            }}>
                ID-{number}
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                    <div className="academic-badge" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
                        ANALYSIS PROTOCOL {number}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.1em' }}>[ DIAGNOSTIC ]</div>
                </div>
                <h3 style={{ fontSize: 'var(--font-sizes-h3)', fontWeight: '800', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'white' }}>
                    {title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    Evaluate your <span style={{ color: 'white', fontWeight: 'bold' }}>National Rank Potential</span>. Comprehensive performance breakdown with predictive analytics.
                </p>
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                    {['Expected Rank', 'Prep Score', 'Avg Time'].map((s) => (
                        <span
                            key={s}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                border: '1px solid rgba(255,255,255,0.06)',
                                color: 'var(--text-muted)',
                                fontWeight: '500'
                            }}
                        >
                            {s}
                        </span>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ height: '1px', flex: 1, background: 'var(--border)', opacity: 0.5 }}></div>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)', margin: '0 10px' }}></div>
                    <div style={{ height: '1px', flex: 1, background: 'var(--border)', opacity: 0.5 }}></div>
                </div>

                <button
                    onClick={onStart}
                    className="btn-reset"
                    style={{
                        width: '100%',
                        padding: '18px',
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: '1rem',
                        fontWeight: '700',
                        fontSize: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 20px -5px var(--primary-glow)',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.background = 'var(--primary-light)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'var(--primary)';
                    }}
                >
                    Start Diagnostic <ArrowRight size={20} />
                </button>
            </div>
        </motion.div>
    );
};

const CourseExplorer = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const courses = [
        { title: "Medical", subjects: ['NEET-UG', 'Biology', 'AIIMS Prep'], gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)" },
        { title: "JEE Main", subjects: ['Physics', 'Chemistry', 'Mathematics'], gradient: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)" },
        { title: "JEE Advanced", subjects: ['Concept Depth', 'Logic', 'Problem Solving'], gradient: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)" },
        { title: "Foundations", subjects: ['Classes 8-10', 'Olympiads', 'NTSE'], gradient: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)" }
    ];

    const handleStartDiagnostic = (courseTitle) => {
        const user = localStorage.getItem('digimentors_current_user');
        if (user) {
            // Generate a slug from the title (e.g. "Medical" -> "medical-diagnostic")
            const testId = `${courseTitle.toLowerCase().replace(/\s+/g, '-')}-diagnostic`;
            navigate(`/attempt-test/${testId}`);
        } else {
            // Redirect to login page
            navigate('/login');
        }
    };

    const handleLeadSuccess = (data) => {
        // Redundant with new Login flow, keeping for backward compat if needed, 
        // but core logic is now in Login.jsx
        setShowPopup(false);
    };

    return (
        <section id="programs" className="section-padding" style={{ background: 'var(--background)' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem', maxWidth: '800px' }}>
                    <div className="academic-badge" style={{ marginBottom: '1.5rem' }}>
                        ACADEMIC SPECIALIZATIONS
                    </div>
                    <h2 style={{ fontSize: 'var(--font-sizes-h2)', marginBottom: '1rem', lineHeight: 1.1, fontWeight: '800', letterSpacing: '-0.04em' }}>
                        Tailored for <br /><span className="gradient-text">Academic Excellence.</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-sizes-body-lg)', maxWidth: '500px' }}>
                        Expertly structured programs designed to maximize your potential and secure top ranks.
                    </p>
                </div>

                <div className="wide-grid">
                    {courses.map((course, idx) => (
                        <CourseCard
                            key={idx}
                            {...course}
                            number={`0${idx + 1}`}
                            onStart={() => handleStartDiagnostic(course.title)}
                        />
                    ))}
                </div>
            </div>

            <LeadFormPopup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                onSuccess={handleLeadSuccess}
            />
        </section>
    );
};

export default CourseExplorer;
