import React from 'react';
import { Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--surface)', padding: '100px 0 60px 0', borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <div className="footer-grid">
                    <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: 'white' }}>
                            <div style={{ padding: '8px', background: 'var(--primary)', borderRadius: '10px' }}>
                                <GraduationCap size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>DIGIMENTORS</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '350px', lineHeight: 1.7, marginBottom: '2rem' }}>
                            Redefining academic preparation through neuro-adaptive learning and expert mentorship. Join the next generation of scholars.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: '700' }}>Academic Programs</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li><a href="#programs" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Medical (NEET)</a></li>
                            <li><a href="#programs" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Engineering (JEE)</a></li>
                            <li><a href="#programs" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Foundations (8-10)</a></li>
                            <li><a href="#programs" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Skill Development</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: '700' }}>Scholar Support</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li><a href="/questions" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Question Bank</a></li>
                            <li><a href="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Student Portal</a></li>
                            <li><a href="/mentors" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Expert Mentors</a></li>
                            <li><a href="/knowledge" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Learning Labs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: '700' }}>Connect</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)' }}>
                                <Mail size={18} color="var(--primary-light)" />
                                academic@digimentors.edu
                            </li>
                            <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)' }}>
                                <Phone size={18} color="var(--primary-light)" />
                                +91 98765 43210
                            </li>
                            <li style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)' }}>
                                <MapPin size={18} color="var(--primary-light)" />
                                Knowledge Park, North Delhi
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ pt: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                        © {new Date().getFullYear()} Digimentors Academy. All rights reserved. Registered under Educational Trust Act.
                    </p>
                    <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem' }}>
                        <a href="/privacy" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Privacy Policy</a>
                        <a href="/terms" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
