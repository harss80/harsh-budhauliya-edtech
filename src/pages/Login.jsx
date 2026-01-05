
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, Eye, EyeOff, LogIn, ChevronLeft, GraduationCap, School, BookOpen, LogOut, LayoutDashboard, Settings, Edit2, Shield, Save, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

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
                name: authData.name, email: authData.email, password: authData.password,
                joinDate: new Date().toLocaleDateString()
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
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{currentUser?.email}</p>
                </div>
                {/* Edit Actions */}
                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => setProfileMode('edit')} className="btn-reset" title="Edit Profile" style={iconBtnStyle}><Edit2 size={16} /></button>
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
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: '#09090b', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'url("https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2070&auto=format&fit=crop") no-repeat center center/cover', opacity: 0.15, pointerEvents: 'none', zIndex: -1 }}></div>

            <div style={{ minHeight: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
                {/* Close/Back Button */}
                <button onClick={() => { if (onClose) onClose(); else navigate('/'); }} className="btn-reset" style={{ position: 'absolute', top: '20px', left: '20px', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10, backdropFilter: 'blur(5px)' }}>
                    <ChevronLeft size={18} /> {onClose ? 'Close' : 'Back'}
                </button>

                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2rem', background: 'rgba(15, 15, 20, 0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <AnimatePresence mode='wait'>
                        {/* Step 1: Login/Signup */}
                        {step === 1 && (
                            <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    <div style={{ width: '56px', height: '56px', margin: '0 auto 1rem', background: 'linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)' }}>
                                        <LogIn size={28} color="white" />
                                    </div>
                                    <h2 style={headerStyle}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                                    <p style={subHeaderStyle}>{isLogin ? 'Sign in to access your portal.' : 'Register to start your journey.'}</p>
                                </div>
                                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {!isLogin && <div style={{ position: 'relative' }}><User size={18} style={iconLocStyle} /><input type="text" name="name" placeholder="Full Name" value={authData.name} onChange={handleAuthChange} style={inputStyle} /></div>}
                                    <div style={{ position: 'relative' }}><User size={18} style={iconLocStyle} /><input type="email" name="email" placeholder="Email Address" value={authData.email} onChange={handleAuthChange} style={inputStyle} /></div>
                                    <div style={{ position: 'relative' }}><Lock size={18} style={iconLocStyle} /><input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={authData.password} onChange={handleAuthChange} style={{ ...inputStyle, paddingRight: '48px' }} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="btn-reset" style={passIconStyle}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
                                    {!isLogin && <div style={{ position: 'relative' }}><Lock size={18} style={iconLocStyle} /><input type="password" name="confirmPassword" placeholder="Confirm Password" value={authData.confirmPassword} onChange={handleAuthChange} style={inputStyle} /></div>}
                                    {error && <div style={errorStyle}>{error}</div>}
                                    <button type="submit" className="btn-reset" style={primaryBtnStyle}>{isLogin ? 'Sign In' : 'Continue'} <ArrowRight size={18} /></button>
                                </form>
                                <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                    <p style={subHeaderStyle}>{isLogin ? "Don't have an account? " : "Already have an account? "}<button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="btn-reset" style={{ color: '#818cf8', fontWeight: '600', marginLeft: '4px' }}>{isLogin ? 'Sign Up' : 'Log In'}</button></p>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Education Setup */}
                        {step === 2 && (
                            <motion.div key="edu" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    <div style={{ width: '56px', height: '56px', margin: '0 auto 1rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GraduationCap size={28} color="white" /></div>
                                    <h2 style={headerStyle}>Setup Profile</h2>
                                    <p style={subHeaderStyle}>Help us personalize your experience.</p>
                                </div>
                                <form onSubmit={handleEduSubmitInitial} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <select name="grade" value={eduData.grade} onChange={handleEduChangeInitial} style={inputStyle}><option value="" disabled>Select Class / Grade</option><option value="11">Class 11</option><option value="12">Class 12</option><option value="dropper">Dropper</option></select>
                                    <select name="targetExam" value={eduData.targetExam} onChange={handleEduChangeInitial} style={inputStyle}><option value="" disabled>Target Exam</option><option value="JEE Main">JEE Main</option><option value="JEE Advanced">JEE Advanced</option><option value="NEET">NEET</option><option value="Foundations">Foundations</option></select>
                                    <input type="text" name="schoolName" placeholder="School Name" value={eduData.schoolName} onChange={handleEduChangeInitial} style={inputStyle} />
                                    {error && <div style={errorStyle}>{error}</div>}
                                    <button type="submit" className="btn-reset" style={{ ...primaryBtnStyle, background: '#10b981' }}>Complete Profile <ArrowRight size={18} /></button>
                                </form>
                            </motion.div>
                        )}

                        {/* Step 3: View / Edit / Security */}
                        {step === 3 && (
                            profileMode === 'overview' ? <OverviewView key="overview" /> :
                                profileMode === 'edit' ? <EditProfileView key="edit" /> :
                                    <SecurityView key="security" />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            <style>{`
                input:focus, select:focus { border-color: var(--primary) !important; box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2); }
                select { -webkit-appearance: none; appearance: none; }
            `}</style>
        </div>
    );
};

// Styles
const headerStyle = { fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' };
const subHeaderStyle = { color: 'var(--text-muted)', fontSize: '0.9rem' };
const inputStyle = { width: '100%', padding: '12px 16px', background: '#09090b', border: '1px solid #27272a', borderRadius: '10px', color: 'white', outline: 'none', fontSize: '0.95rem', transition: 'all 0.2s' };
const labelStyle = { display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '6px', fontWeight: '500' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column' };
const primaryBtnStyle = { padding: '14px', background: 'var(--primary)', color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' };
const secondaryBtnStyle = { padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#e4e4e7', borderRadius: '10px', fontWeight: '600', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' };
const iconBtnStyle = { padding: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' };
const errorStyle = { color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' };
const successStyle = { color: '#10b981', fontSize: '0.85rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' };
const iconLocStyle = { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' };
const passIconStyle = { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' };
const statCardStyle = { background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' };
const statLabelStyle = { fontSize: '0.7rem', color: '#a1a1aa', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' };
const statValStyle = { color: '#fff', fontWeight: '700', fontSize: '0.95rem' };

export default Login;
