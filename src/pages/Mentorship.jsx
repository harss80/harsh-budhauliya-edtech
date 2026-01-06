
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Video, Clock, Star, ArrowRight } from 'lucide-react';

const Mentorship = () => {

    const mentors = [
        {
            id: 1,
            name: "Dr. Anjali Verma",
            role: "Senior Physics Mentor",
            credential: "Ph.D from IIT Delhi",
            speciality: "Mechanics & Electrodynamics",
            experience: "12+ Years",
            rating: 4.9,
            image: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
            price: "₹499/session"
        },
        {
            id: 2,
            name: "Er. Rahul Malhotra",
            role: "Maths Wizard",
            credential: "B.Tech, IIT Bombay",
            speciality: "Calculus & Algebra",
            experience: "8+ Years",
            rating: 4.8,
            image: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            price: "₹599/session"
        },
        {
            id: 3,
            name: "Kavita Singh",
            role: "Organic Chemistry Expert",
            credential: "M.Sc Chemistry",
            speciality: "Reaction Mechanisms",
            experience: "10+ Years",
            rating: 5.0,
            image: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
            price: "₹450/session"
        }
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="academic-badge" style={{ marginBottom: '1rem', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>
                        1-ON-1 GUIDANCE
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Connect with Expert Mentors</h1>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                        Get personalized strategy sessions, doubt clearance, and career guidance from India's top educators.
                    </p>
                </div>

                <div className="responsive-grid" style={{ gap: '2rem' }}>
                    {mentors.map((mentor) => (
                        <motion.div
                            key={mentor.id}
                            whileHover={{ y: -5 }}
                            className="glass-card"
                            style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ height: '120px', background: mentor.image, position: 'relative' }}>
                                <div style={{
                                    width: '80px', height: '80px', background: 'white', borderRadius: '50%',
                                    position: 'absolute', bottom: '-40px', left: '24px', border: '4px solid rgba(24, 24, 27, 1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <User size={40} color="#333" />
                                </div>
                                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" /> {mentor.rating}
                                </div>
                            </div>

                            <div style={{ padding: '3rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>{mentor.name}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1rem' }}>{mentor.role}</p>

                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', color: 'var(--text-muted)' }}>{mentor.credential}</span>
                                    <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', color: 'var(--text-muted)' }}>{mentor.experience} Exp</span>
                                </div>

                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                                    <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{mentor.price}</div>
                                    <button className="btn-reset" style={{ background: 'var(--primary)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                        Book Now <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* How it works */}
                <div style={{ marginTop: '6rem' }}>
                    <h2 style={{ textAlign: 'center', fontWeight: '700', marginBottom: '3rem' }}>How Mentorship Works</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: Calendar, title: "Book a Slot", desc: "Choose a time that works for you from the mentor's calendar." },
                            { icon: Video, title: "Live Session", desc: "Connect via high-quality video call for personalized interaction." },
                            { icon: Clock, title: "Follow-up", desc: "Get a customized action plan and follow-up tasks after the session." }
                        ].map((item, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                    <item.icon size={28} color="var(--primary)" />
                                </div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>{item.title}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Mentorship;
