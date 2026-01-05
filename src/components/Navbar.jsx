import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Check for user
        const storedUser = localStorage.getItem('digimentors_user_profile');
        if (storedUser) setUser(JSON.parse(storedUser));

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'STUDY MATERIAL', path: '/study-material' },
        { name: 'DASHBOARD', path: '/test' },
        { name: 'HISTORY', path: '/test-history' },
        { name: 'BLOG', path: '/blog' },
    ];

    return (
        <nav className={`nav-fixed ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-pill">
                    <Link to="/" className="nav-logo">
                        <div className="nav-logo-icon">
                            <GraduationCap size={22} color="white" />
                        </div>
                        <span style={{ letterSpacing: '-0.02em', fontWeight: '800' }}>DIGIMENTORS</span>
                    </Link>

                    <div className="nav-links-desktop">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="nav-link"
                                style={{ color: location.pathname === link.path ? 'white' : 'var(--text-muted)' }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="nav-cta-desktop">
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: '600' }}>Hi, {user.name.split(' ')[0]}</span>
                                <Link to="/test" className="nav-btn" style={{ background: 'var(--primary)', padding: '8px 20px', fontSize: '0.8rem' }}>MY DASHBOARD</Link>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="nav-login" style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>PORTAL ACCESS</Link>
                                <Link to="/signup" className="nav-btn" style={{ background: 'var(--primary)', color: 'white', fontSize: '0.8rem', letterSpacing: '0.05em', border: '1px solid var(--primary-light)' }}>ADMISSIONS OPEN</Link>
                            </>
                        )}
                    </div>

                    <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mobile-menu"
                            style={{
                                position: 'fixed',
                                top: '70px',
                                left: 0,
                                right: 0,
                                margin: '0 1rem'
                            }}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="mobile-menu-link"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name} <ChevronRight size={18} opacity={0.5} />
                                </Link>
                            ))}
                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <Link to="/login" className="nav-login" style={{ textAlign: 'center' }}>Portal Login</Link>
                                <Link to="/signup" className="nav-btn" style={{ textAlign: 'center', background: 'var(--primary)', color: 'white' }}>Enroll Now</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
