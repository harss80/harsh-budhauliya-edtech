import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadFormPopup = ({ isOpen, onClose, onSuccess }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', email: '', mobile: '', className: '', exam: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleSelection = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleNext = () => {
        if (step === 1 && (!formData.name || !formData.email || !formData.mobile)) return alert("Please fill details");
        setStep(step + 1);
    };

    const handleSubmit = () => {
        if (!formData.exam) return alert("Please select an exam");
        console.log("Lead Value:", formData);

        // Save to admin panel simulation
        // In real app, make API call here

        if (onSuccess) {
            onSuccess(formData);
        } else {
            // Default behavior if no onSuccess provided
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                        background: 'rgba(24, 24, 27, 0.8)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '32px',
                        padding: '3rem',
                        width: '95%',
                        maxWidth: '550px',
                        position: 'relative',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>

                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>
                            {step === 1 ? "Initialize Protocol" : step === 2 ? "Select Grid Level" : "Define Your Goal"}
                        </h2>
                        <p style={{ color: '#94a3b8', fontWeight: '500' }}>Step {step} of 3</p>
                        {/* Progress Bar */}
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                                style={{ height: '100%', background: 'linear-gradient(90deg, #4f46e5, #22d3ee)', transition: 'width 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
                            ></motion.div>
                        </div>
                    </div>

                    <div style={{ minHeight: '220px' }}>
                        {step === 1 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={inputStyle} />
                                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={inputStyle} />
                                <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} style={inputStyle} />
                            </div>
                        )}

                        {step === 2 && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                {['Class 11', 'Class 12', 'Dropper'].map((cls) => (
                                    <button
                                        key={cls}
                                        onClick={() => toggleSelection('className', cls)}
                                        style={{ ...optionButtonStyle, background: formData.className === cls ? 'rgba(79, 70, 229, 0.2)' : 'rgba(255,255,255,0.03)', border: formData.className === cls ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)', color: formData.className === cls ? 'white' : '#94a3b8' }}
                                    >
                                        {cls}
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 3 && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {['NEET', 'JEE'].map((exam) => (
                                    <button
                                        key={exam}
                                        onClick={() => toggleSelection('exam', exam)}
                                        style={{ ...optionButtonStyle, background: formData.exam === exam ? 'rgba(34, 211, 238, 0.2)' : 'rgba(255,255,255,0.03)', border: formData.exam === exam ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)', color: formData.exam === exam ? 'white' : '#94a3b8' }}
                                    >
                                        {exam}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: '2.5rem' }}>
                        {step < 3 ? (
                            <button onClick={handleNext} className="btn-reset" style={submitButtonStyle}>Proceed <ChevronRight size={18} /></button>
                        ) : (
                            <button onClick={handleSubmit} className="btn-reset" style={submitButtonStyle}>Access Intelligence Portal</button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const Popup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if lead already captured
        const hasLead = localStorage.getItem('digimentors_lead_captured');
        if (hasLead) return;

        const timer = setTimeout(() => {
            const alreadyCaptured = localStorage.getItem('digimentors_lead_captured');
            if (!alreadyCaptured) {
                setIsOpen(true);
            }
        }, 30000); // 30 seconds
        return () => clearTimeout(timer);
    }, []);

    const handleSuccess = (data) => {
        localStorage.setItem('digimentors_lead_captured', 'true');
        // Persist actual user data for Admin Panel visualization and Profile
        localStorage.setItem('digimentors_user_profile', JSON.stringify(data));
        setIsOpen(false);
        navigate('/test');
    };

    return <LeadFormPopup isOpen={isOpen} onClose={() => setIsOpen(false)} onSuccess={handleSuccess} />;
};

const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    fontSize: '1rem',
    color: 'white',
    outline: 'none',
    transition: 'all 0.2s',
};

const optionButtonStyle = {
    padding: '18px',
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: '600',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    fontFamily: 'Outfit'
};

const submitButtonStyle = {
    width: '100%',
    padding: '18px',
    background: 'white',
    color: 'black',
    borderRadius: '100px',
    fontWeight: '700',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s'
};

export { LeadFormPopup };
export default Popup;

