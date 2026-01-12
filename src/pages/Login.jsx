import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';

const Login = ({ onClose, defaultIsLogin = true }) => {
    const [isLogin, setIsLogin] = useState(defaultIsLogin);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);

            // Mock successful login/signup
            const user = {
                name: isLogin ? 'Student' : formData.name || 'New Student',
                email: formData.email,
                id: 'USER-' + Math.random().toString(36).substr(2, 9),
                role: 'student'
            };

            localStorage.setItem('digimentors_current_user', JSON.stringify(user));

            // Sync User to Backend
            try {
                fetch(`http://${window.location.hostname}:3000/api/user`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                });
            } catch (e) {
                console.error("Backend Sync Failed");
            }

            // Dispatch event for Navbar to update
            window.dispatchEvent(new Event('storage'));

            if (onClose) {
                onClose();
            } else {
                navigate('/test');
            }
        }, 1500);
    };

    return (
        <div className="login-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: onClose ? '100vh' : '100vh', // Always full viewport for overlay feel if modal
            padding: '20px',
            background: onClose ? 'rgba(0,0,0,0.6)' : 'var(--background)', // Darken backdrop if modal
            backdropFilter: onClose ? 'blur(8px)' : 'none',
            position: onClose ? 'fixed' : 'relative',
            inset: 0,
            zIndex: 1000
        }} onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card"
                style={{
                    width: '100%',
                    maxWidth: '1000px',
                    borderRadius: '32px',
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    background: '#0f1016',
                    flexWrap: 'wrap' // Crucial for mobile responsiveness
                }}
            >
                {/* Left Side - Image & Hero Text */}
                <div style={{
                    flex: '1 1 400px', // Grow, shrink, base width. Stacks if < 400px space
                    minHeight: '400px',
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1588585994994-c6370cd1db0d?fm=jpg&q=60&w=3000')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    position: 'relative'
                }}>
                    <div style={{ position: 'absolute', top: '30px', left: '30px' }}>
                        <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.5px', color: 'white' }}>DIGIMENTORS</div>
                    </div>

                    <div style={{ zIndex: 2 }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '16px', color: 'white' }}>
                            Master Your <br />
                            <span style={{ color: '#818cf8' }}>Future.</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '300px' }}>
                            Join India's most advanced learning platform designed for top achievers.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div style={{
                    flex: '1 1 400px',
                    padding: '40px 50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="btn-reset"
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                color: 'var(--text-muted)',
                                padding: '8px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.05)',
                                zIndex: 10
                            }}
                        >
                            <X size={20} />
                        </button>
                    )}

                    <div style={{ marginBottom: '32px' }}>
                        <div style={{
                            width: '48px', height: '48px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '20px',
                            color: '#818cf8'
                        }}>
                            <Lock size={24} />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px', color: 'white' }}>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p style={{ color: 'var(--text-muted)' }}>
                            {isLogin ? 'Enter your credentials to continue.' : 'Start your journey with us today.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <User style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-dim)', width: '20px' }} />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required={!isLogin}
                                            style={{
                                                width: '100%',
                                                padding: '16px 16px 16px 48px',
                                                background: '#15171e',
                                                border: '1px solid #2d2f39',
                                                borderRadius: '12px',
                                                color: 'white',
                                                fontSize: '1rem',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-dim)', width: '20px' }} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 48px',
                                    background: '#15171e',
                                    border: '1px solid #2d2f39',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                }}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-dim)', width: '20px' }} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 48px',
                                    background: '#15171e',
                                    border: '1px solid #2d2f39',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-reset"
                            style={{
                                background: 'linear-gradient(135deg, var(--primary), var(--academic-blue))',
                                color: 'white',
                                padding: '16px',
                                borderRadius: '12px',
                                fontWeight: '600',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '10px',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            {isLogin ? "New to Digimentors?" : "Already a member?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="btn-reset"
                                style={{
                                    color: '#818cf8',
                                    fontWeight: '600',
                                    marginLeft: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {isLogin ? 'Create Account' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
