
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Newspaper, Calendar, ChevronRight, Tag,
    TrendingUp, Award, BookOpen, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Exam Updates', 'Study Tips', 'Success Stories', 'Policy News'];

    const blogPosts = [
        {
            id: 1,
            title: "JEE Main 2026: Expected Dates & Syllabus Changes",
            excerpt: "NTA is expected to release the official calendar for JEE Main 2026 soon. Experts predict minor adjustments in the syllabus...",
            category: "Exam Updates",
            date: "Jan 05, 2026",
            readTime: "5 min read",
            image: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
            featured: true
        },
        {
            id: 2,
            title: "5 Proven Strategies to Boost Your Physics Score",
            excerpt: "Struggling with Mechanics? Here are top 5 visualization techniques used by toppers to master difficult physics concepts.",
            category: "Study Tips",
            date: "Jan 03, 2026",
            readTime: "8 min read",
            image: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
            featured: false
        },
        {
            id: 3,
            title: "NEET 2025 Topper Interview: 'Consistency is Key'",
            excerpt: "Meet Aarav Singh, AIR 1, as he shares his daily routine, distraction management, and the importance of NCERT.",
            category: "Success Stories",
            date: "Dec 28, 2025",
            readTime: "10 min read",
            image: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            featured: false
        },
        {
            id: 4,
            title: "New Education Policy: Impact on Engineering Entrances",
            excerpt: "How the NEP 2020 implementation is reshaping the format of competitive exams starting next academic session.",
            category: "Policy News",
            date: "Dec 20, 2025",
            readTime: "6 min read",
            image: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
            featured: false
        },
        {
            id: 5,
            title: "Chemistry: Managing Organic & Inorganic together",
            excerpt: "Balancing reaction mechanisms with periodic table trends can be tough. Here is a schedule that works.",
            category: "Study Tips",
            date: "Dec 15, 2025",
            readTime: "7 min read",
            image: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
            featured: false
        },
        {
            id: 6,
            title: "Breaking: Board Exam Percentage Criteria Revised",
            excerpt: "The Ministry of Education has announced a relaxation in the 75% criteria for specific reservation categories.",
            category: "Exam Updates",
            date: "Dec 10, 2025",
            readTime: "4 min read",
            image: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            featured: false
        }
    ];

    const filteredPosts = activeCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="academic-badge"
                        style={{ marginBottom: '1rem' }}
                    >
                        DIGIMENTORS INSIGHTS
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="gradient-text"
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: '800' }}
                    >
                        Latest Educational News
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
                    >
                        Stay updated with exam announcements, expert strategies, and success stories from the Digimentors community.
                    </motion.p>
                </div>

                {/* Categories */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '3rem' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="btn-reset"
                            style={{
                                padding: '10px 24px',
                                borderRadius: '100px',
                                background: activeCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                                border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured Post (Only show if All is selected or category matches featured post) */}
                {activeCategory === 'All' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card"
                        style={{ padding: '0', overflow: 'hidden', marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}
                    >
                        <div style={{ height: '100%', minHeight: '300px', background: blogPosts[0].image, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Newspaper size={80} color="rgba(255,255,255,0.2)" />
                        </div>
                        <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <span className="academic-badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', padding: '6px 12px', fontSize: '0.75rem' }}>
                                    {blogPosts[0].category}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <Calendar size={14} /> {blogPosts[0].date}
                                </span>
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '800', lineHeight: '1.2' }}>{blogPosts[0].title}</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                {blogPosts[0].excerpt}
                            </p>
                            <button className="btn-reset" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-light)', fontWeight: '700' }}>
                                Read Full Article <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Grid */}
                <motion.div layout className="responsive-grid">
                    <AnimatePresence>
                        {filteredPosts.filter(p => activeCategory === 'All' ? !p.featured : true).map((post) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={post.id}
                                className="glass-card"
                                style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                                whileHover={{ y: -10 }}
                            >
                                <div style={{ height: '200px', background: post.image, position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '16px', left: '16px', padding: '6px 12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Tag size={12} /> {post.category}
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {post.date}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {post.readTime}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: 'white', lineHeight: '1.4' }}>{post.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{post.excerpt}</p>

                                    <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                                        <button className="btn-reset" style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontWeight: '600', fontSize: '0.9rem' }}>
                                            Read More <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Newsletter */}
                <div className="glass-card" style={{ marginTop: '6rem', padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(145deg, rgba(30, 32, 40, 0.8), rgba(21, 23, 30, 0.9))' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <BookOpen size={40} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Never Miss an Update</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>Subscribe to our newsletter to get the latest exam news and study tips delivered directly to your inbox.</p>

                    <div style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap' }}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            style={{
                                flex: 1,
                                padding: '16px 24px',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '100px',
                                color: 'white',
                                outline: 'none',
                                minWidth: '250px'
                            }}
                        />
                        <button className="btn-reset" style={{ padding: '16px 32px', background: 'var(--primary)', color: 'white', borderRadius: '100px', fontWeight: '700' }}>Subscribe</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Blog;
