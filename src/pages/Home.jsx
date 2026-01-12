
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, PlayCircle, Star, Download,
    ChevronRight, Trophy, Video, Timer,
    CheckCircle2, Sparkles, BookOpen, UserCheck, Zap, X,
    Atom, Stethoscope, School, Microscope, ChevronRightCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Assets (Simulated) ---
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- Components ---

const CourseModal = ({ batch, onClose }) => {
    if (!batch) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{ background: '#18181b', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', borderRadius: '24px', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ height: '240px', background: `url(${batch.image}) center/cover no-repeat`, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #18181b, transparent)' }} />
                    <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                    <div style={{ position: 'absolute', bottom: '20px', left: '32px' }}>
                        <div style={{ display: 'inline-block', background: batch.color, padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '12px' }}>
                            {batch.cat}
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>{batch.title}</h2>
                    </div>
                </div>

                <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: '#e4e4e7' }}>Why join this batch?</h3>
                        <p style={{ color: '#a1a1aa', lineHeight: '1.7', marginBottom: '2rem' }}>{batch.description}</p>

                        <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem', color: '#e4e4e7' }}>What's Included?</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {batch.features.map((f, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4d4d8', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <CheckCircle2 size={18} color={batch.color} /> {f}
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <div style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '8px' }}>Batch Validity</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>Till {batch.validity}</div>
                        </div>
                    </div>

                    <div style={{ background: '#0a0a0c', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', alignSelf: 'start' }}>
                        <div style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '4px' }}>Course Price</div>
                        <div style={{ display: 'flex', alignItems: 'end', gap: '12px', marginBottom: '24px' }}>
                            <span style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>₹{batch.price}</span>
                            <span style={{ fontSize: '1.1rem', color: '#71717a', textDecoration: 'line-through', marginBottom: '6px' }}>₹{batch.originalPrice}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#d4d4d8' }}>
                                <Timer size={16} /> Starts {batch.date}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#d4d4d8' }}>
                                <Video size={16} /> Live + Recorded Classes
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#d4d4d8' }}>
                                <BookOpen size={16} /> PDF Notes & DPPs
                            </div>
                        </div>

                        <button className="btn-reset" style={{ width: '100%', padding: '16px', background: batch.color, color: 'white', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', marginBottom: '12px' }}>
                            Buy Now
                        </button>
                        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#71717a' }}>30-Day Money Back Guarantee</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const BatchCard = ({ batch, onDetails }) => (
    <motion.div
        variants={fadeInUp}
        whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)' }}
        style={{
            background: '#18181b',
            borderRadius: '20px',
            overflow: 'hidden',
            border: batch.popular ? `1px solid ${batch.color}` : '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column',
            position: 'relative'
        }}
    >
        {batch.popular && (
            <div style={{ position: 'absolute', top: 0, right: 0, background: batch.color, color: 'white', padding: '4px 12px', borderBottomLeftRadius: '12px', fontSize: '0.75rem', fontWeight: '800', zIndex: 10 }}>
                MOST POPULAR
            </div>
        )}

        {/* Banner Image */}
        <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
            <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={batch.image} alt={batch.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                {batch.tag}
            </div>
            <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '12px 16px', background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#eab308', fontSize: '0.8rem', fontWeight: '600' }}>
                    <Timer size={14} /> Starts {batch.date}
                </div>
            </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'white', marginBottom: '8px', lineHeight: 1.2 }}>{batch.title}</h3>
            <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '16px' }}>Validity: Till {batch.validity}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {batch.features.slice(0, 3).map((f, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', color: '#d4d4d8', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} color={batch.color} /> {f}
                    </span>
                ))}
                {batch.features.length > 3 && <span style={{ fontSize: '0.75rem', color: '#a1a1aa', padding: '4px' }}>+{batch.features.length - 3} more</span>}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '2px' }}>Course Price</div>
                    <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'white' }}>₹{batch.price}</span>
                    <span style={{ fontSize: '0.9rem', color: '#71717a', textDecoration: 'line-through', marginLeft: '8px' }}>₹{batch.originalPrice}</span>
                </div>
                <button
                    onClick={() => onDetails(batch)}
                    className="btn-reset"
                    style={{ padding: '10px 20px', background: 'white', color: 'black', borderRadius: '10px', fontWeight: '700', fontSize: '0.9rem', transition: 'transform 0.2s', boxShadow: batch.popular ? `0 4px 20px -5px ${batch.color}80` : 'none' }}
                >
                    View Details
                </button>
            </div>
        </div>
    </motion.div>
);

const ResultCard = ({ name, rank, exam, image }) => (
    <motion.div
        whileHover={{ y: -5 }}
        style={{ minWidth: '220px', background: 'linear-gradient(145deg, #1e1e24, #121215)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', marginRight: '1.5rem', position: 'relative' }}
    >
        <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#eab308' }}><Trophy size={16} /></div>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem', border: '3px solid #eab308', boxShadow: '0 8px 20px -5px rgba(234, 179, 8, 0.3)' }}>
            <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h4 style={{ color: 'white', fontWeight: '700', fontSize: '1.1rem' }}>{name}</h4>
        <div style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900', fontSize: '1.4rem', margin: '4px 0' }}>AIR {rank}</div>
        <div style={{ color: '#a1a1aa', fontSize: '0.85rem', fontWeight: '500' }}>{exam} 2024</div>
    </motion.div>
);

const CategoryPill = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className="btn-reset"
        style={{
            padding: '12px 24px',
            borderRadius: '100px',
            background: active ? 'white' : 'rgba(255,255,255,0.05)',
            color: active ? 'black' : '#d4d4d8',
            border: active ? '1px solid white' : '1px solid rgba(255,255,255,0.1)',
            fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.3s ease'
        }}
    >
        <span>{icon}</span> {label}
    </button>
);

const Home = () => {
    const siteConfig = JSON.parse(localStorage.getItem('digimentors_site_config') || '{}');
    const [activeTab, setActiveTab] = useState('All');
    const [selectedBatch, setSelectedBatch] = useState(null);

    // --- MASSIVE COURSE DATASET ---
    const allBatches = [
        // JEE COURSES
        {
            id: 1, cat: 'JEE', title: "Ignite JEE (Class 11)", tag: "BESTSELLER",
            image: ASSETS.batchJEE, price: "4,500", originalPrice: "8,000", date: "15th Aug 2025",
            validity: "JEE Adv 2027",
            description: "The most comprehensive course for Class 11 students aiming for IIT JEE. We start from basic NCERT level and go up to JEE Advanced. Includes daily practice papers, video solutions, and regular extensive testing.",
            features: ['Live Classes (PCM)', 'Daily Practice Problems (DPP)', 'Video Solutions', '24/7 Doubt Engine', 'Monthly Review Tests', 'All India Test Series (AITS)', 'Hardcopy Modules (Optional)'],
            color: "#3b82f6", popular: true
        },
        {
            id: 2, cat: 'JEE', title: "Achiever JEE (Class 12)", tag: "FAST FILLING",
            image: ASSETS.batchJEE, price: "4,500", originalPrice: "8,000", date: "15th Aug 2025",
            validity: "JEE Adv 2026",
            description: "Targeted at Class 12 students to ensure high marks in Boards as well as a top rank in JEE Mains & Advanced. Complete syllabus coverage by Dec 2025, followed by rigorous revision.",
            features: ['Live Classes (PCM)', 'Board Exam Prep', '3000+ Question Bank', 'Previous Year Questions (PYQs)', 'Revision Planner', 'Mentor Support'],
            color: "#3b82f6", popular: true
        },
        {
            id: 3, cat: 'JEE', title: "Warrior JEE (Droppers)", tag: "LIVE",
            image: ASSETS.crash, price: "3,800", originalPrice: "6,000", date: "1st Aug 2025",
            validity: "JEE Adv 2026",
            description: "A high-intensity course for repeaters. We focus on speed, accuracy, and filling conceptual gaps. Classes are longer and more problem-solving oriented.",
            features: ['Daily 6 Hrs Class', 'Special Dropper Modules', 'Rank Improvement Program', 'Short Notes & Mind Maps', 'Dedicated Doubt Rooms'],
            color: "#ef4444", popular: false
        },
        {
            id: 101, cat: 'JEE', title: "JEE Final Lap Crash Course", tag: "CRASH COURSE",
            image: ASSETS.crash, price: "1,499", originalPrice: "3,000", date: "1st Dec 2025",
            validity: "JEE Main 2026",
            description: "Last minute booster for JEE Mains. Cover high-weightage topics in 45 days. Ideal for revision.",
            features: ['45 Days Plan', 'Most Expected Questions', '5 Full Mock Tests', 'Tips & Tricks'],
            color: "#ef4444", popular: false
        },

        // NEET COURSES
        {
            id: 4, cat: 'NEET', title: "Genesis NEET (Class 11)", tag: "NEW",
            image: ASSETS.batchNEET, price: "4,200", originalPrice: "7,500", date: "20th Aug 2025",
            validity: "NEET 2027",
            description: "Start your medical journey with a strong foundation. We cover PCB in extreme detail, with special focus on NCERT lines for Biology.",
            features: ['Live Classes (PCB)', 'NCERT Line-by-Line', 'Daily Quizzes', 'Botany & Zoology Special', 'Unlimited Doubt Support'],
            color: "#10b981", popular: true
        },
        {
            id: 5, cat: 'NEET', title: "Zenith NEET (Class 12)", tag: "TRENDING",
            image: ASSETS.batchNEET, price: "4,200", originalPrice: "7,500", date: "20th Aug 2025",
            validity: "NEET 2026",
            description: "Balance your Board exams and NEET prep perfectly. We ensure you score 95%+ in Boards and 650+ in NEET.",
            features: ['Live Classes (PCB)', 'Board Practical Help', 'Assertion-Reason Qs', 'Weekly Tests', 'Printed Notes'],
            color: "#10b981", popular: true
        },
        {
            id: 6, cat: 'NEET', title: "Sankalp NEET (Droppers)", tag: "LEGENDARY",
            image: ASSETS.testSeries, price: "3,800", originalPrice: "6,000", date: "5th Aug 2025",
            validity: "NEET 2026",
            description: "The batch that produces AIR 1. Designed for students taking a drop year. We start from zero and go to hero level.",
            features: ['Daily 4 Classes', 'NCERT Niches', 'Rank Booster Tests', 'Stress Management', 'Personal Mentorship'],
            color: "#8b5cf6", popular: true
        },
        {
            id: 102, cat: 'NEET', title: "NEET Score Booster (Bio)", tag: "SUBJECT",
            image: ASSETS.batchNEET, price: "999", originalPrice: "1,500", date: "Anytime",
            validity: "NEET 2026",
            description: "Master Biology to score 360/360. Includes only Biology (Botany + Zoology) lectures and tests.",
            features: ['Complete Bio Syllabus', 'Diagram based Qs', 'NCERT Filtered Notes', '20+ Bio Mock Tests'],
            color: "#10b981", popular: false
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
            id: 8, cat: 'Foundation', title: "Nurture (Class 9)", tag: "EARLY STARTER",
            image: ASSETS.found, price: "2,499", originalPrice: "4,500", date: "1st Sep 2025",
            validity: "Mar 2026",
            description: "Start early to stay ahead. Covers Class 9 syllabus with an introduction to Class 11 concepts in Physics and Math.",
            features: ['All Subjects', 'Logical Reasoning', 'Maths Olympiad Prep', 'Live Interactive Classes'],
            color: "#f59e0b", popular: false
        },

        // TEST SERIES & OTHERS
        {
            id: 9, cat: 'Test Series', title: "All India Test Series (AITS)", tag: "PRACTICE",
            image: ASSETS.testSeries, price: "999", originalPrice: "2,000", date: "Starts Oct 1st",
            validity: "Until Exam",
            description: "Real exam simulation. 15 Part Tests + 10 Full Syllabus Tests. Analysis includes time management and weak area detection.",
            features: ['Exact NTA Interface', 'All India Rank', 'Video Analysis', 'Error Analysis Report'],
            color: "#06b6d4", popular: false
        },
        {
            id: 10, cat: 'Test Series', title: "NCERT Master (NEET Tests)", tag: "MUST BUY",
            image: ASSETS.testSeries, price: "999", originalPrice: "1,500", date: "Starts Oct 1st",
            validity: "Until Exam",
            description: "Strictly NCERT based question bank and test series for NEET aspirants. If it's in NCERT, it's in this series.",
            features: ['Page-wise Questions', 'Statement Based Qs', 'Match Columns', 'Detailed Text Solutions'],
            color: "#06b6d4", popular: false
        }
    ];

    const filteredBatches = (activeTab === 'All' ? allBatches : allBatches.filter(b => b.cat === activeTab || (activeTab === 'Dropper' && (b.title.includes('Dropper') || b.title.includes('Sankalp') || b.title.includes('Warrior'))))).slice(0, 6);

    return (
        <div style={{ background: '#050505', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: 'white', paddingBottom: '80px', overflowX: 'hidden' }}>

            {/* Modal for Details */}
            <AnimatePresence>
                {selectedBatch && <CourseModal batch={selectedBatch} onClose={() => setSelectedBatch(null)} />}
            </AnimatePresence>

            {/* 1. Announcement Ticker */}
            {siteConfig.announcement && (
                <div style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: 'black', textAlign: 'center', padding: '10px', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Sparkles size={16} fill="black" /> {siteConfig.announcement}
                </div>
            )}

            {/* 2. Commercial Hero Section */}
            <section style={{ position: 'relative', paddingTop: '100px', paddingBottom: '80px', overflow: 'hidden' }}>
                {/* Background Glows */}
                <div style={{ position: 'absolute', top: '-20%', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)', filter: 'blur(80px)' }} />
                <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)', filter: 'blur(80px)' }} />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4rem',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ flex: '1 1 500px' }} // Min width 500px, stacks if smaller
                        >
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '2rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                <Trophy size={16} /> India's #1 Learning Platform
                            </div>
                            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.8rem)', fontWeight: '900', lineHeight: '1.05', marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'white' }}>
                                Crack Exams with <br />
                                <span className="gradient-text" style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>India's Top Faculty.</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: '#a1a1aa', marginBottom: '3rem', maxWidth: '600px', lineHeight: '1.6' }}>
                                Get unlimited access to structured courses, live doubts, and mock tests. Your dream college is just one click away.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link to="/login" className="btn-reset" style={{ padding: '18px 40px', background: 'white', color: 'black', borderRadius: '14px', fontWeight: '800', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 20px 40px -10px rgba(255,255,255,0.2)', textDecoration: 'none' }}>
                                    Get Started for Free <ChevronRight size={20} />
                                </Link>
                                <button className="btn-reset" style={{ padding: '18px 30px', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '14px', fontWeight: '700', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <PlayCircle size={20} /> Watch Demo
                                </button>
                            </div>

                            {/* Stats */}
                            <div style={{ marginTop: '3.5rem', display: 'flex', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>15k+</div>
                                    <div style={{ fontSize: '0.9rem', color: '#a1a1aa', fontWeight: '500' }}>IIT/NEET Selections</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>50L+</div>
                                    <div style={{ fontSize: '0.9rem', color: '#a1a1aa', fontWeight: '500' }}>Daily Views</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side */}
                        <div style={{ position: 'relative', flex: '1 1 450px', minHeight: '400px', maxHeight: '600px', width: '100%' }}>
                            {[ASSETS.faculty1, ASSETS.faculty2, ASSETS.faculty3].map((img, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut", delay: i * 0.5 }}
                                    style={{ position: 'absolute', top: i === 0 ? '10%' : i === 1 ? '40%' : '75%', left: i === 0 ? '10%' : i === 1 ? '-5%' : '5%', zIndex: 3 }}
                                >
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '3px solid #18181b', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}
                                style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
                            >
                                <img src={ASSETS.heroStudent} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px', transform: 'rotate(2deg)', filter: 'contrast(1.1)', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)' }} />
                                <div style={{ position: 'absolute', inset: 0, borderRadius: '32px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 40%)', transform: 'rotate(2deg)' }} />
                                <div style={{ position: 'absolute', bottom: '30px', left: '30px', transform: 'rotate(2deg)', zIndex: 10 }}>
                                    <div style={{ background: 'white', color: 'black', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                                        <div style={{ background: '#22c55e', color: 'white', borderRadius: '50%', padding: '4px' }}><CheckCircle2 size={16} /></div>
                                        Admission Open 2025
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Goal Selection */}
            {/* 3. Goal Selection (Redesigned) */}
            <section style={{ padding: '80px 0', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            START YOUR JOURNEY
                        </motion.div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Select Your <span style={{ color: '#3b82f6' }}>Target</span></h2>
                        <p style={{ color: '#a1a1aa', maxWidth: '500px', margin: '0 auto', fontSize: '1.1rem' }}>
                            Choose your exam category to explore curated courses and study material.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'JEE (Main+Adv)', subtitle: 'For Class 11, 12 & Droppers', icon: Atom, color: '#3b82f6', grad: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
                            { title: 'NEET (UG)', subtitle: 'For Class 11, 12 & Droppers', icon: Stethoscope, color: '#10b981', grad: 'linear-gradient(135deg, #10b981, #059669)' },
                            { title: 'Foundation', subtitle: 'For Class 8, 9 & 10th', icon: Microscope, color: '#f59e0b', grad: 'linear-gradient(135deg, #f59e0b, #d97706)' },
                            { title: 'School Boards', subtitle: 'CBSE, ICSE & State Boards', icon: School, color: '#8b5cf6', grad: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }
                        ].map((goal, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                style={{
                                    background: 'linear-gradient(145deg, #18181b, #0e0e11)',
                                    padding: '3px', /* For border gradient */
                                    borderRadius: '24px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Inner Card content */}
                                <div style={{
                                    background: '#131316',
                                    borderRadius: '21px',
                                    padding: '32px 24px',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    {/* Glowing Icon Background */}
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: goal.grad,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.5rem',
                                        boxShadow: `0 10px 30px -10px ${goal.color}80`
                                    }}>
                                        <goal.icon size={36} color="white" strokeWidth={1.5} />
                                    </div>

                                    <h3 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '8px', color: 'white' }}>{goal.title}</h3>
                                    <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.5 }}>{goal.subtitle}</p>

                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: goal.color, fontWeight: '600', fontSize: '0.9rem' }}>
                                        Explore <ChevronRightCircle size={16} />
                                    </div>
                                </div>

                                {/* Hover Glow Effect (Border) */}
                                <motion.div
                                    style={{ position: 'absolute', inset: 0, background: goal.grad, opacity: 0, zIndex: 0 }}
                                    whileHover={{ opacity: 1 }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Live Batches with Filter */}
            <section style={{ padding: '80px 0', background: '#0a0a0c' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Explore <span style={{ color: '#eab308' }}>Live Courses</span></h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            {['All', 'JEE', 'NEET', 'Foundation', 'Dropper'].map(cat => (
                                <CategoryPill key={cat} label={cat} active={activeTab === cat} onClick={() => setActiveTab(cat)} />
                            ))}
                        </div>
                    </div>

                    <motion.div
                        layout
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}
                    >
                        <AnimatePresence>
                            {filteredBatches.map((batch) => (
                                <BatchCard key={batch.id} batch={batch} onDetails={setSelectedBatch} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <Link to="/courses" className="btn-reset" style={{ padding: '16px 40px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '100px', fontWeight: '600', fontSize: '1rem', background: 'transparent', transition: 'all 0.2s', textDecoration: 'none', display: 'inline-block' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            View All Courses
                        </Link>
                    </div>
                </div>
            </section>

            {/* Rest of the sections (Results, Why Us, Faculty, App CTA) remain similar... */}
            <section style={{ padding: '100px 0', position: 'relative' }}>
                {/* ... Hall of Fame ... */}
                <div style={{ position: 'absolute', top: '20%', left: '0', width: '300px', height: '300px', background: '#eab308', filter: 'blur(150px)', opacity: 0.1 }} />
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                        <div>
                            <div style={{ color: '#eab308', fontWeight: '700', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '8px' }}>WALL OF FAME</div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Toppers of <span style={{ color: 'white' }}>2024</span></h2>
                        </div>
                    </div>
                    <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '30px', gap: '0' }} className="hide-scrollbar">
                        <ResultCard name="Aarav Sharma" rank="1" exam="JEE Adv" image="/assets/toppers/aarav.png" />
                        <ResultCard name="Ishita Patel" rank="3" exam="NEET UG" image="/assets/toppers/ishita.png" />
                        <ResultCard name="Rohan Verma" rank="8" exam="JEE Main" image="https://images.unsplash.com/photo-1627776880991-808c5996527b?fm=jpg&q=60&w=800" />
                        <ResultCard name="Aditya Kumar" rank="12" exam="NEET UG" image="https://images.unsplash.com/photo-1721676743809-7a2d672e5cdf?fm=jpg&q=60&w=800" />
                        <ResultCard name="Kavya Reddy" rank="15" exam="Foundation" image="https://images.unsplash.com/photo-1544456203-0af5a69f5789?fm=jpg&q=60&w=800" />
                        <ResultCard name="Neha Malhotra" rank="22" exam="JEE Adv" image="https://images.unsplash.com/photo-1622964981066-a10fd0192462?fm=jpg&q=60&w=800" />
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ padding: '80px 0', background: '#0e0e11' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '4rem', textAlign: 'center' }}>Why <span style={{ color: '#3b82f6' }}>Digimentors?</span></h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'Daily Live Classes', desc: 'Interactive classes with two-way communication.', icon: Video, color: '#3b82f6', grad: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
                            { title: 'Personal Mentorship', desc: 'Dedicated mentors to track your progress.', icon: UserCheck, color: '#10b981', grad: 'linear-gradient(135deg, #10b981, #059669)' },
                            { title: 'Offline Material', desc: 'Printed study material delivered to your home.', icon: BookOpen, color: '#f59e0b', grad: 'linear-gradient(135deg, #f59e0b, #d97706)' },
                            { title: 'Institute Rank', desc: 'Real-time ranking among 1L+ students.', icon: Trophy, color: '#ec4899', grad: 'linear-gradient(135deg, #ec4899, #db2777)' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                style={{
                                    background: 'linear-gradient(145deg, #18181b, #0e0e11)',
                                    borderRadius: '24px',
                                    padding: '4px', /* Gradient border container */
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    background: '#131316',
                                    borderRadius: '22px',
                                    padding: '36px',
                                    height: '100%',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '16px',
                                        background: item.grad,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.5rem',
                                        boxShadow: `0 8px 24px -6px ${item.color}60`
                                    }}>
                                        <item.icon size={30} color="white" />
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: 'white' }}>{item.title}</h3>
                                    <p style={{ color: '#a1a1aa', lineHeight: 1.6, fontSize: '1rem' }}>{item.desc}</p>
                                </div>

                                {/* Hover Glow */}
                                <motion.div
                                    style={{ position: 'absolute', inset: 0, background: item.grad, opacity: 0, zIndex: 0 }}
                                    whileHover={{ opacity: 0.6 }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Faculty */}
            <section style={{ padding: '100px 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', textAlign: 'center' }}>Meet Your <span style={{ color: '#ec4899' }}>Gurus</span></h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                        {[
                            { name: 'Dr. R.K. Verma', subject: 'Physics Head', img: ASSETS.faculty1, exp: '15+ Yrs' },
                            { name: 'Sameer Sir', subject: 'Mathematics Wizard', img: ASSETS.faculty3, exp: '12+ Yrs' },
                            { name: 'Anjali Ma\'am', subject: 'Biology Expert', img: ASSETS.faculty2, exp: '10+ Yrs' },
                            { name: 'Pooja Singh', subject: 'Chemistry Lead', img: ASSETS.faculty4, exp: '14+ Yrs' },
                        ].map((tch, i) => (
                            <motion.div key={i} whileHover={{ scale: 1.05 }} style={{ textAlign: 'center' }}>
                                <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 1.5rem' }}>
                                    <img src={tch.img} alt={tch.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid #18181b', boxShadow: '0 0 0 2px #3b82f6' }} />
                                    <div style={{ position: 'absolute', bottom: '0', right: '0', background: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700' }}>{tch.exp}</div>
                                </div>
                                <h4 style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '4px' }}>{tch.name}</h4>
                                <div style={{ fontSize: '0.9rem', color: '#ec4899', fontWeight: '600' }}>{tch.subject}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* App CTA */}
            <section style={{ padding: '60px 0 100px 0' }}>
                <div className="container">
                    <div style={{ background: 'linear-gradient(135deg, #1e1e2b 0%, #0c0c10 100%)', borderRadius: '32px', padding: '0 4rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ padding: '4rem 0', zIndex: 2, flex: '1 1 400px', minWidth: '300px' }}>
                            <div style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                                MOBILE APP
                            </div>
                            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
                                Learning in Your Pocket. <br />
                                <span className="gradient-text" style={{ background: 'linear-gradient(to right, #3b82f6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Anytime, Anywhere.</span>
                            </h2>
                            <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '500px' }}>
                                Download the Digimentors app for seamless access to live classes, recorded lectures, and instant doubt resolution.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button className="btn-reset" style={{ padding: '14px 28px', background: 'white', color: 'black', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700', fontSize: '1rem', transition: 'transform 0.2s' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/732/732205.png" alt="Play Store" style={{ width: '24px' }} /> Google Play
                                </button>
                                <button className="btn-reset" style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700', fontSize: '1rem', backdropFilter: 'blur(10px)' }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="App Store" style={{ width: '24px', filter: 'invert(1)' }} /> App Store
                                </button>
                            </div>
                        </div>

                        <div style={{ flex: '1 1 400px', height: '550px', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', minWidth: '300px' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>

                            <motion.img
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                src="/assets/app_mockup.png"
                                alt="Digimentors App"
                                style={{ width: '100%', height: 'auto', maxHeight: '120%', objectFit: 'contain', position: 'relative', zIndex: 1, marginBottom: '-80px', transform: 'rotate(-5deg)' }}
                            />
                        </div>

                        {/* Background Elements */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)', pointerEvents: 'none' }}></div>
                    </div>
                </div>
            </section>

            <style>{`
                .container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @media (max-width: 768px) {
                    .container { padding: 0 20px; }
                }
            `}</style>
        </div>
    );
};

export default Home;
