import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, Eye, EyeOff, ChevronLeft, School, BookOpen, LogOut, LayoutDashboard, Edit2, Shield, Save, X, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Professional Styles ---
const headerStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#ffffff',
    letterSpacing: '-0.02em'
};

const subHeaderStyle = {
    color: '#a1a1aa',
    fontSize: '0.95rem',
    lineHeight: '1.5'
};

const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    color: '#e4e4e7', // Zinc-200
    marginBottom: '6px',
    fontWeight: '500'
};

const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    background: '#18181b', // Zinc-900 / var(--surface)
    border: '1px solid #27272a', // Zinc-800
    borderRadius: '8px',
    color: 'white',
    outline: 'none',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
};

const inputGroupStyle = { display: 'flex', flexDirection: 'column' };

const primaryBtnStyle = {
    marginTop: '16px',
    padding: '14px',
    background: '#2563eb', // Blue-600 (Professional Primary)
    color: 'white',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.95rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
    border: '1px solid transparent'
};

const secondaryBtnStyle = {
    padding: '12px',
    background: 'transparent',
    color: '#a1a1aa',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '0.95rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    border: '1px solid #27272a',
    transition: 'all 0.2s ease'
};

const iconBtnStyle = {
    padding: '8px',
    background: 'transparent',
    color: '#a1a1aa',
    borderRadius: '6px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
    border: '1px solid transparent',
    cursor: 'pointer'
};

const errorStyle = {
    color: '#ef4444',
    fontSize: '0.85rem',
    marginTop: '8px',
    padding: '10px',
    borderRadius: '6px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.15)',
    display: 'flex', alignItems: 'center', gap: '8px'
};

const successStyle = {
    color: '#10b981',
    fontSize: '0.85rem',
    marginTop: '8px',
    padding: '10px',
    borderRadius: '6px',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.15)',
    display: 'flex', alignItems: 'center', gap: '8px'
};

const iconLocStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#71717a',
    pointerEvents: 'none'
};

const passIconStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a1a1aa',
    cursor: 'pointer',
    padding: '4px'
};

const statCardStyle = {
    background: '#18181b',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #27272a',
    textAlign: 'center'
};

const statLabelStyle = { fontSize: '0.75rem', color: '#71717a', fontWeight: '500', textTransform: 'uppercase', marginBottom: '4px' };
const statValStyle = { color: '#fff', fontWeight: '600', fontSize: '1rem' };

const Login = ({ onClose, defaultIsLogin = true }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLogin, setIsLogin] = useState(defaultIsLogin);
    const [currentUser, setCurrentUser] = useState(null);
    const [profileMode, setProfileMode] = useState('overview');

    const [authData, setAuthData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [eduData, setEduData] = useState({ grade: '', targetExam: '', schoolName: '', city: '' });
    const [editData, setEditData] = useState({});
    const [passData, setPassData] = useState({ current: '', new: '', confirm: '' });

    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('digimentors_current_user'));
        if (user) {
            setCurrentUser(user);
            if (user.educationDetails) {
                setStep(3);
                setEditData({ name: user.name, email: user.email, ...user.educationDetails });
            } else {
                setStep(2);
            }
        }
    }, []);

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
                user.lastLogin = new Date().toLocaleString();
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
                admissionId: 'ADM-' + Math.floor(100000 + Math.random() * 900000),
                accessRights: [],
                joinDate: new Date().toLocaleDateString(),
                lastLogin: new Date().toLocaleString()
            };
            storedUsers.push(newUser);
            localStorage.setItem('digimentors_users', JSON.stringify(storedUsers));
            localStorage.setItem('digimentors_current_user', JSON.stringify(newUser));
            setCurrentUser(newUser);
            setStep(2);
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
        setSuccessMsg('Profile updated successfully');
        setTimeout(() => { setSuccessMsg(''); setProfileMode('overview'); }, 1500);
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        if (passData.current !== currentUser.password) return setError('Incorrect current password');
        if (passData.new !== passData.confirm) return setError('Passwords do not match');
        if (passData.new.length < 6) return setError('Password must be at least 6 characters');

        const updatedUser = { ...currentUser, password: passData.new };
        saveUserToStorage(updatedUser);
        setSuccessMsg('Password updated successfully');
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

    // --- Sub-Components ---

    const OverviewView = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{
                position: 'relative', overflow: 'hidden', padding: '2rem 1.5rem',
                background: 'linear-gradient(to bottom right, #1e293b, #0f172a)', // Slate gradient
                borderRadius: '12px', border: '1px solid #334155',
                marginBottom: '1.5rem', textAlign: 'center'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: '72px', height: '72px', margin: '0 auto 1rem',
                        background: '#3b82f6',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem', fontWeight: '700', color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}>
                        {currentUser?.name?.charAt(0).toUpperCase()}
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{currentUser?.name}</h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{currentUser?.email}</p>
                    {currentUser?.admissionId && <span style={{ fontSize: '0.75rem', marginTop: '8px', display: 'inline-block', color: '#60a5fa', background: 'rgba(59, 130, 246, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{currentUser.admissionId}</span>}
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setEditData({ name: currentUser.name, phone: currentUser.phone || '', ...currentUser.educationDetails }); setProfileMode('edit'); }} className="btn-reset" title="Edit Profile" style={iconBtnStyle}><Edit2 size={16} /></button>
                    <button onClick={() => setProfileMode('security')} className="btn-reset" title="Security" style={iconBtnStyle}><Shield size={16} /></button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={statCardStyle}>
                    <div style={statLabelStyle}>Target</div>
                    <div style={statValStyle}>{currentUser?.educationDetails?.targetExam || 'N/A'}</div>
                </div>
                <div style={statCardStyle}>
                    <div style={statLabelStyle}>Grade</div>
                    <div style={statValStyle}>{currentUser?.educationDetails?.grade || 'N/A'}</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>Edit Profile</h3>
                <button onClick={() => setProfileMode('overview')} className="btn-reset" style={iconBtnStyle}><X size={18} /></button>
            </div>
            <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Full Name</label>
                    <input type="text" name="name" value={editData.name || ''} onChange={handleEditChange} style={inputStyle} />
                </div>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Phone Number</label>
                    <input type="text" name="phone" value={editData.phone || ''} onChange={handleEditChange} style={inputStyle} />
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
                    <input type="text" name="city" value={editData.city || ''} onChange={handleEditChange} style={inputStyle} />
                </div>
                {successMsg && <div style={successStyle}>{successMsg}</div>}
                <button type="submit" className="btn-reset" style={primaryBtnStyle}>Save Changes <Save size={18} /></button>
            </form>
        </motion.div>
    );

    const SecurityView = () => (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>Security</h3>
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

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#09090b', // Zinc-950
            overflowY: 'auto', display: 'flex', flexDirection: 'column'
        }}>
            {/* Clean Background - No chaotic images */}
            <div style={{
                position: 'fixed', inset: 0,
                background: 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.05) 0%, transparent 40%)',
                pointerEvents: 'none'
            }} />

            <div style={{
                flex: 1, width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px', position: 'relative', zIndex: 1
            }}>
                <button
                    onClick={() => { if (onClose) onClose(); else navigate('/'); }}
                    className="btn-reset"
                    style={{
                        position: 'absolute', top: '24px', left: '24px',
                        padding: '8px 16px', background: 'transparent',
                        color: '#a1a1aa', borderRadius: '100px',
                        display: 'flex', alignItems: 'center', gap: '6px', zIndex: 20,
                        border: '1px solid #27272a',
                        fontWeight: '500',
                        fontSize: '0.85rem'
                    }}
                >
                    <ChevronLeft size={16} /> {onClose ? 'Close' : 'Home'}
                </button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="glass-card"
                    style={{
                        width: '100%', maxWidth: '1000px',
                        background: '#121214', // Zinc-900
                        border: '1px solid #27272a', // Zinc-800
                        borderRadius: '16px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        overflow: 'hidden'
                    }}
                >
                    {/* Left Side: Professional Visual Panel */}
                    <div className="login-visual-panel" style={{
                        padding: '3rem',
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', // distinct deep blue
                        position: 'relative', overflow: 'hidden',
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                    }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '600', color: 'white', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ width: '6px', height: '6px', background: '#34d399', borderRadius: '50%' }} /> Live Platform
                                </div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.1', marginBottom: '1rem', color: 'white' }}>
                                    {isLogin ? 'Welcome Back' : 'Start Your Journey'}
                                </h1>
                                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: '1.6', maxWidth: '90%' }}>
                                    {isLogin ? "Access your personalized dashboard and continue learning." : "Join the premier platform for engineering and medical entrance preparation."}
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {[
                                    { icon: BookOpen, text: 'Adaptive Question Bank' },
                                    { icon: Activity, text: 'Performance Analytics' },
                                    { icon: Shield, text: 'Verified Mentorship' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px' }}>
                                            <item.icon size={18} color="white" />
                                        </div>
                                        <span style={{ color: 'white', fontSize: '0.95rem', fontWeight: '500' }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Decorative Circle */}
                        <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    </div>

                    {/* Right Side: Form */}
                    <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#09090b' }}>
                        <AnimatePresence mode='wait'>
                            {step === 1 && (
                                <motion.div key="auth" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h2 style={headerStyle}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
                                        <div style={{ display: 'flex', gap: '6px', fontSize: '0.9rem', color: '#a1a1aa' }}>
                                            {isLogin ? "No account?" : "Have an account?"}
                                            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="btn-reset" style={{ color: '#60a5fa', fontWeight: '600', cursor: 'pointer' }}>
                                                {isLogin ? 'Create one' : 'Sign in'}
                                            </button>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {!isLogin && (
                                            <>
                                                <div style={inputGroupStyle}>
                                                    <label style={labelStyle}>Full Name</label>
                                                    <div style={{ position: 'relative' }}>
                                                        <User size={16} style={iconLocStyle} />
                                                        <input type="text" name="name" placeholder="John Doe" value={authData.name} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '38px' }} />
                                                    </div>
                                                </div>
                                                <div style={inputGroupStyle}>
                                                    <label style={labelStyle}>Phone Number</label>
                                                    <div style={{ position: 'relative' }}>
                                                        <Shield size={16} style={iconLocStyle} />
                                                        <input type="text" name="phone" placeholder="+91..." value={authData.phone || ''} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '38px' }} />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>Email Address</label>
                                            <div style={{ position: 'relative' }}>
                                                <School size={16} style={iconLocStyle} />
                                                <input type="email" name="email" placeholder="student@example.com" value={authData.email} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '38px' }} />
                                            </div>
                                        </div>

                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <Lock size={16} style={iconLocStyle} />
                                                <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={authData.password} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '38px', paddingRight: '38px' }} />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn-reset" style={passIconStyle}>
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </div>

                                        {!isLogin && (
                                            <div style={inputGroupStyle}>
                                                <label style={labelStyle}>Confirm Password</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Lock size={16} style={iconLocStyle} />
                                                    <input type="password" name="confirmPassword" placeholder="••••••••" value={authData.confirmPassword} onChange={handleAuthChange} style={{ ...inputStyle, paddingLeft: '38px' }} />
                                                </div>
                                            </div>
                                        )}

                                        {error && <div style={errorStyle}>{error}</div>}

                                        <button type="submit" className="btn-reset" style={primaryBtnStyle}>
                                            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={16} />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="edu" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h2 style={{ ...headerStyle, fontSize: '1.5rem' }}>Setup Profile</h2>
                                        <p style={subHeaderStyle}>Just a few more details to get you started.</p>
                                    </div>
                                    <form onSubmit={handleEduSubmitInitial} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>Class / Grade</label>
                                            <select name="grade" value={eduData.grade} onChange={handleEduChangeInitial} style={inputStyle}>
                                                <option value="" disabled>Select Class</option>
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
                                            <input type="text" name="schoolName" placeholder="School Name" value={eduData.schoolName} onChange={handleEduChangeInitial} style={inputStyle} />
                                        </div>
                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>City</label>
                                            <input type="text" name="city" placeholder="City" value={eduData.city} onChange={handleEduChangeInitial} style={inputStyle} />
                                        </div>
                                        {error && <div style={errorStyle}>{error}</div>}
                                        <button type="submit" className="btn-reset" style={primaryBtnStyle}>
                                            Complete Profile <ArrowRight size={16} />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

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
                    border-color: #3b82f6 !important; 
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); 
                    background: #27272a !important;
                }
                select { -webkit-appearance: none; appearance: none; background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a1a1aa%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 0.65em auto; }
                
                @media (max-width: 900px) {
                    .login-visual-panel { display: none !important; }
                    .glass-card { grid-template-columns: 1fr !important; max-width: 480px !important; }
                }
            `}</style>
        </div>
    );
};

export default Login;
