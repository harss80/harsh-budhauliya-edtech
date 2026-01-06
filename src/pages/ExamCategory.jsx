
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { testCatalog } from '../data/testCatalog';
import { motion } from 'framer-motion';
import { Clock, BarChart2, ChevronRight, FileText, AlertCircle, BookOpen, Video, PlayCircle, Layers, CheckCircle, ShoppingCart, Lock } from 'lucide-react';

const ExamCategory = () => {
    const { category } = useParams(); // 'jee', 'neet', or 'foundation'
    const navigate = useNavigate();

    // Ensure category is matched correctly and define data
    const safeCategory = category ? category.toLowerCase() : '';
    const data = testCatalog && testCatalog[safeCategory];

    const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'courses'

    // Safe initialization to prevent crash if data is undefined
    const [activeSection, setActiveSection] = useState(data?.sections?.[0]?.id || 'air_rank');

    if (!testCatalog) {
        return <div className="section-padding text-center" style={{ paddingTop: '150px', color: 'white' }}>Error: Test Catalog Not Loaded</div>;
    }

    if (!data) {
        return (
            <div className="section-padding text-center" style={{ paddingTop: '150px', color: 'white' }}>
                <h2>Category Not Found: "{category}"</h2>
                <p>Available categories: {Object.keys(testCatalog).join(', ')}</p>
            </div>
        );
    }

    const [courseList, setCourseList] = useState([]);

    // Mock Courses Data (Simulated based on category)
    const MOCK_COURSES = [
        {
            id: 1,
            title: `${category.toUpperCase()} Full Year Course 2026`,
            instructor: "Top Faculty",
            lectures: 450,
            duration: "300h",
            price: 4999,
            image: "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)",
        },
        {
            id: 2,
            title: `Complete ${category === 'jee' ? 'Physics' : 'Biology'} Mastery`,
            instructor: "Dr. Verma",
            lectures: 120,
            duration: "80h",
            price: 1999,
            image: "linear-gradient(135deg, #10b981 0%, #064e3b 100%)",
        },
        {
            id: 3,
            title: "Crash Course: Last 3 Months",
            instructor: "Team Digimentors",
            lectures: 60,
            duration: "40h",
            price: 999,
            image: "linear-gradient(135deg, #f59e0b 0%, #78350f 100%)",
        }
    ];

    useEffect(() => {
        try {
            // Load purchased courses
            const purchasedRaw = localStorage.getItem('digimentors_user_courses');
            const purchased = purchasedRaw ? JSON.parse(purchasedRaw) : [];
            const updatedCourses = MOCK_COURSES.map(c => ({
                ...c,
                isPurchased: Array.isArray(purchased) && purchased.some(p => p.id === c.id && p.category === category)
            }));
            setCourseList(updatedCourses);
        } catch (e) {
            console.error("Error in ExamCategory useEffect:", e);
        }
    }, [category]);

    const handleBuyCourse = (course) => {
        const user = localStorage.getItem('digimentors_current_user');
        if (!user) {
            alert("Please login to purchase courses.");
            navigate('/login');
            return;
        }

        const purchased = JSON.parse(localStorage.getItem('digimentors_user_courses') || '[]');
        if (purchased.some(p => p.id === course.id && p.category === category)) return;

        const newPurchase = {
            id: course.id,
            category: category,
            title: course.title,
            purchasedAt: new Date().toISOString()
        };

        const newPurchasedList = [...purchased, newPurchase];
        localStorage.setItem('digimentors_user_courses', JSON.stringify(newPurchasedList));

        // Update UI
        setCourseList(prev => prev.map(c =>
            c.id === course.id ? { ...c, isPurchased: true } : c
        ));

        alert(`Successfully enrolled in ${course.title}!`);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">

                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
                        <ChevronRight size={16} color="var(--text-muted)" />
                        <span style={{ color: 'var(--primary)', fontWeight: '600', textTransform: 'capitalize' }}>{category}</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{data.title}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Your one-stop destination for {category.toUpperCase()} preparation. Tests, Classes, and Notes.</p>
                </div>

                {/* Main Tabs (Tests vs Courses) */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <button
                        onClick={() => setActiveTab('tests')}
                        className="btn-reset"
                        style={{
                            padding: '12px 24px',
                            borderBottom: activeTab === 'tests' ? '2px solid var(--primary)' : '2px solid transparent',
                            color: activeTab === 'tests' ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '700', fontSize: '1.1rem',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Layers size={20} /> Test Series
                    </button>
                    <button
                        onClick={() => setActiveTab('courses')}
                        className="btn-reset"
                        style={{
                            padding: '12px 24px',
                            borderBottom: activeTab === 'courses' ? '2px solid var(--primary)' : '2px solid transparent',
                            color: activeTab === 'courses' ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '700', fontSize: '1.1rem',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Video size={20} /> Live Classes & Courses
                    </button>
                </div>

                {/* TAB CONTENT: TESTS */}
                {activeTab === 'tests' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {/* Internal Navigation Tabs for Tests */}
                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', marginBottom: '2rem', paddingBottom: '4px' }}>
                            {data.sections.map((sec) => (
                                <button
                                    key={sec.id}
                                    onClick={() => setActiveSection(sec.id)}
                                    className="btn-reset"
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '100px',
                                        background: activeSection === sec.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        color: activeSection === sec.id ? 'white' : 'var(--text-muted)',
                                        fontWeight: '600',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {sec.title}
                                </button>
                            ))}
                        </div>

                        {/* Test Grid */}
                        <div className="responsive-grid">
                            {data.sections.find(s => s.id === activeSection)?.tests.map((test) => (
                                <motion.div
                                    key={test.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-card"
                                    style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                                >
                                    <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(to right, rgba(255,255,255,0.02), transparent)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '4px 10px', borderRadius: '4px', background: test.type.includes('AIR') ? '#dc2626' : 'rgba(59, 130, 246, 0.1)', color: test.type.includes('AIR') ? 'white' : '#60a5fa' }}>{test.type}</span>
                                            {test.difficulty && <span style={{ fontSize: '0.75rem', color: test.difficulty === 'Hard' ? '#f87171' : '#fbbf24' }}>{test.difficulty}</span>}
                                        </div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', lineHeight: '1.4' }}>{test.title}</h3>
                                    </div>

                                    <div style={{ padding: '1.5rem', flex: 1 }}>
                                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {test.duration}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FileText size={16} /> {test.questions} Qs</div>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/attempt-test/${test.id}`)}
                                            className="btn-reset"
                                            style={{
                                                width: '100%', padding: '12px',
                                                background: 'var(--primary)', color: 'white',
                                                borderRadius: '8px', fontWeight: '600',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                            }}
                                        >
                                            Start Test <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* TAB CONTENT: COURSES */}
                {activeTab === 'courses' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="responsive-grid">
                            {courseList.map((course) => (
                                <div key={course.id} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ height: '180px', background: course.image, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {course.isPurchased ? (
                                            <PlayCircle size={60} color="white" style={{ opacity: 0.9 }} />
                                        ) : (
                                            <div style={{ background: 'rgba(0,0,0,0.6)', padding: '1rem', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                                                <Lock size={32} color="white" />
                                            </div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                                            {course.lectures} Lectures • {course.duration}
                                        </div>
                                    </div>
                                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', lineHeight: '1.4' }}>{course.title}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>By {course.instructor}</p>

                                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            {course.isPurchased ? (
                                                <div style={{ color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <CheckCircle size={18} /> Owned
                                                </div>
                                            ) : (
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>₹{course.price}</div>
                                            )}

                                            <button
                                                onClick={() => course.isPurchased ? alert("Opening Course Player...") : handleBuyCourse(course)}
                                                className="btn-reset"
                                                style={{
                                                    padding: '10px 20px',
                                                    background: course.isPurchased ? 'rgba(255,255,255,0.1)' : 'white',
                                                    color: course.isPurchased ? 'white' : 'black',
                                                    borderRadius: '8px',
                                                    fontWeight: '700',
                                                    display: 'flex', alignItems: 'center', gap: '8px',
                                                    cursor: 'pointer'
                                                }}>
                                                {course.isPurchased ? 'Watch Now' : (
                                                    <>Buy Now <ShoppingCart size={16} /></>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default ExamCategory;
