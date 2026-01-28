
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
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        borderRadius: '100px',
                        background: 'var(--surface-highlight)',
                        border: '1px solid var(--border)',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        color: 'var(--primary)',
                        marginBottom: '1rem',
                        letterSpacing: '0.05em'
                    }}>
                        PREMIUM RESOURCES
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>Study Material Library</h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Access high-quality recorded lectures, detailed test solutions, and curated notes to accelerate your preparation.
                    </p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`btn-reset ${activeTab === 'courses' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{
                            padding: '12px 24px',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            borderRadius: '100px'
                        }}
                    >
                        <Video size={18} /> Recorded Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('downloads')}
                        className={`btn-reset ${activeTab === 'downloads' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{
                            padding: '12px 24px',
                            fontWeight: '600',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            borderRadius: '100px'
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
                                <div key={course.id} className="card-base" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ height: '200px', background: 'var(--surface-highlight)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-light)' }}>
                                        {/* Colored Overlay for "Cover" look */}
                                        <div style={{ position: 'absolute', inset: 0, background: course.image, opacity: 0.8 }}></div>

                                        {course.isPurchased ? (
                                            <PlayCircle size={60} color="white" style={{ position: 'relative', zIndex: 10, dropShadow: '0 4px 6px rgba(0,0,0,0.3)' }} />
                                        ) : (
                                            <div style={{ position: 'relative', zIndex: 10, background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                                                <Lock size={32} color="white" />
                                            </div>
                                        )}
                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700', color: 'white', zIndex: 10 }}>
                                            {course.lectures} Lectures • {course.duration}
                                        </div>
                                    </div>
                                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px', lineHeight: '1.4', color: 'var(--text-main)' }}>{course.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>By {course.instructor}</p>

                                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            {course.isPurchased ? (
                                                <div style={{ color: '#10b981', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <CheckCircle size={18} /> Owned
                                                </div>
                                            ) : (
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>₹{course.price}</div>
                                            )}

                                            <button className={course.isPurchased ? 'btn-secondary' : 'btn-primary'} style={{
                                                padding: '10px 20px',
                                                fontSize: '0.9rem'
                                            }}>
                                                {course.isPurchased ? 'Watch Now' : (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Buy Now <ShoppingCart size={16} /></span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card-base" style={{ padding: '0', maxWidth: '900px', margin: '0 auto', overflow: 'hidden' }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'var(--surface-highlight)' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>Test Papers, Solutions & Notes</h3>
                            </div>
                            <div>
                                {documents.map((doc, idx) => (
                                    <div key={doc.id} style={{
                                        display: 'flex', alignItems: 'center', gap: '1.5rem',
                                        padding: '20px 24px',
                                        borderBottom: idx !== documents.length - 1 ? '1px solid var(--border)' : 'none',
                                        flexWrap: 'wrap',
                                        transition: 'background 0.2s',
                                        cursor: 'pointer'
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-highlight)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{
                                            width: '56px', height: '56px', borderRadius: '12px',
                                            background: doc.type === 'T&D' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                                            color: doc.type === 'T&D' ? '#f59e0b' : 'var(--primary)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: '1px solid var(--border-light)'
                                        }}>
                                            {doc.type === 'Notes' ? <BookOpen size={24} /> : <FileText size={24} />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontWeight: '600', marginBottom: '6px', fontSize: '1rem', color: 'var(--text-main)' }}>{doc.title}</h4>
                                            <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                <span>{doc.subject}</span>
                                                <span style={{ opacity: 0.5 }}>|</span>
                                                <span>{doc.date}</span>
                                                <span style={{ opacity: 0.5 }}>|</span>
                                                <span>{doc.size}</span>
                                            </div>
                                        </div>
                                        <button className="btn-secondary" style={{
                                            padding: '8px 16px',
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
