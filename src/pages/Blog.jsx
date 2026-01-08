
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, ChevronRight, Tag,
    Search, User, TrendingUp, Sparkles,
    ArrowRightCircle, Mail
} from 'lucide-react';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Exam Strategy', 'Student Life', 'News & Updates', 'Subject Mastery'];

    // Simulated Blog Data with High-Quality Images
    const blogPosts = [
        {
            id: 1,
            title: "JEE Main 2026: Complete 1-Year Roadmap",
            excerpt: "A month-by-month breakdown of what you need to cover to secure a 99+ percentile in the upcoming JEE Main.",
            category: "Exam Strategy",
            author: "Rahul Verma (IIT Delhi)",
            date: "Jan 10, 2026",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
            featured: true
        },
        {
            id: 2,
            title: "5 Scientifically Proven Ways to Focus",
            excerpt: "Struggling with distractions? Neuroscience-backed techniques to maintain deep focus during long study sessions.",
            category: "Student Life",
            author: "Dr. Anjali Singh",
            date: "Jan 05, 2026",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2074&auto=format&fit=crop",
            featured: false
        },
        {
            id: 3,
            title: "NEET 2025: NTA Reduces Syllabus?",
            excerpt: "Breaking down the latest notification from NTA regarding chapter exclusions in Biology and Chemistry.",
            category: "News & Updates",
            author: "Digimentors Team",
            date: "Jan 03, 2026",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2970&auto=format&fit=crop",
            featured: false
        },
        {
            id: 4,
            title: "Mastering Rotational Motion in 3 Days",
            excerpt: "The most feared chapter in Physics simplified. Key concepts, critical problems, and visualization tricks.",
            category: "Subject Mastery",
            author: "Sameer Sir",
            date: "Dec 28, 2025",
            readTime: "12 min read",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
            featured: false
        },
        {
            id: 5,
            title: "Why Mock Tests Are More Important Than Lectures",
            excerpt: "Analysis showing the direct correlation between number of mock tests attempted and final rank.",
            category: "Exam Strategy",
            author: "Amit Kumar (AIR 45)",
            date: "Dec 20, 2025",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop",
            featured: false
        },
        {
            id: 6,
            title: "Managing Board Exams with JEE/NEET Prep",
            excerpt: "How to balance your school percentage goals with competitive exam aspirations without burning out.",
            category: "Student Life",
            author: "Priya S.",
            date: "Dec 15, 2025",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
            featured: false
        }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = blogPosts.find(p => p.featured);

    return (
        <div style={{ background: '#050505', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: 'white', paddingTop: '80px', paddingBottom: '80px' }}>

            <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

                {/* Header Section */}
                <div style={{ padding: '60px 0', textAlign: 'center', position: 'relative' }}>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', padding: '8px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <Sparkles size={14} /> Digimentors Insights
                    </motion.div>
                    <motion.h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        Expert Advice for <br /> <span className="gradient-text" style={{ background: 'linear-gradient(to right, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Future Toppers.</span>
                    </motion.h1>
                    <p style={{ fontSize: '1.2rem', color: '#a1a1aa', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Strategies, news, and motivation from India's best educators and past rankers.
                    </p>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto 2rem' }}>
                        <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} size={20} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '16px 16px 16px 50px', background: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', color: 'white', fontSize: '1rem', outline: 'none' }}
                        />
                    </div>

                    {/* Filters */}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="btn-reset"
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '100px',
                                    background: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.05)',
                                    color: activeCategory === cat ? 'black' : '#a1a1aa',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Post Area (Only on All) */}
                {activeCategory === 'All' && !searchQuery && featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ marginBottom: '5rem', background: '#18181b', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}
                    >
                        <div style={{ height: '400px' }}>
                            <img src={featuredPost.image} alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <span style={{ background: '#3b82f6', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>FEATURED</span>
                                <span style={{ color: '#a1a1aa', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {featuredPost.date}</span>
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.2 }}>{featuredPost.title}</h2>
                            <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>{featuredPost.excerpt}</p>
                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} /></div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{featuredPost.author}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Author</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Posts Grid */}
                <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                    <AnimatePresence>
                        {filteredPosts.filter(p => activeCategory === 'All' && !searchQuery ? !p.featured : true).map((post) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={post.id}
                                style={{ background: '#121214', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}
                                whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)' }}
                            >
                                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        src={post.image}
                                        alt={post.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        {post.category}
                                    </div>
                                </div>
                                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', gap: '12px', color: '#71717a', fontSize: '0.85rem', marginBottom: '12px' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {post.date}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {post.readTime}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', lineHeight: 1.3 }}>{post.title}</h3>
                                    <p style={{ color: '#a1a1aa', lineHeight: 1.6, marginBottom: '1.5rem' }}>{post.excerpt}</p>

                                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '28px', height: '28px', background: '#27272a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                                                <User size={14} color="#a1a1aa" />
                                            </div>
                                            <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{post.author}</span>
                                        </div>
                                        <button className="btn-reset" style={{ color: '#60a5fa', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            Read <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Newsletter */}
                <section style={{ marginTop: '8rem', padding: '4rem', background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', borderRadius: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                            <Mail size={32} color="white" />
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Get Studying Tips Weekly</h2>
                        <p style={{ color: '#cbd5e1', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>Join 50,000+ students who get our weekly digest of exam strategies and news.</p>

                        <div style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                            <input type="email" placeholder="Enter email address" style={{ flex: 1, padding: '16px 24px', borderRadius: '100px', border: 'none', fontSize: '1rem', outline: 'none' }} />
                            <button className="btn-reset" style={{ padding: '16px 32px', background: '#3b82f6', color: 'white', borderRadius: '100px', fontWeight: '700' }}>Subscribe</button>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Blog;
