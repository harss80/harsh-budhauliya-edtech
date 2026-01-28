import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, PlayCircle, Star, Download,
    ChevronRight, Trophy, Video, Timer,
    CheckCircle2, Sparkles, BookOpen, UserCheck, Zap, X,
    Atom, Stethoscope, School, Microscope, ChevronRightCircle,
    Smartphone, MonitorPlay, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Assets ---
const ASSETS = {
    heroStudent: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    batchJEE: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    batchNEET: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    found: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    crash: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    testSeries: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop",
    faculty1: "https://randomuser.me/api/portraits/men/32.jpg",
    faculty2: "https://randomuser.me/api/portraits/women/44.jpg",
    faculty3: "https://randomuser.me/api/portraits/men/86.jpg",
    faculty4: "https://randomuser.me/api/portraits/women/68.jpg",
};

// --- Animations ---
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- Sub-Components ---

const SectionHeader = ({ title, subtitle, center = true }) => (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-main)' }}>
            {title}
        </h2>
        {subtitle && (
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: center ? '600px' : '100%', margin: center ? '0 auto' : '0' }}>
                {subtitle}
            </p>
        )}
    </div>
);

const CourseModal = ({ batch, onClose }) => {
    if (!batch) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="card-base"
                style={{ maxWidth: '900px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', border: '1px solid var(--border-light)', padding: 0, background: 'var(--background)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ height: '250px', position: 'relative' }}>
                    <img src={batch.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={batch.title} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--background), transparent)' }} />
                    <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                    <div style={{ position: 'absolute', bottom: '20px', left: '32px' }}>
                        <span style={{ background: batch.color, color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>
                            {batch.cat}
                        </span>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginTop: '8px', color: 'white' }}>{batch.title}</h2>
                    </div>
                </div>

                <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-main)' }}>Course Overview</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>{batch.description}</p>

                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-main)' }}>Key Features</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                            {batch.features.map((f, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    <CheckCircle2 size={18} color={batch.color} /> {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-base" style={{ padding: '24px', alignSelf: 'start', background: 'var(--surface-highlight)' }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Fees</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
                            <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>₹{batch.price}</span>
                            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{batch.originalPrice}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                <Timer size={18} /> Starts {batch.date}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                <Video size={18} /> Live + Recorded Classes
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                <BookOpen size={18} /> Study Material Included
                            </div>
                        </div>

                        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: batch.color }}>
                            Enroll Now
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const BatchCard = ({ batch, onDetails }) => (
    <motion.div
        variants={fadeInUp}
        className="card-base"
        style={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative'
        }}
    >
        {batch.popular && (
            <div style={{ position: 'absolute', top: '12px', right: '12px', background: batch.color, color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', zIndex: 10 }}>
                POPULAR
            </div>
        )}

        <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
            <img src={batch.image} alt={batch.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
            <div style={{ position: 'absolute', bottom: '12px', left: '16px', color: 'white', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Timer size={14} /> Starts {batch.date}
            </div>
        </div>

        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: batch.color, textTransform: 'uppercase', marginBottom: '6px' }}>{batch.cat}</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.3 }}>{batch.title}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {batch.features.slice(0, 3).map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={14} color={batch.color} /> {f}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>₹{batch.price}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '6px' }}>₹{batch.originalPrice}</span>
                </div>
                <button
                    onClick={() => onDetails(batch)}
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                    Details
                </button>
            </div>
        </div>
    </motion.div>
);

const Home = () => {
    const siteConfig = JSON.parse(localStorage.getItem('digimentors_site_config') || '{}');
    const [activeTab, setActiveTab] = useState('All');
    const [selectedBatch, setSelectedBatch] = useState(null);

    // --- DATASET ---
    const allBatches = [
        // JEE COURSES
        {
            id: 1, cat: 'JEE', title: "Ignite JEE (Class 11)", tag: "BESTSELLER",
            image: ASSETS.batchJEE, price: "4,500", originalPrice: "8,000", date: "15th Aug 2025",
            validity: "JEE Adv 2027",
            description: "The most comprehensive course for Class 11 students aiming for IIT JEE. We start from basic NCERT level and go up to JEE Advanced.",
            features: ['Live Classes (PCM)', 'Daily Practice Problems', 'Video Solutions', '24/7 Doubt Engine'],
            color: "#3b82f6", popular: true
        },
        {
            id: 2, cat: 'JEE', title: "Achiever JEE (Class 12)", tag: "FAST FILLING",
            image: ASSETS.batchJEE, price: "4,500", originalPrice: "8,000", date: "15th Aug 2025",
            validity: "JEE Adv 2026",
            description: "Targeted at Class 12 students to ensure high marks in Boards as well as a top rank in JEE Mains & Advanced.",
            features: ['Live Classes (PCM)', 'Board Exam Prep', '3000+ Question Bank', 'Mentor Support'],
            color: "#3b82f6", popular: true
        },
        // NEET COURSES
        {
            id: 4, cat: 'NEET', title: "Genesis NEET (Class 11)", tag: "NEW",
            image: ASSETS.batchNEET, price: "4,200", originalPrice: "7,500", date: "20th Aug 2025",
            validity: "NEET 2027",
            description: "Start your medical journey with a strong foundation. We cover PCB in extreme detail.",
            features: ['Live Classes (PCB)', 'NCERT Line-by-Line', 'Daily Quizzes', 'Unlimited Doubt Support'],
            color: "#10b981", popular: true
        },
        {
            id: 5, cat: 'NEET', title: "Zenith NEET (Class 12)", tag: "TRENDING",
            image: ASSETS.batchNEET, price: "4,200", originalPrice: "7,500", date: "20th Aug 2025",
            validity: "NEET 2026",
            description: "Balance your Board exams and NEET prep perfectly. We ensure you score 95%+ in Boards.",
            features: ['Live Classes (PCB)', 'Board Practical Help', 'Weekly Tests', 'Printed Notes'],
            color: "#10b981", popular: true
        },
        // FOUNDATION
        {
            id: 7, cat: 'Foundation', title: "Prodigy (Class 10)", tag: "BOARDS",
            image: ASSETS.found, price: "2,999", originalPrice: "5,000", date: "1st Sep 2025",
            validity: "Mar 2026",
            description: "Ace your Class 10 Boards and build a base for JEE/NEET. Applicable for CBSE, ICSE and State Boards.",
            features: ['Maths, Science, SST, Eng', 'NTSE Prep', 'Olympiad Level Qs', 'Board Sample Papers'],
            color: "#f59e0b", popular: true
        },
        {
            id: 9, cat: 'Test Series', title: "All India Test Series (AITS)", tag: "PRACTICE",
            image: ASSETS.testSeries, price: "999", originalPrice: "2,000", date: "Starts Oct 1st",
            validity: "Until Exam",
            description: "Real exam simulation. 15 Part Tests + 10 Full Syllabus Tests. Analysis includes time management.",
            features: ['Exact NTA Interface', 'All India Rank', 'Video Analysis', 'Error Analysis Report'],
            color: "#6366f1", popular: false
        }
    ];

    const filteredBatches = activeTab === 'All' ? allBatches : allBatches.filter(b => b.cat === activeTab);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            <AnimatePresence>
                {selectedBatch && <CourseModal batch={selectedBatch} onClose={() => setSelectedBatch(null)} />}
            </AnimatePresence>

            {/* --- HERO SECTION --- */}
            <section style={{ position: 'relative', paddingTop: '120px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

                        {/* Hero Text */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-light)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                                <Sparkles size={14} /> New Batches Starting Soon
                            </div>
                            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                                Master Your Exams<br />
                                <span style={{ color: 'var(--primary)' }}>With Confidence.</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '540px' }}>
                                Join India's most trusted platform for JEE, NEET, and Foundation. Expert faculty, structured curriculum, and proven results.
                            </p>

                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <Link to="/login" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '12px', textDecoration: 'none' }}>
                                    Start Learning Free
                                </Link>
                                <button className="btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '12px' }}>
                                    <PlayCircle size={20} /> Watch Demo
                                </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginTop: '4rem' }}>
                                <div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>15k+</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Selections</div>
                                </div>
                                <div style={{ width: '1px', height: '40px', background: 'var(--border)' }}></div>
                                <div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>4.9</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Avg Rating</div>
                                </div>
                                <div style={{ width: '1px', height: '40px', background: 'var(--border)' }}></div>
                                <div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>500+</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Expert Faculty</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                                <img src={ASSETS.heroStudent} alt="Student Learning" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />

                                <div style={{ position: 'absolute', bottom: '24px', left: '24px', background: 'rgba(255,255,255,0.95)', color: '#000', padding: '16px 24px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ background: '#22c55e', padding: '8px', borderRadius: '50%', color: 'white' }}>
                                            <Trophy size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '1rem' }}>#1 Choice</div>
                                            <div style={{ fontSize: '0.8rem', color: '#52525b' }}>For Toppers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Pattern */}
                            <div style={{ position: 'absolute', top: -20, right: -20, width: '100px', height: '100px', backgroundImage: 'radial-gradient(var(--border-light) 2px, transparent 2px)', backgroundSize: '10px 10px', zIndex: -1 }}></div>
                        </motion.div>
                    </div>
                </div>
                <style>{`
                    @media (max-width: 900px) {
                        .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                    }
                `}</style>
            </section>

            {/* --- GOAL SELECTION --- */}
            <section className="section-padding">
                <div className="container">
                    <SectionHeader
                        title="Choose Your Goal"
                        subtitle="Select your exam category to get personalized course recommendations and study materials."
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {[
                            { title: 'JEE (Main + Adv)', icon: Atom, color: '#3b82f6', desc: 'Class 11, 12 & Droppers' },
                            { title: 'NEET UG', icon: Stethoscope, color: '#10b981', desc: 'Class 11, 12 & Droppers' },
                            { title: 'Foundation', icon: Microscope, color: '#f59e0b', desc: 'Class 8, 9 & 10' },
                            { title: 'School Boards', icon: School, color: '#8b5cf6', desc: 'CBSE, ICSE & State' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="card-base"
                                style={{ padding: '32px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                            >
                                <div style={{ background: item.color, padding: '12px', borderRadius: '12px', color: 'white', marginBottom: '20px' }}>
                                    <item.icon size={28} />
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>{item.desc}</p>
                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: item.color, fontWeight: '600', fontSize: '0.9rem' }}>
                                    Explore Courses <ArrowRight size={16} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- POPULAR COURSES --- */}
            <section style={{ padding: '80px 0', background: 'var(--surface)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-main)' }}>Trending Courses</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '8px' }}>Top-rated batches by our students</p>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', background: 'var(--background)', padding: '6px', borderRadius: '100px', border: '1px solid var(--border)' }}>
                            {['All', 'JEE', 'NEET', 'Foundation'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className="btn-reset"
                                    style={{
                                        padding: '8px 20px',
                                        borderRadius: '100px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        background: activeTab === cat ? 'var(--text-main)' : 'transparent',
                                        color: activeTab === cat ? 'var(--background)' : 'var(--text-muted)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        layout
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredBatches.map((batch) => (
                                <BatchCard key={batch.id} batch={batch} onDetails={setSelectedBatch} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/courses" className="btn-secondary" style={{ textDecoration: 'none', padding: '12px 30px', borderRadius: '100px' }}>
                            View All Courses
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- FEATURES / WHY US --- */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
                            Why Students Trust <span style={{ color: 'var(--primary)' }}>Digimentors</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            We combine advanced technology with pedagogical expertise to deliver an unmatched learning experience.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
                        {[
                            { title: 'Interactive Live Classes', desc: 'Real-time two-way interaction with teachers.', icon: MonitorPlay, color: '#3b82f6' },
                            { title: 'Personalized Mentorship', desc: 'Guidance from experts at every step.', icon: Users, color: '#10b981' },
                            { title: 'Comprehensive Material', desc: 'Curated by top faculty for best results.', icon: BookOpen, color: '#f59e0b' },
                            { title: 'Test & Analytics', desc: 'Detailed performance analysis and reports.', icon: Zap, color: '#8b5cf6' }
                        ].map((feat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '70px', height: '70px', margin: '0 auto 24px',
                                    background: 'var(--surface)', borderRadius: '20px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)'
                                }}>
                                    <feat.icon size={32} color={feat.color} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>{feat.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- APP DOWNLOAD CTA --- */}
            <section style={{ padding: '0 0 100px' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, var(--surface) 0%, #000 100%)',
                        borderRadius: '32px',
                        padding: '60px',
                        border: '1px solid var(--border)',
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 0.8fr',
                        gap: '40px',
                        alignItems: 'center',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
                                Mobile App
                            </div>
                            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '24px' }}>
                                Learning is handy<br /> with our App.
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '450px' }}>
                                Get access to recorded lectures, instant doubt solving, and practice tests on the go. Available for iOS and Android.
                            </p>

                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <button className="btn-reset" style={{ background: 'white', color: 'black', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/732/732205.png" width="24" alt="Play Store" />
                                    Google Play
                                </button>
                                <button className="btn-reset" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" width="24" alt="App Store" style={{ filter: 'invert(1)' }} />
                                    App Store
                                </button>
                            </div>
                        </div>

                        <div style={{ position: 'relative', height: '100%', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* Simplified App Mockup */}
                            <img src="/assets/app_mockup.png" alt="App" style={{ maxHeight: '400px', objectFit: 'contain', dropShadow: '0 20px 40px rgba(0,0,0,0.5)' }} onError={(e) => e.target.style.display = 'none'} />
                        </div>

                        <style>{`
                            @media (max-width: 900px) {
                                div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; padding: 40px !important; }
                                div[style*="minHeight: 300px"] { display: none !important; } 
                            }
                        `}</style>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
