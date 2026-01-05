
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Lock, PlayCircle, Download, FileText,
    BookOpen, Video, ShoppingCart, CheckCircle
} from 'lucide-react';

const StudyMaterial = () => {
    const [activeTab, setActiveTab] = useState('courses');

    // Mock Data for Paid Video Courses
    const courses = [
        {
            id: 1,
            title: "Complete Mechanics Mastery (JEE Adv)",
            instructor: "Rohit Sir",
            lectures: 45,
            duration: "60h",
            price: 1999,
            image: "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)",
            isPurchased: false
        },
        {
            id: 2,
            title: "Organic Chemistry: Zero to Hero",
            instructor: "Priya Ma'am",
            lectures: 32,
            duration: "40h",
            price: 1499,
            image: "linear-gradient(135deg, #10b981 0%, #064e3b 100%)",
            isPurchased: true
        },
        {
            id: 3,
            title: "Calculus Crash Course",
            instructor: "Amit Sir",
            lectures: 20,
            duration: "25h",
            price: 999,
            image: "linear-gradient(135deg, #f59e0b 0%, #78350f 100%)",
            isPurchased: false
        }
    ];

    // Mock Data for T&D (Test & Discussion) PDFs
    const documents = [
        {
            id: 101,
            title: "Major Test 03 - Question Paper & Sol",
            subject: "Full Syllabus",
            date: "Jan 04, 2026",
            size: "2.4 MB",
            type: "T&D"
        },
        {
            id: 102,
            title: "Electrostatics - 50 Most Important Ques",
            subject: "Physics",
            date: "Dec 30, 2025",
            size: "1.1 MB",
            type: "Assignment"
        },
        {
            id: 103,
            title: "Organic Reagents Handbook (Handwritten)",
            subject: "Chemistry",
            date: "Dec 15, 2025",
            size: "5.6 MB",
            type: "Notes"
        }
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="academic-badge" style={{ marginBottom: '1rem' }}>PREMIUM RESOURCES</div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Study Material Library</h1>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                        Access high-quality recorded lectures, detailed test solutions, and curated notes to accelerate your preparation.
                    </p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setActiveTab('courses')}
                        className="btn-reset"
                        style={{
                            padding: '12px 24px',
                            background: activeTab === 'courses' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: activeTab === 'courses' ? 'white' : 'var(--text-muted)',
                            borderRadius: '100px',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Video size={18} /> Recorded Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('downloads')}
                        className="btn-reset"
                        style={{
                            padding: '12px 24px',
                            background: activeTab === 'downloads' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: activeTab === 'downloads' ? 'white' : 'var(--text-muted)',
                            borderRadius: '100px',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Download size={18} /> PDFs & Downloads
                    </button>
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'courses' ? (
                        <div className="responsive-grid">
                            {courses.map((course) => (
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

                                            <button className="btn-reset" style={{
                                                padding: '10px 20px',
                                                background: course.isPurchased ? 'rgba(255,255,255,0.1)' : 'white',
                                                color: course.isPurchased ? 'white' : 'black',
                                                borderRadius: '8px',
                                                fontWeight: '700',
                                                display: 'flex', alignItems: 'center', gap: '8px'
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
                    ) : (
                        <div className="glass-card" style={{ padding: '0', maxWidth: '900px', margin: '0 auto', overflow: 'hidden' }}>
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Test Papers, Solutions & Notes</h3>
                            </div>
                            <div>
                                {documents.map((doc, idx) => (
                                    <div key={doc.id} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '1.5rem',
                                        borderBottom: idx !== documents.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                        flexWrap: 'wrap'
                                    }}>
                                        <div style={{
                                            width: '50px', height: '50px', borderRadius: '12px',
                                            background: doc.type === 'T&D' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                                            color: doc.type === 'T&D' ? '#f59e0b' : '#6366f1',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {doc.type === 'Notes' ? <BookOpen size={24} /> : <FileText size={24} />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontWeight: '600', marginBottom: '4px', fontSize: '1rem' }}>{doc.title}</h4>
                                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                <span>{doc.subject}</span>
                                                <span>• {doc.date}</span>
                                                <span>• {doc.size}</span>
                                            </div>
                                        </div>
                                        <button className="btn-reset" style={{
                                            padding: '8px 16px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            color: 'white',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            fontSize: '0.85rem',
                                            display: 'flex', alignItems: 'center', gap: '6px'
                                        }}>
                                            <Download size={16} /> Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

            </div>
        </div>
    );
};

export default StudyMaterial;
