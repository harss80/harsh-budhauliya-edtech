
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_BASE } from '../utils/apiBase';

const Contact = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', queryType: 'General', message: '' });
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.email || !form.message) return;
        setSending(true);
        setTimeout(() => {
            const entry = {
                id: 'CONTACT-' + Math.random().toString(36).substr(2, 9),
                ...form,
                createdAt: new Date().toISOString(),
                status: 'open'
            };
            const list = JSON.parse(localStorage.getItem('digimentors_contacts') || '[]');
            localStorage.setItem('digimentors_contacts', JSON.stringify([entry, ...list]));
            // Best-effort sync to backend if available
            try {
                fetch(`${API_BASE}/api/contacts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(entry)
                }).catch(() => null);
            } catch { /* ignore */ }
            setForm({ firstName: '', lastName: '', email: '', queryType: 'General', message: '' });
            setSending(false);
            alert('Message sent successfully!');
        }, 500);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="academic-badge" style={{ marginBottom: '1rem', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>
                        24/7 SUPPORT
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Get in Touch</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Have questions about our programs or need technical assistance? We're here to help.
                    </p>
                </div>

                <div className="responsive-grid" style={{ alignItems: 'start' }}>
                    {/* Contact Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { icon: Phone, title: "Call Us", desc: "+91 98765 43210", sub: "Mon-Sat, 9AM - 7PM" },
                            { icon: Mail, title: "Email Support", desc: "academic@digimentors.in", sub: "Response within 24 hours" },
                            { icon: MapPin, title: "Headquarters", desc: "IIT Delhi Technopark", sub: "Hauz Khas, New Delhi" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card"
                                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}
                            >
                                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px' }}>{item.title}</div>
                                    <div style={{ color: 'white', marginBottom: '2px' }}>{item.desc}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card"
                        style={{ padding: '2rem' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Send Message</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>
                                <input name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="First Name" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }} />
                                <input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }} />
                            </div>
                            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }} />
                            <select name="queryType" value={form.queryType} onChange={handleChange} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }}>
                                <option style={{ color: 'black' }} value="General">Select Query Type</option>
                                <option style={{ color: 'black' }} value="Admission Enquiry">Admission Enquiry</option>
                                <option style={{ color: 'black' }} value="Technical Support">Technical Support</option>
                                <option style={{ color: 'black' }} value="Mentorship">Mentorship</option>
                            </select>
                            <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Your Message" required style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none', resize: 'vertical' }}></textarea>

                            <button type="submit" disabled={sending} className="btn-reset" style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '0.5rem', opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}>
                                {sending ? 'Sending...' : 'Send Message'} <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
