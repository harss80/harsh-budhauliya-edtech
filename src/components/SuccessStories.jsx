import React from 'react';

const SuccessStories = () => {
    return (
        <section className="section-wrapper" style={{ minHeight: '60vh' }}>
            <div className="chapter-title">
                <span className="chapter-number" style={{ color: '#d1d5db' }}>05</span>
                <div>
                    <h2 style={{ fontSize: '2.5rem' }}>Success Stories</h2>
                    <p style={{ color: '#6b7280' }}>Heroes of Digimentors.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[1, 2, 3].map((i) => (
                    <div key={i} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e0f2fe' }}></div>
                            <div>
                                <h4 style={{ fontWeight: 'bold' }}>Student Name {i}</h4>
                                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>IIT Bombay (AIR {i * 45})</p>
                            </div>
                        </div>
                        <p style={{ fontStyle: 'italic', color: '#4b5563' }}>
                            "Digimentors helped me visualize concepts that I was struggling with. The practice questions were exactly like the real exam."
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SuccessStories;
