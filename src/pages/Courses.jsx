
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, CheckCircle2, Timer,
    Video, BookOpen, Star, ChevronRight, X
} from 'lucide-react';

const CourseModal = ({ course, onClose }) => {
    if (!course) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={onClose}>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{ background: '#18181b', width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}
            >
                <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', padding: '8px', cursor: 'pointer', zIndex: 10 }}>
                    <X size={24} />
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }} className="modal-grid">
                    {/* Left: Image & Key Info */}
                    <div style={{ position: 'relative', minHeight: '300px' }}>
                        <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #18181b 0%, transparent 60%)' }} />
                        <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px' }}>
                            <div style={{ display: 'inline-block', background: course.color, padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>{course.cat}</div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '8px' }}>{course.title}</h2>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '0.95rem', color: '#d4d4d8' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Timer size={16} /> Starts {course.date}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} /> Valid: {course.validity}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Details & CTA */}
                    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>Description</h3>
                            <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>{course.description}</p>
                        </div>

                        <div style={{ marginBottom: 'auto' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>Key Features</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {course.features.map((f, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#d4d4d8' }}>
                                        <CheckCircle2 size={14} color={course.color} /> {f}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>Total Price</div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: '800' }}>₹{course.price}</span>
                                        <span style={{ fontSize: '1.1rem', color: '#71717a', textDecoration: 'line-through' }}>₹{course.originalPrice}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn-reset" style={{ width: '100%', padding: '18px', background: course.color, color: 'white', borderRadius: '12px', fontWeight: '800', fontSize: '1.1rem', letterSpacing: '0.02em' }}>
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>
                <style>{`
                    @media (max-width: 768px) {
                        .modal-grid { grid-template-columns: 1fr !important; }
                    }
                `}</style>
            </motion.div>
        </div>
    );
};

const Courses = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);

    const resolveGoal = (u) => {
        const raw = String(u?.educationDetails?.targetExam || '').toUpperCase();
        if (raw.includes('NEET') || raw.includes('MEDICAL')) return 'NEET';
        if (raw.includes('JEE') || raw.includes('ENGINEERING')) return 'JEE';
        if (raw.includes('FOUNDATION')) return 'Foundation';
        return '';
    };

    const currentUser = (() => {
        try { return JSON.parse(localStorage.getItem('digimentors_current_user') || 'null'); } catch { return null; }
    })();
    const userGoal = resolveGoal(currentUser);

    // --- Course Data (Reused & Expanded) ---
    const allCourses = [
        // JEE
        {
            id: 1, cat: 'JEE', title: "Ignite JEE (Class 11)", tag: "BESTSELLER",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
            price: "4,500", originalPrice: "8,000", date: "15th Aug 2025", validity: "JEE Adv 2027",
            description: "Complete Class 11 PCM syllabus coverage from basic to advanced level. Includes daily practice papers and video solutions.",
            features: ['Live Classes', 'DPPs & Video Soln', 'Doubt Engine', 'AITS', 'Hardcopy Modules'],
            color: "#3b82f6", popular: true
        },
        {
            id: 2, cat: 'JEE', title: "Achiever JEE (Class 12)", tag: "FAST FILLING",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
            price: "4,500", originalPrice: "8,000", date: "15th Aug 2025", validity: "JEE Adv 2026",
            description: "Targeted at Class 12 students for Boards + JEE Mains & Advanced. Complete syllabus by Dec 2025.",
            features: ['Live Classes', 'Board Prep', 'Question Bank', 'PYQs', 'Revision Planner'],
            color: "#3b82f6", popular: true
        },
        {
            id: 3, cat: 'JEE', title: "Warrior JEE (Droppers)", tag: "LIVE",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
            price: "3,800", originalPrice: "6,000", date: "1st Aug 2025", validity: "JEE Adv 2026",
            description: "High-intensity course for repeaters focusing on speed, accuracy, and filling conceptual gaps.",
            features: ['Daily 6 Hrs Class', 'Dropper Modules', 'Rank Improvement', 'Short Notes', 'Doubt Rooms'],
            color: "#ef4444", popular: false
        },
        {
            id: 101, cat: 'JEE', title: "JEE Final Lap Crash Course", tag: "CRASH COURSE",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
            price: "1,499", originalPrice: "3,000", date: "1st Dec 2025", validity: "JEE Main 2026",
            description: "Last minute booster for JEE Mains covering high-weightage topics in 45 days.",
            features: ['45 Days Plan', 'Most Expected Qs', '5 Full Mock Tests', 'Tips & Tricks'],
            color: "#ef4444", popular: false
        },

        // NEET
        {
            id: 4, cat: 'NEET', title: "Genesis NEET (Class 11)", tag: "NEW",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
            price: "4,200", originalPrice: "7,500", date: "20th Aug 2025", validity: "NEET 2027",
            description: "Strong foundation for medical aspirants with extreme detail on NCERT Biology.",
            features: ['Live PCB Classes', 'NCERT Line-by-Line', 'Daily Quizzes', 'Unlimited Doubts'],
            color: "#10b981", popular: true
        },
        {
            id: 5, cat: 'NEET', title: "Zenith NEET (Class 12)", tag: "TRENDING",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
            price: "4,200", originalPrice: "7,500", date: "20th Aug 2025", validity: "NEET 2026",
            description: "Balance Board exams and NEET prep perfectly. Aim for 650+ in NEET.",
            features: ['Live PCB Classes', 'Board Practical Help', 'Assertion-Reason Qs', 'Weekly Tests'],
            color: "#10b981", popular: true
        },
        {
            id: 6, cat: 'NEET', title: "Sankalp NEET (Droppers)", tag: "LEGENDARY",
            image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop",
            price: "3,800", originalPrice: "6,000", date: "5th Aug 2025", validity: "NEET 2026",
            description: "Designed for drop year students. Start from zero and go to hero level.",
            features: ['Daily 4 Classes', 'NCERT Niches', 'Rank Booster Tests', 'Personal Mentorship'],
            color: "#8b5cf6", popular: true
        },
        {
            id: 102, cat: 'NEET', title: "NEET Score Booster (Bio)", tag: "SUBJECT",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
            price: "999", originalPrice: "1,500", date: "Anytime", validity: "NEET 2026",
            description: "Master Biology to score 360/360. Includes only Biology (Botany + Zoology) lectures and tests.",
            features: ['Complete Bio Syllabus', 'Diagram based Qs', 'NCERT Filtered Notes', '20+ Bio Mock Tests'],
            color: "#10b981", popular: false
        },

        // Foundation
        {
            id: 7, cat: 'Foundation', title: "Prodigy (Class 10)", tag: "BOARDS",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
            price: "2,999", originalPrice: "5,000", date: "1st Sep 2025", validity: "Mar 2026",
            description: "Ace Class 10 Boards and build a base for JEE/NEET. For CBSE, ICSE and State Boards.",
            features: ['Maths, Science, SST, Eng', 'NTSE Prep', 'Olympiad Level Qs', 'Board Sample Papers'],
            color: "#f59e0b", popular: true
        },
        {
            id: 8, cat: 'Foundation', title: "Nurture (Class 9)", tag: "EARLY STARTER",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
            price: "2,499", originalPrice: "4,500", date: "1st Sep 2025", validity: "Mar 2026",
            description: "Start early to stay ahead. Covers Class 9 syllabus with intro to Class 11 Physics/Math.",
            features: ['All Subjects', 'Logical Reasoning', 'Maths Olympiad Prep', 'Live Interactive Classes'],
            color: "#f59e0b", popular: false
        },

        // Test Series
        {
            id: 9, cat: 'Test Series', title: "All India Test Series (AITS)", tag: "PRACTICE",
            image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop",
            price: "999", originalPrice: "2,000", date: "Starts Oct 1st", validity: "Until Exam",
            description: "Real exam simulation. 15 Part Tests + 10 Full Syllabus Tests with detailed analysis.",
            features: ['Exact NTA Interface', 'All India Rank', 'Video Analysis', 'Error Analysis Report'],
            color: "#06b6d4", popular: false
        },
        {
            id: 10, cat: 'Test Series', title: "NCERT Master (NEET Tests)", tag: "MUST BUY",
            image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop",
            price: "999", originalPrice: "1,500", date: "Starts Oct 1st", validity: "Until Exam",
            description: "Strictly NCERT based question bank and test series for NEET aspirants.",
            features: ['Page-wise Questions', 'Statement Based Qs', 'Match Columns', 'Detailed Text Solutions'],
            color: "#06b6d4", popular: false
        }
    ];

    const baseCourses = userGoal ? allCourses.filter((c) => c.cat === userGoal) : allCourses;

    const filteredCourses = baseCourses.filter(course => {
        const matchesCategory = activeCategory === 'All' || course.cat === activeCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = userGoal ? ['All', userGoal] : ['All', 'JEE', 'NEET', 'Foundation', 'Test Series'];

    return (
        <div style={{ background: '#050505', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: 'white', paddingTop: '80px', paddingBottom: '80px' }}>
            <AnimatePresence>
                {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
            </AnimatePresence>

            <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>
                        All Courses
                    </motion.h1>
                    <p style={{ color: '#a1a1aa', fontSize: '1.2rem', marginBottom: '3rem' }}>Browse our complete catalog of premium courses designed for toppers.</p>

                    {/* Search & Filter */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
                            <input
                                type="text"
                                placeholder="Search for courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', padding: '16px 16px 16px 56px', background: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', color: 'white', fontSize: '1rem', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className="btn-reset"
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '100px',
                                        background: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.05)',
                                        color: activeCategory === cat ? 'black' : '#a1a1aa',
                                        fontWeight: '600', border: '1px solid transparent',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
                    <AnimatePresence>
                        {filteredCourses.map((course) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={course.id}
                                style={{ background: '#18181b', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}
                                whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.2)' }}
                            >
                                <div style={{ height: '220px', position: 'relative' }}>
                                    <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        {course.tag}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px', background: 'linear-gradient(to top, #18181b, transparent)' }} />
                                </div>

                                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '0.85rem', color: course.color, fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>{course.cat}</div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', lineHeight: 1.2 }}>{course.title}</h3>
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '20px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Timer size={14} /> {course.date}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} /> {course.validity}</span>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>₹{course.price}</span>
                                            <span style={{ fontSize: '0.9rem', color: '#71717a', textDecoration: 'line-through', marginLeft: '8px' }}>₹{course.originalPrice}</span>
                                        </div>
                                        <button
                                            onClick={() => setSelectedCourse(course)}
                                            className="btn-reset"
                                            style={{ padding: '12px 24px', background: 'white', color: 'black', borderRadius: '100px', fontWeight: '700', fontSize: '0.9rem', transition: 'transform 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </div>
    );
};

export default Courses;
