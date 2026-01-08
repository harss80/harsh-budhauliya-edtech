
import React from 'react';
import { motion } from 'framer-motion';
import {
    Target, Users, Lightbulb, Globe,
    BookOpen, Award, TrendingUp, Shield,
    CheckCircle2, Rocket, Brain, Heart
} from 'lucide-react';

const About = () => {

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    const StatCard = ({ value, label, color }) => (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', color: color, marginBottom: '0.5rem', lineHeight: 1 }}>{value}</div>
            <div style={{ color: '#a1a1aa', fontSize: '1.1rem', fontWeight: '500' }}>{label}</div>
        </div>
    );

    const ValueCard = ({ icon: Icon, title, desc, color }) => (
        <motion.div
            variants={fadeInUp}
            style={{
                padding: '2.5rem',
                background: '#18181b',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}
            whileHover={{ y: -10, borderColor: color }}
        >
            <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                background: `${color}15`, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem'
            }}>
                <Icon size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>{title}</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>{desc}</p>
        </motion.div>
    );

    return (
        <div style={{ background: '#050505', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: 'white', paddingTop: '80px' }}>

            {/* 1. Hero Section */}
            <section style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '8px 20px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#3b82f6', fontWeight: '600', fontSize: '0.9rem' }}>
                            Our Vision
                        </div>
                        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                            Democratizing Education <br />
                            <span className="gradient-text" style={{ background: 'linear-gradient(to right, #3b82f6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>for Every Student.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#a1a1aa', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
                            Digimentors isn't just an ed-tech company; it's a movement. We are bridging the gap between dreams and reality by providing world-class education that is accessible, affordable, and effective.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Stats Section */}
            <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.01)' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', divideX: '1px solid rgba(255,255,255,0.1)' }}>
                        <StatCard value="1M+" label="Students Enrolled" color="#3b82f6" />
                        <StatCard value="500+" label="Top Educators" color="#10b981" />
                        <StatCard value="100+" label="Cities Reached" color="#f59e0b" />
                        <StatCard value="15k+" label="IIT/NEET Selections" color="#ec4899" />
                    </div>
                </div>
            </section>

            {/* 3. Our Story / Philosophy */}
            <section style={{ padding: '100px 0' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem' }}>We believe in <br /><span style={{ color: '#eab308' }}>Potential, Not Just Merit.</span></h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.1rem', color: '#d4d4d8', lineHeight: '1.8' }}>
                                <p>
                                    Traditionally, quality education has been a privilege of the few—restricted by geography, cost, and language. We built Digimentors to shatter these barriers.
                                </p>
                                <p>
                                    Our platform integrates state-of-the-art AI technology with the warmth of human mentorship. We don't just deliver lectures; we build personalized learning paths that adapt to every student's pace and style.
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                    {[
                                        'Zero-Compromise Quality at Lowest Cost',
                                        'Technology that Empowers, Not Replaces',
                                        'Holistic Development beyond just Ranks'
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600' }}>
                                            <div style={{ background: '#3b82f6', borderRadius: '50%', padding: '2px' }}><CheckCircle2 size={16} color="white" /></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: 0, background: '#3b82f6', filter: 'blur(80px)', opacity: 0.2 }} />
                            <img
                                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                                alt="Students Learning"
                                style={{ width: '100%', borderRadius: '24px', position: 'relative', zIndex: 1, border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)' }}
                            />
                            {/* Floating Impact Card */}
                            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', background: '#18181b', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', zIndex: 2, maxWidth: '300px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                                <div style={{ fontSize: '4rem', fontWeight: '800', color: 'white', lineHeight: 1 }}>4.9</div>
                                <div style={{ display: 'flex', gap: '4px', margin: '8px 0' }}>
                                    {[1, 2, 3, 4, 5].map(s => <div key={s} style={{ color: '#eab308' }}>★</div>)}
                                </div>
                                <div style={{ color: '#a1a1aa' }}>Average student rating across all courses and platforms.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Core Values Grid */}
            <section style={{ padding: '100px 0', background: '#0a0a0c' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Our Core <span style={{ color: '#a855f7' }}>Values</span></h2>
                        <p style={{ color: '#a1a1aa', fontSize: '1.2rem' }}>The principles that guide every decision we make.</p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
                    >
                        <ValueCard icon={Heart} color="#ef4444" title="Student First" desc="We exist for the students. Every feature, course, and policy is designed with their success as the only metric." />
                        <ValueCard icon={Rocket} color="#f59e0b" title="Innovation" desc="We constantly challenge the status quo of traditional coaching to make learning faster and stickier." />
                        <ValueCard icon={Shield} color="#3b82f6" title="Integrity" desc="No fake results, no hidden fees. We build trust through transparency and honest guidance." />
                        <ValueCard icon={Globe} color="#10b981" title="Accessibility" desc="Quality education should not be a luxury. We strive to keep our courses affordable for everyone." />
                        <ValueCard icon={Brain} color="#8b5cf6" title="Data Driven" desc="We rely on data, not intuition. Our analytics help students identify and improve their weak areas." />
                        <ValueCard icon={Users} color="#ec4899" title="Community" desc="A supportive ecosystem of peers and mentors that encourages collaborative growth." />
                    </motion.div>
                </div>
            </section>

            {/* 5. Our Tech Stack */}
            <section style={{ padding: '100px 0', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '4rem' }}>Powered by <span style={{ color: '#3b82f6' }}>Advanced Technology</span></h2>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.7 }}>
                        {/* Simulated Logo placeholders for Tech */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="50" alt="React" />
                            </div>
                            <span style={{ fontWeight: '600' }}>Interactive UI</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg" width="50" alt="SASS" />
                            </div>
                            <span style={{ fontWeight: '600' }}>Modern Styling</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" width="50" alt="Node" />
                            </div>
                            <span style={{ fontWeight: '600' }}>Fast Server</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Target size={40} color="#3b82f6" />
                            </div>
                            <span style={{ fontWeight: '600' }}>AI Analytics</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Join Mission CTA */}
            <section style={{ padding: '100px 0', background: 'linear-gradient(180deg, #050505 0%, #172554 100%)' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem' }}>Be Part of the Revolution</h2>
                    <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                        Whether you're a student looking to excel, or an educator wanting to make an impact, Digimentors is the place for you.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        <button className="btn-reset" style={{ padding: '16px 40px', background: '#3b82f6', color: 'white', borderRadius: '100px', fontWeight: '700', fontSize: '1.1rem' }}>
                            Start Learning
                        </button>
                        <button className="btn-reset" style={{ padding: '16px 40px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '100px', fontWeight: '700', fontSize: '1.1rem', border: '1px solid rgba(255,255,255,0.2)' }}>
                            Careers
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
