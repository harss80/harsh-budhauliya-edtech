
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, X, Check, FileText } from 'lucide-react';

const TeacherRegistration = () => {
    const [step, setStep] = useState(1); // 1: Info, 2: Qualifications, 3: Demo, 4: Success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        expYears: '',
        qualification: '',
        resume: null,
        demoLink: '',
        demoFile: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, field) => {
        if (e.target.files[0]) {
            setFormData({ ...formData, [field]: e.target.files[0] });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => setStep(4), 1500);
    };

    const InputGroup = ({ label, type = "text", name, placeholder, required = true }) => (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>{label} {required && '*'}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                style={{
                    width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                    color: 'white', fontSize: '1rem', outline: 'none'
                }}
            />
        </div>
    );

    return (
        <div style={{ background: '#050505', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: 'white', paddingTop: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <div className="container" style={{ maxWidth: '600px', width: '100%', padding: '24px' }}>
                <div style={{ padding: '32px', background: '#18181b', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>

                    {step < 4 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Become an Educator</h2>
                            <p style={{ color: '#a1a1aa' }}>Join our elite faculty. Share your knowledge with the world.</p>

                            {/* Steps Indicator */}
                            <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
                                {[1, 2, 3].map(s => (
                                    <div key={s} style={{ height: '4px', flex: 1, borderRadius: '4px', background: s <= step ? '#3b82f6' : 'rgba(255,255,255,0.1)' }} />
                                ))}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <InputGroup label="Full Name" name="name" placeholder="John Doe" />
                                <InputGroup label="Email Address" type="email" name="email" placeholder="john@example.com" />
                                <InputGroup label="Phone Number" type="tel" name="phone" placeholder="+91 98765 43210" />
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Primary Subject *</label>
                                    <select
                                        name="subject"
                                        onChange={handleChange}
                                        style={{
                                            width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                                            color: formData.subject ? 'white' : '#71717a', fontSize: '1rem', outline: 'none'
                                        }}
                                    >
                                        <option value="">Select Subject</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Chemistry">Chemistry</option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Biology">Biology</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>
                                <button type="button" onClick={() => setStep(2)} className="btn-reset" style={{ width: '100%', padding: '14px', background: '#3b82f6', color: 'white', borderRadius: '12px', fontWeight: '700', fontSize: '1rem' }}>
                                    Next: Qualifications
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <InputGroup label="Teaching Experience (Years)" type="number" name="expYears" placeholder="e.g. 5" />
                                <InputGroup label="Highest Qualification" name="qualification" placeholder="e.g. Ph.D. in Physics" />

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Upload Resume (PDF)</label>
                                    <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', textAlign: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('resume-upload').click()}>
                                        <FileText size={32} color="#a1a1aa" style={{ marginBottom: '8px' }} />
                                        <div style={{ fontSize: '0.9rem', color: '#e4e4e7' }}>{formData.resume ? formData.resume.name : 'Click to Upload Resume'}</div>
                                        <input id="resume-upload" type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'resume')} style={{ display: 'none' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="button" onClick={() => setStep(1)} className="btn-reset" style={{ flex: 1, padding: '14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '12px', fontWeight: '600' }}>Back</button>
                                    <button type="button" onClick={() => setStep(3)} className="btn-reset" style={{ flex: 1, padding: '14px', background: '#3b82f6', color: 'white', borderRadius: '12px', fontWeight: '700' }}>Next: Demo</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.2)', padding: '16px', borderRadius: '12px', marginBottom: '2rem' }}>
                                    <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: '700', marginBottom: '4px' }}>Demo Lecture Required</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#d4d4d8' }}>Please provide a link to a sample lecture (YouTube/Drive) or upload a short video (Max 50MB).</p>
                                </div>

                                <InputGroup label="Demo Video Link (YouTube/GDrive)" name="demoLink" placeholder="https://..." required={false} />

                                <div style={{ textAlign: 'center', margin: '1rem 0', color: '#71717a' }}>OR</div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#a1a1aa' }}>Upload Demo Video</label>
                                    <div style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                                        onClick={() => document.getElementById('video-upload').click()}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    >
                                        <div style={{ width: '60px', height: '60px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#3b82f6' }}>
                                            <Upload size={24} />
                                        </div>
                                        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#e4e4e7' }}>{formData.demoFile ? formData.demoFile.name : 'Click to Upload Video'}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginTop: '4px' }}>MP4, WEBM up to 50MB</div>
                                        <input id="video-upload" type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'demoFile')} style={{ display: 'none' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="button" onClick={() => setStep(2)} className="btn-reset" style={{ flex: 1, padding: '14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '12px', fontWeight: '600' }}>Back</button>
                                    <button type="submit" className="btn-reset" style={{ flex: 1, padding: '14px', background: '#10b981', color: 'white', borderRadius: '12px', fontWeight: '700' }}>Submit Application</button>
                                </div>
                            </motion.div>
                        )}
                    </form>

                    {step === 4 && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{ width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 30px -10px rgba(16, 185, 129, 0.5)' }}>
                                <Check size={40} color="white" />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Application Received!</h2>
                            <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Thank you for your interest in Digimentors. Our academic team will review your demo lecture and get back to you within 3-4 working days.
                            </p>
                            <button onClick={() => window.location.href = '/'} className="btn-reset" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '100px', fontWeight: '600' }}>
                                Back to Home
                            </button>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default TeacherRegistration;
