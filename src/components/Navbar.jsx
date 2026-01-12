
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, GraduationCap, Phone, User, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    // Check for user login status
    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem('digimentors_current_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        checkUser();
        window.addEventListener('storage', checkUser);
        window.addEventListener('scroll', () => setScrolled(window.scrollY > 20));

        return () => {
            window.removeEventListener('storage', checkUser);
            window.removeEventListener('scroll', () => setScrolled(window.scrollY > 20));
        };
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: 'Test Series', path: '/test-series' },
        { name: 'Study Material', path: '/study-material' },
        { name: 'About', path: '/about' },
    ];

    const dropdownVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.95, display: 'none' },
        visible: { opacity: 1, y: 0, scale: 1, display: 'block' }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                    padding: '16px 0',
                    transition: 'all 0.3s ease'
                }}
            >
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                        <img src="/assets/logo.png" alt="Digimentors" style={{ height: '40px', objectFit: 'contain' }} />
                        <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'white' }}>
                            DIGIMENTORS
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                style={{
                                    color: '#a1a1aa',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    fontWeight: '500',
                                    transition: 'color 0.2s',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => e.target.style.color = 'white'}
                                onMouseLeave={(e) => e.target.style.color = '#a1a1aa'}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: '600', fontSize: '0.9rem' }}>
                            <div style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                                <Phone size={16} />
                            </div>
                            <span style={{ fontSize: '0.85rem' }}>Talk to us</span>
                        </div>

                        {user ? (
                            <Link to="/test" className="btn-reset" style={{ padding: '10px 20px', background: 'white', color: 'black', borderRadius: '100px', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                        ) : (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', padding: '10px 0' }}>Login</Link>
                                <Link to="/login" className="btn-reset" style={{ padding: '10px 24px', background: 'linear-gradient(90deg, #3b82f6, #2563eb)', color: 'white', borderRadius: '100px', fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)', textDecoration: 'none' }}>
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: '100vh' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ position: 'fixed', top: '72px', left: 0, right: 0, background: '#050505', padding: '2rem', overflowY: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        style={{ fontSize: '1.2rem', fontWeight: '600', color: 'white', textDecoration: 'none', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                {user ? (
                                    <Link to="/test" onClick={() => setIsOpen(false)} style={{ padding: '16px', background: '#3b82f6', color: 'white', borderRadius: '12px', textAlign: 'center', fontWeight: '700', textDecoration: 'none' }}>Go to Dashboard</Link>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                        <Link to="/login" onClick={() => setIsOpen(false)} style={{ padding: '16px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', textAlign: 'center', fontWeight: '600', textDecoration: 'none' }}>Login</Link>
                                        <Link to="/login" onClick={() => setIsOpen(false)} style={{ padding: '16px', background: '#3b82f6', color: 'white', borderRadius: '12px', textAlign: 'center', fontWeight: '700', textDecoration: 'none' }}>Sign Up Free</Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
            <style>{`
                @media (max-width: 900px) {
                    .desktop-menu, .desktop-actions { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
                @media (min-width: 901px) {
                    .mobile-toggle { display: none !important; }
                }
            `}</style>
        </>
    );
};

export default Navbar;
