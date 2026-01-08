
import React from 'react';
import { Mail, Phone, MapPin, GraduationCap, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ background: '#09090b', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '80px', fontFamily: '"Inter", sans-serif' }}>
            <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

                {/* Top Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', paddingBottom: '60px' }}>

                    {/* Brand Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                            <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <GraduationCap size={24} color="white" />
                            </div>
                            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', letterSpacing: '-0.02em' }}>DIGIMENTORS</span>
                        </div>
                        <p style={{ color: '#a1a1aa', lineHeight: '1.6', marginBottom: '2rem' }}>
                            Empowering students with AI-driven personalized learning. Join the revolution in education today.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', color: 'white', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Link Columns */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Company</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['About Us', 'Courses', 'Careers', 'Blog', 'Freelance Job', 'Contact Us'].map((l, i) => (
                                <li key={l}>
                                    <Link
                                        to={
                                            l === 'About Us' ? '/about' :
                                                l === 'Courses' ? '/courses' :
                                                    l === 'Contact Us' ? '/contact' :
                                                        l === 'Careers' ? '/careers' :
                                                            l === 'Blog' ? '/blog' :
                                                                l === 'Freelance Job' ? '/careers' : '#'
                                        }
                                        style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s' }}
                                    >
                                        {l}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Exam Categories</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['JEE Main & Advanced', 'NEET UG', 'Foundation (Class 6-10)', 'Olympiads', 'State Boards'].map(l => (
                                <li key={l}><a href="#" style={{ color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s' }}>{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & App */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Get in Touch</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                            <li style={{ display: 'flex', gap: '12px', color: '#a1a1aa' }}>
                                <Mail size={18} color="#3b82f6" />
                                academic@digimentors.in
                            </li>
                            <li style={{ display: 'flex', gap: '12px', color: '#a1a1aa' }}>
                                <Phone size={18} color="#3b82f6" />
                                +91 84482 23888
                            </li>
                            <li style={{ display: 'flex', gap: '12px', color: '#a1a1aa', alignItems: 'flex-start' }}>
                                <MapPin size={18} color="#3b82f6" style={{ marginTop: '4px' }} />
                                <span>Knowledge Park III, Greater Noida, Uttar Pradesh 201306</span>
                            </li>
                        </ul>
                        <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                            <div style={{ color: '#60a5fa', fontWeight: '700', marginBottom: '4px', fontSize: '0.9rem' }}>Experience the App</div>
                            <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Get 5 Year Solved Papers Free</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '30px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ color: '#52525b', fontSize: '0.9rem' }}>
                        © 2024 Digimentors EdTech Pvt. Ltd. All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/privacy-policy" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link>
                        <Link to="/terms-of-service" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</Link>
                        <a href="#" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.9rem' }}>Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
