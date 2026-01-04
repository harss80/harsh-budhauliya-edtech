import React from 'react';

const Roadmap = () => {
    const steps = [
        { title: 'Class 11 Basics', desc: 'Build foundation in Mechanics & Periodic Table', icon: '🌱' },
        { title: 'Class 12 Boards', desc: 'Master Calculus & Electrostatics', icon: '📝' },
        { title: 'Mock Tests Series', desc: 'Solve 50+ Full syllabus mocks', icon: '⚡' },
        { title: 'Final Revision', desc: 'Rapid fire Q&A and formula sheets', icon: '🔥' },
        { title: 'Exam Day', desc: 'Cracking the code to IIT/AIIMS', icon: '🏆' },
    ];

    return (
        <section className="section-wrapper">
            <div className="chapter-title">
                <span className="chapter-number" style={{ color: '#d1d5db' }}>04</span>
                <div>
                    <h2 style={{ fontSize: '2.5rem' }}>Your Roadmap</h2>
                    <p style={{ color: '#6b7280' }}>The path to glory.</p>
                </div>
            </div>

            <div style={{ position: 'relative', marginTop: '4rem', paddingLeft: '2rem' }}>
                <div style={{ position: 'absolute', left: '39px', top: 0, bottom: 0, width: '2px', background: '#e5e7eb' }}></div>

                {steps.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', position: 'relative' }}>
                        <div style={{ width: '40px', height: '40px', background: 'white', border: '2px solid var(--royal-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: '0 0 0 4px #eff6ff' }}>
                            {step.icon}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{step.title}</h3>
                            <p style={{ color: '#6b7280' }}>{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Roadmap;
