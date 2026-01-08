import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, Eye, EyeOff, LogIn, ChevronLeft, GraduationCap, School, BookOpen, LogOut, LayoutDashboard, Settings, Edit2, Shield, Save, X, Activity } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

// --- Styles ---
const headerStyle = { fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #e2e8f0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' };
const subHeaderStyle = { color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.5' };
const labelStyle = { display: 'block', fontSize: '0.85rem', color: '#d4d4d8', marginBottom: '8px', fontWeight: '600' };
const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(9, 9, 11, 0.6)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    color: 'white',
    outline: 'none',
    fontSize: '0.95rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)'
};
const inputGroupStyle = { display: 'flex', flexDirection: 'column' };
const primaryBtnStyle = {
    marginTop: '12px', padding: '16px',
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    color: 'white',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '1rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.5)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid rgba(255,255,255,0.1)'
};
const secondaryBtnStyle = {
    padding: '12px',
    background: 'rgba(255,255,255,0.03)',
    color: '#e4e4e7',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '0.95rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    border: '1px solid rgba(255,255,255,0.05)',
    transition: 'background 0.2s'
};
const iconBtnStyle = { padding: '8px', background: 'rgba(255,255,255,0.05)', color: '#d4d4d8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.05)' };
const errorStyle = { color: '#f87171', fontSize: '0.85rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' };
const successStyle = { color: '#34d399', fontSize: '0.85rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' };
const iconLocStyle = { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#71717a', pointerEvents: 'none' };
const passIconStyle = { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#a1a1aa', cursor: 'pointer', padding: '4px' };
const statCardStyle = { background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' };
const statLabelStyle = { fontSize: '0.7rem', color: '#a1a1aa', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' };
const statValStyle = { color: '#fff', fontWeight: '700', fontSize: '0.95rem' };

const Login = ({ onClose, defaultIsLogin = true }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Auth, 2: Education Details, 3: Profile View
    const [isLogin, setIsLogin] = useState(defaultIsLogin);
    const [currentUser, setCurrentUser] = useState(null);
    const [profileMode, setProfileMode] = useState('overview'); // 'overview', 'edit', 'security'

    // Auth Data
    const [authData, setAuthData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);

    // Education Data (Initial Setup)
    const [eduData, setEduData] = useState({ grade: '', targetExam: '', schoolName: '', city: '' });

    // Edit Profile Data
    const [editData, setEditData] = useState({});

    // Password Update Data
    const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });

    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('digimentors_current_user'));
        if (user) {
            setCurrentUser(user);
            if (user.educationDetails) {
                setStep(3);
                setEditData({
                    name: user.name,
                    email: user.email, // Read only mostly
                    ...user.educationDetails
                });
            } else {
                setStep(2);
            }
        }
    }, []);

    // Handlers
    const handleAuthChange = (e) => { setAuthData({ ...authData, [e.target.name]: e.target.value }); setError(''); };
    const handleEduChangeInitial = (e) => { setEduData({ ...eduData, [e.target.name]: e.target.value }); setError(''); };
    const handleEditChange = (e) => { setEditData({ ...editData, [e.target.name]: e.target.value }); setError(''); };
    const handlePassChange = (e) => { setPassData({ ...passData, [e.target.name]: e.target.value }); setError(''); };

    const saveUserToStorage = (updatedUser) => {
        localStorage.setItem('digimentors_current_user', JSON.stringify(updatedUser));
        const storedUsers = JSON.parse(localStorage.getItem('digimentors_users') || '[]');
        const idx = storedUsers.findIndex(u => u.email === updatedUser.email);
        if (idx !== -1) {
            storedUsers[idx] = updatedUser;
            localStorage.setItem('digimentors_users', JSON.stringify(storedUsers));
        }
        setCurrentUser(updatedUser);
    };

    const handleAuthSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            const storedUsers = JSON.parse(localStorage.getItem('digimentors_users') || '[]');
            const user = storedUsers.find(u => u.email === authData.email && u.password === authData.password);
            if (user) {
                // Update last login
                user.lastLogin = new Date().toLocaleString();

                // Update in full user list
                const userIndex = storedUsers.findIndex(u => u.email === user.email);
                if (userIndex !== -1) {
                    storedUsers[userIndex] = user;
                    localStorage.setItem('digimentors_users', JSON.stringify(storedUsers));
                }

                localStorage.setItem('digimentors_current_user', JSON.stringify(user));
                setCurrentUser(user);
                if (!user.educationDetails) setStep(2);
                else {
                    setStep(3);
                    setEditData({ name: user.name, email: user.email, ...user.educationDetails });
                    handleSuccessRedirect();
                }
            } else setError('Invalid email or password');
        } else {
            if (!authData.name || !authData.email || !authData.password) return setError('All fields required');
            if (authData.password !== authData.confirmPassword) return setError('Passwords do not match');

            const storedUsers = JSON.parse(localStorage.getItem('digimentors_users') || '[]');
            if (storedUsers.some(u => u.email === authData.email)) return setError('User exists');

            const newUser = {
                name: authData.name, email: authData.email, password: authData.password, phone: authData.phone || '',
                admissionId: 'ADM-' + Math.floor(100000 + Math.random() * 900000), // Unique 6-digit ID
                accessRights: [], // Array to store purchased course/test IDs
                joinDate: new Date().toLocaleDateString(),
                lastLogin: new Date().toLocaleString()
            };
            storedUsers.push(newUser);
            localStorage.setItem('digimentors_users', JSON.stringify(storedUsers));
            localStorage.setItem('digimentors_current_user', JSON.stringify(newUser));
            setCurrentUser(newUser);
            setStep(2); // Move to Edu Setup
        }
    };

    const handleEduSubmitInitial = (e) => {
        e.preventDefault();
        if (!eduData.grade || !eduData.targetExam) return setError('Required fields missing');
        const updatedUser = { ...currentUser, educationDetails: eduData };
        saveUserToStorage(updatedUser);
        handleSuccessRedirect();
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const updatedUser = {
            ...currentUser,
            name: editData.name,
            phone: editData.phone,
            educationDetails: {
                grade: editData.grade,
                targetExam: editData.targetExam,
                schoolName: editData.schoolName,
                city: editData.city || currentUser.educationDetails?.city || ''
            }
        };
        saveUserToStorage(updatedUser);
        setSuccessMsg('Profile updated!');
        setTimeout(() => { setSuccessMsg(''); setProfileMode('overview'); }, 1500);
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        if (passData.current !== currentUser.password) return setError('Incorrect current password');
        if (passData.new !== passData.confirm) return setError('Passwords do not match');
        if (passData.new.length < 6) return setError('Password too short');

        const updatedUser = { ...currentUser, password: passData.new };
        saveUserToStorage(updatedUser);
        setSuccessMsg('Password updated!');
        setPassData({ current: '', new: '', confirm: '' });
        setTimeout(() => { setSuccessMsg(''); setProfileMode('overview'); }, 1500);
    };

    const handleLogout = () => {
        localStorage.removeItem('digimentors_current_user');
        setCurrentUser(null);
        setStep(1);
        setIsLogin(true);
        setProfileMode('overview');
    };

    const handleSuccessRedirect = () => {
        if (onClose) onClose();
        else navigate('/test');
    };

    // --- Sub-Components for Tab Views ---

    const OverviewView = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Header Card */}
            <div style={{
                position: 'relative', overflow: 'hidden', padding: '2rem 1.5rem',
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)',
                marginBottom: '1.5rem', textAlign: 'center'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '80px', height: '80px', margin: '0 auto 1rem',
                        background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)',
                        padding: '3px', borderRadius: '50%',
                        boxShadow: '0 8px 24px rgba(147, 51, 234, 0.4)'
                    }}>
                        <div style={{ width: '100%', height: '100%', background: '#09090b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '800', color: 'white' }}>
                            {currentUser?.name?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '4px' }}>{currentUser?.name}</h2>
                    {currentUser?.admissionId && <div style={{ fontSize: '0.8rem', color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)', padding: '2px 10px', borderRadius: '100px', display: 'inline-block', marginBottom: '8px', border: '1px solid rgba(168, 85, 247, 0.2)', fontFamily: 'monospace' }}>ID: {currentUser.admissionId}</div>}
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{currentUser?.email}</p>
                    {currentUser?.phone && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{currentUser?.phone}</p>}
                </div>
                {/* Edit Actions */}
                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setEditData({ name: currentUser.name, phone: currentUser.phone || '', ...currentUser.educationDetails }); setProfileMode('edit'); }} className="btn-reset" title="Edit Profile" style={iconBtnStyle}><Edit2 size={16} /></button>
                    <button onClick={() => setProfileMode('security')} className="btn-reset" title="Security" style={iconBtnStyle}><Shield size={16} /></button>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.5rem' }}>
                <div style={statCardStyle}>
                    <div style={statLabelStyle}>Target</div>
                    <div style={statValStyle}>{currentUser?.educationDetails?.targetExam || 'N/A'}</div>
                </div>
                <div style={statCardStyle}>
                    <div style={statLabelStyle}>Grade</div>
                    <div style={statValStyle}>{currentUser?.educationDetails?.grade || 'N/A'}</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <button onClick={() => navigate('/test')} className="btn-reset" style={primaryBtnStyle}>
                    Open Dashboard <LayoutDashboard size={18} />
                </button>
                <button onClick={handleLogout} className="btn-reset" style={secondaryBtnStyle}>
                    Sign Out <LogOut size={18} />
                </button>
            </div>
        </motion.div>
    );

    const EditProfileView = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>Edit Profile</h3>
                <button onClick={() => setProfileMode('overview')} className="btn-reset" style={iconBtnStyle}><X size={18} /></button>
            </div>
            <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Full Name</label>
                    <input type="text" name="name" value={editData.name || ''} onChange={handleEditChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Phone Number</label>
                    <input type="text" name="phone" value={editData.phone || ''} onChange={handleEditChange} style={inputStyle} placeholder="Update Phone Number" />
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Target Exam</label>
                    <select name="targetExam" value={editData.targetExam || ''} onChange={handleEditChange} style={inputStyle}>
                        <option value="JEE Main">JEE Main</option>
                        <option value="JEE Advanced">JEE Advanced</option>
                        <option value="NEET">NEET</option>
                        <option value="Foundations">Foundations</option>
                    </select>
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Grade / Class</label>
                    <select name="grade" value={editData.grade || ''} onChange={handleEditChange} style={inputStyle}>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                        <option value="dropper">Dropper</option>
                    </select>
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>School Name</label>
                    <input type="text" name="schoolName" value={editData.schoolName || ''} onChange={handleEditChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>City</label>
                    <input type="text" name="city" value={editData.city || ''} onChange={handleEditChange} style={inputStyle} placeholder="Your City" />
                </div>

                {successMsg && <div style={successStyle}>{successMsg}</div>}

                <button type="submit" className="btn-reset" style={primaryBtnStyle}>Save Changes <Save size={18} /></button>
            </form>
        </motion.div>
    );

    const SecurityView = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>Security</h3>
                <button onClick={() => setProfileMode('overview')} className="btn-reset" style={iconBtnStyle}><X size={18} /></button>
            </div>
            <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Current Password</label>
                    <input type="password" name="current" value={passData.current} onChange={handlePassChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>New Password</label>
                    <input type="password" name="new" value={passData.new} onChange={handlePassChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Confirm New Password</label>
                    <input type="password" name="confirm" value={passData.confirm} onChange={handlePassChange} style={inputStyle} />
                </div>

                {error && <div style={errorStyle}>{error}</div>}
                {successMsg && <div style={successStyle}>{successMsg}</div>}

                <button type="submit" className="btn-reset" style={primaryBtnStyle}>Update Password <Shield size={18} /></button>
            </form>
        </motion.div>
    );

    // --- Main Render ---
    // Using a responsive split-screen design for larger screens and a centered card for mobile/popup
    const isModal = Boolean(onClose);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: '#040405',
            overflowY: 'auto', display: 'flex', flexDirection: 'column'
        }}>
            {/* Background Image & Effects */}
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                background: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop") no-repeat center center/cover',
                opacity: 0.2, pointerEvents: 'none', zIndex: 0,
                filter: 'saturate(0) contrast(1.2)' // Black & White background for contrast
            }} />
            <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, #000000 100%)', zIndex: 0, pointerEvents: 'none' }} />

            {/* Ambient Glows */}
            <div style={{ position: 'fixed', top: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{
                minHeight: '100%', width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '2rem', position: 'relative', zIndex: 1
            }}>
                {/* Close Button */}
                <button
                    onClick={() => { if (onClose) onClose(); else navigate('/'); }}
                    className="btn-reset"
                    style={{
                        position: 'absolute', top: '24px', left: '24px',
                        padding: '10px 20px', background: 'rgba(255,255,255,0.03)',
                        color: 'rgba(255,255,255,0.8)', borderRadius: '100px',
                        display: 'flex', alignItems: 'center', gap: '8px', zIndex: 20,
                        border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                    <ChevronLeft size={18} /> <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{onClose ? 'Close' : 'Home'}</span>
                </button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                    className="glass-card"
                    style={{
                        width: '100%', maxWidth: '1050px',
                        background: 'rgba(10, 10, 12, 0.75)', // Darker, more solid
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '32px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)',
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        overflow: 'hidden', backdropFilter: 'blur(24px)'
                    }}
                >
                    {/* Left Side: Visuals */}
                    <div style={{
                        padding: '4rem',
                        background: 'linear-gradient(150deg, rgba(79, 70, 229, 0.9) 0%, rgba(147, 51, 234, 0.8) 100%), url("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop") no-repeat center center/cover',
                        backgroundBlendMode: 'multiply',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center',
                        position: 'relative', overflow: 'hidden'
                    }} className="login-visual-panel">
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ marginBottom: '3rem' }}>
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '600', color: 'white', marginBottom: '1.5rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ width: '8px', height: '8px', background: '#34d399', borderRadius: '50%', boxShadow: '0 0 12px #34d399' }} /> Live Platform
                                </motion.div>
                                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', color: 'white', letterSpacing: '-0.03em' }}>
                                    {isLogin ? 'Welcome Back.' : 'Future of Learning.'}
                                </h1>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', lineHeight: '1.6', maxWidth: '90%' }}>
                                    {isLogin
                                        ? "Resume your analytics, check your test scores, and continue your mastery."
                                        : "Join the elite community of students mastering JEE & NEET with AI-driven insights."}
                                </p>
                            </div>

                            {/* Feature List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {[
                                    { icon: BookOpen, color: '#60a5fa', text: 'Adaptive Question Bank' },
                                    { icon: Activity, color: '#34d399', text: 'Real-time Performance Analytics' },
                                    { icon: Shield, color: '#f472b6', text: 'Secure Admissions & Mentorship' }
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i * 0.1) }} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <item.icon size={22} color="white" />
                                        </div>
                                        <span style={{ color: 'white', fontSize: '1.05rem', fontWeight: '500' }}>{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#09090b', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 40%)', pointerEvents: 'none' }} />
                        <AnimatePresence mode='wait'>
                            {/* Step 1: Login/Signup */}
                            {step === 1 && (
                                <motion.div key="auth" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                    <div style={{ marginBottom: '2.5rem' }}>
                                        <h2 style={headerStyle}>{isLogin ? 'Sign In' : 'Create Account'}</h2>
                                        <div style={{ display: 'flex', gap: '8px', fontSize: '0.95rem', color: '#a1a1aa' }}>
                                            {isLogin ? "New to the platform?" : "Already have an account?"}
                                            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="btn-reset" style={{ color: '#8b5cf6', fontWeight: '600', cursor: 'pointer' }}>
                                                {isLogin ? 'Sign Up' : 'Log In'}
                                            </button>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {!isLogin && (
                                            <>
                                                <div style={inputGroupStyle}>
                                                    <label style={labelStyle}>Full Name</label>
                                                    <div style={{ position: 'relative' }}>
                                                        <User size={18} style={iconLocStyle} />
                                                        <input type="text" name="name" placeholder="John Doe" value={authData.name} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '44px' }} />
                                                    </div>
                                                </div>
                                                <div style={inputGroupStyle}>
                                                    <label style={labelStyle}>Phone Number</label>
                                                    <div style={{ position: 'relative' }}>
                                                        <Shield size={18} style={iconLocStyle} />
                                                        <input type="text" name="phone" placeholder="+91 98765 43210" value={authData.phone || ''} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '44px' }} />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>Email Address</label>
                                            <div style={{ position: 'relative' }}>
                                                <School size={18} style={iconLocStyle} />
                                                <input type="email" name="email" placeholder="student@example.com" value={authData.email} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '44px' }} />
                                            </div>
                                        </div>

                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <Lock size={18} style={iconLocStyle} />
                                                <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={authData.password} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '44px', paddingRight: '44px' }} />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn-reset" style={passIconStyle}>
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        {!isLogin && (
                                            <div style={inputGroupStyle}>
                                                <label style={labelStyle}>Confirm Password</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Lock size={18} style={iconLocStyle} />
                                                    <input type="password" name="confirmPassword" placeholder="••••••••" value={authData.confirmPassword} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '44px' }} />
                                                </div>
                                            </div>
                                        )}

                                        {error && <div style={errorStyle}>{error}</div>}

                                        <button type="submit" className="btn-reset" style={primaryBtnStyle}>
                                            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* Step 2: Education Setup */}
                            {step === 2 && (
                                <motion.div key="edu" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                                    <div style={{ marginBottom: '2.5rem' }}>
                                        <div style={{ width: '64px', height: '64px', marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                            <GraduationCap size={32} color="#34d399" />
                                        </div>
                                        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '8px' }}>Setup Profile</h2>
                                        <p style={{ color: '#a1a1aa' }}>Help us personalize your experience.</p>
                                    </div>
                                    <form onSubmit={handleEduSubmitInitial} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>Class / Grade</label>
                                            <select name="grade" value={eduData.grade} onChange={handleEduChangeInitial} style={inputStyle}>
                                                <option value="" disabled>Select Class / Grade</option>
                                                <option value="11">Class 11</option>
                                                <option value="12">Class 12</option>
                                                <option value="dropper">Dropper</option>
                                            </select>
                                        </div>
                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>Target Exam</label>
                                            <select name="targetExam" value={eduData.targetExam} onChange={handleEduChangeInitial} style={inputStyle}>
                                                <option value="" disabled>Select Target</option>
                                                <option value="JEE Main">JEE Main</option>
                                                <option value="JEE Advanced">JEE Advanced</option>
                                                <option value="NEET">NEET</option>
                                                <option value="Foundations">Foundations</option>
                                            </select>
                                        </div>
                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>School Name</label>
                                            <input type="text" name="schoolName" placeholder="Enter School Name" value={eduData.schoolName} onChange={handleEduChangeInitial} style={inputStyle} />
                                        </div>
                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>City</label>
                                            <input type="text" name="city" placeholder="Enter City" value={eduData.city} onChange={handleEduChangeInitial} style={inputStyle} />
                                        </div>

                                        {error && <div style={errorStyle}>{error}</div>}
                                        <button type="submit" className="btn-reset" style={{ ...primaryBtnStyle, background: '#10b981', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
                                            Complete Profile <ArrowRight size={20} />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* Step 3: View / Edit / Security */}
                            {step === 3 && (
                                <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%' }}>
                                    {profileMode === 'overview' ? <OverviewView /> :
                                        profileMode === 'edit' ? <EditProfileView /> :
                                            <SecurityView />}
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            <style>{`
                input:focus, select:focus { 
                    border-color: #a855f7 !important; 
                    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2); 
                    background: rgba(9, 9, 11, 0.8) !important;
                }
                select { -webkit-appearance: none; appearance: none; background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a1a1aa%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 0.65em auto; }
                
                @media (max-width: 900px) {
                    .login-visual-panel { display: none !important; }
                    .glass-card { grid-template-columns: 1fr !important; max-width: 480px !important; border-radius: 24px !important; }
                }
            `}</style>
        </div>
    );
};

export default Login;
