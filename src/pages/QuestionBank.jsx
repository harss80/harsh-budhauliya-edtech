import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Microscope, Calculator, ArrowRight } from 'lucide-react';

const QuestionBank = () => {
    const navigate = useNavigate();

    const handleSelect = (exam) => {
        navigate(`/practice/${exam}/all`);
    };

    return (
        <div className="section-padding" style={{ background: 'var(--bg-soft)', minHeight: '80vh' }}>
            <div className="container">
                <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 'bold' }}>Select Your Exam Goal</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>

                    {/* NEET Card */}
                    <div className="card" style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '6px solid var(--accent-green)' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'inline-flex', padding: '1.5rem', background: '#ecfdf5', borderRadius: '50%', color: 'var(--accent-green)' }}>
                            <Microscope size={48} />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>NEET Question Bank</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#6b7280', flexWrap: 'wrap' }}>
                            <span style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '12px' }}>Physics</span>
                            <span style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '12px' }}>Chemistry</span>
                            <span style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '12px' }}>Biology</span>
                        </div>
                        <p style={{ marginBottom: '2rem', color: 'var(--text-gray)' }}>500+ Practice Questions tailored for medical aspirants. Easy to Hard difficulty levels.</p>
                        <button onClick={() => handleSelect('NEET')} className="btn btn-secondary" style={{ width: '100%' }}>
                            Start NEET Practice <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* JEE Card */}
                    <div className="card" style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '6px solid var(--primary-blue)' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'inline-flex', padding: '1.5rem', background: '#eff6ff', borderRadius: '50%', color: 'var(--primary-blue)' }}>
                            <Calculator size={48} />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>JEE Question Bank</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#6b7280', flexWrap: 'wrap' }}>
                            <span style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '12px' }}>Physics</span>
                            <span style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '12px' }}>Chemistry</span>
                            <span style={{ background: '#f3f4f6', padding: '4px 12px', borderRadius: '12px' }}>Mathematics</span>
                        </div>
                        <p style={{ marginBottom: '2rem', color: 'var(--text-gray)' }}>500+ Practice Questions tailored for engineering aspirants. Concept building to advanced.</p>
                        <button onClick={() => handleSelect('JEE')} className="btn btn-primary" style={{ width: '100%' }}>
                            Start JEE Practice <ArrowRight size={20} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuestionBank;
