
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen, Target, Clock, Trophy,
    Calendar, PlayCircle, ChevronRight,
    Zap, Activity, Star, Layout, Bookmark,
    BarChart2, Users, FileText, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';


const StudentDashboard = () => {
    // Real User Data
    const [user, setUser] = useState({
        name: "Student",
        goal: "General",
        rank: "N/A",
        streak: 0,
        percentile: 0
    });

    const [stats, setStats] = useState({
        testsCompleted: 0,
        avgAccuracy: 0,
        questionsSolved: 0
    });

    const [testHistory, setTestHistory] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [showGoalSelector, setShowGoalSelector] = useState(false); // Default false, strictly check auth
    const [myCourses, setMyCourses] = useState([]);

    useEffect(() => {
        // Load User
        const storedUser = localStorage.getItem('digimentors_current_user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(prev => ({
                ...prev,
                name: parsed.name,
                goal: parsed.educationDetails?.targetExam || 'General'
            }));
            if (!parsed.educationDetails?.targetExam) {
                setShowGoalSelector(true);
            } else {
                setSelectedGoal(parsed.educationDetails.targetExam);
            }
        } else {
            // Redirect to login if not found? Or just show selector/demo?
            // For now, let's keep demo mode if not logged in but encourage login
            setShowGoalSelector(true);
        }

        // Load History & Calculate Stats
        const history = JSON.parse(localStorage.getItem('digimentors_test_history') || '[]');
        setTestHistory(history);

        if (history.length > 0) {
            const totalTests = history.length;
            const totalQuestions = history.reduce((acc, curr) => acc + (curr.attempted || 0), 0);
            const avgAcc = Math.round(history.reduce((acc, curr) => acc + (curr.accuracy || 0), 0) / totalTests);

            setStats({
                testsCompleted: totalTests,
                questionsSolved: totalQuestions,
                avgAccuracy: avgAcc
            });

            // Simulating Rank based on score (Real logic would need backend)
            setUser(prev => ({ ...prev, percentile: avgAcc > 80 ? 98 : avgAcc > 50 ? 85 : 60 }));
        }

        // Load Courses
        const courses = JSON.parse(localStorage.getItem('digimentors_user_courses') || '[]');
        setMyCourses(courses);

    }, []);

    const handleGoalSelect = (goal) => {
        // Update user profile in local storage if exists
        const storedUser = localStorage.getItem('digimentors_current_user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            parsed.educationDetails = { ...parsed.educationDetails, targetExam: goal };
            localStorage.setItem('digimentors_current_user', JSON.stringify(parsed));
            setUser(prev => ({ ...prev, goal: goal }));
        }
        setSelectedGoal(goal);
        setTimeout(() => setShowGoalSelector(false), 500);
    };

    const GoalSelector = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
                background: 'rgba(10, 11, 16, 0.98)',
                backdropFilter: 'blur(20px)',
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 9999
            }}
        >
            <div className="container" style={{ maxWidth: '1000px', textAlign: 'center', position: 'relative', zIndex: 2 }}>

                {/* Background Decoration */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
                    <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
                    <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: '300px', height: '300px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
                </div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <div className="academic-badge" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>Start Your Journey</div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        marginBottom: '1rem',
                        fontWeight: '800',
                        color: 'white',
                        letterSpacing: '-0.02em'
                    }}>
                        Decide Your <span className="gradient-text">Path</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3.5rem', maxWidth: '600px', margin: '0 auto 3.5rem', lineHeight: '1.6' }}>
                        Choose your target exam to unlock a personalized learning dashboard tailored to your success.
                    </p>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '24px',
                        marginBottom: '2rem'
                    }}>
                        {[
                            { id: 'JEE Main', title: 'JEE Mains & Adv', icon: Zap, color: '#f59e0b', desc: 'Engineering Entrance' },
                            { id: 'NEET', title: 'NEET Medical', icon: Activity, color: '#10b981', desc: 'Medical Entrance' },
                            { id: 'Foundations', title: 'Foundation', icon: BookOpen, color: '#6366f1', desc: 'Class 8-10 Base Building' }
                        ].map((item, idx) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                whileHover={{ y: -8, scale: 1.02, boxShadow: `0 20px 40px -10px ${item.color}30` }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleGoalSelect(item.id)}
                                className="glass-card"
                                style={{
                                    padding: '2.5rem',
                                    textAlign: 'left',
                                    border: selectedGoal === item.id ? `2px solid ${item.color}` : '1px solid rgba(255,255,255,0.08)',
                                    background: selectedGoal === item.id ?
                                        `linear-gradient(145deg, rgba(${parseInt(item.color.slice(1, 3), 16)}, ${parseInt(item.color.slice(3, 5), 16)}, ${parseInt(item.color.slice(5, 7), 16)}, 0.15), rgba(21, 23, 30, 0.8))` :
                                        'linear-gradient(145deg, rgba(30, 32, 40, 0.6), rgba(21, 23, 30, 0.8))',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.2rem',
                                    width: '300px', // Fixed width for uniformity
                                    minHeight: '280px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    width: '60px', height: '60px',
                                    borderRadius: '16px',
                                    background: `rgba(${parseInt(item.color.slice(1, 3), 16)}, ${parseInt(item.color.slice(3, 5), 16)}, ${parseInt(item.color.slice(5, 7), 16)}, 0.15)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '2rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    <item.icon size={28} color={item.color} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '8px' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.desc}</p>
                                </div>
                                <div style={{
                                    marginTop: 'auto',
                                    paddingTop: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: item.color,
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    opacity: 0.9
                                }}>
                                    Select Path <ChevronRight size={16} />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );

    const StatCard = ({ icon: Icon, label, value, trend, trendUp, color }) => (
        <div className="glass-card" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '80px', height: '80px', background: color, filter: 'blur(50px)', opacity: 0.15 }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)' }}>
                    <Icon size={20} color={color} />
                </div>
                {trend && (
                    <span style={{
                        fontSize: '0.75rem', fontWeight: '700',
                        color: trendUp ? '#10b981' : '#ef4444',
                        background: trendUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        padding: '4px 8px', borderRadius: '100px'
                    }}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'white' }}>{value}</div>
            </div>
        </div>
    );

    const ActivityItem = ({ title, subject, time, type }) => (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: type === 'Test' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {type === 'Test' ? <Target size={18} color="#f59e0b" /> : <PlayCircle size={18} color="#6366f1" />}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontWeight: '600', fontSize: '0.95rem' }}>{title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{subject} • {time}</div>
            </div>
            <button className="btn-reset" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
                <ChevronRight size={16} color="var(--text-muted)" />
            </button>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px', paddingBottom: '40px' }}>
            {showGoalSelector && <GoalSelector />}

            <div className="container">
                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Welcome, {user.name}</h1>
                            {selectedGoal && (
                                <span className="academic-badge" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>
                                    Target: {selectedGoal}
                                </span>
                            )}
                        </div>
                        <p style={{ color: 'var(--text-muted)' }}>Here's your testing performance snapshot.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="glass-card btn-reset" style={{ padding: '10px 20px', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onClick={() => setShowGoalSelector(true)} // Allow changing goal
                        >
                            <SettingsIcon size={16} /> Customize Path
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <StatCard icon={Target} label="Global Rank (Est.)" value={user.rank !== "N/A" ? `#${Math.floor(20000 - (user.percentile * 200))}` : "Unranked"} trend={user.rank !== "N/A" ? "+125 Positions" : null} trendUp={true} color="#6366f1" />
                    <StatCard icon={FileText} label="Tests Completed" value={stats.testsCompleted} trend="All Time" trendUp={true} color="#f59e0b" />
                    <StatCard icon={Trophy} label="Avg. Accuracy" value={`${stats.avgAccuracy}%`} trend={stats.avgAccuracy > 70 ? "Excellent" : "Keep Improving"} trendUp={stats.avgAccuracy > 70} color="#ec4899" />
                    <StatCard icon={Zap} label="Questions Solved" value={stats.questionsSolved} trend="Total Solved" trendUp={true} color="#10b981" />
                </div>

                {/* Quick Access / All Resources */}
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Quick Actions</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { title: 'Custom Practice', path: '/test-generator', icon: Target, color: '#8b5cf6' },
                            { title: 'Question Bank', path: '/questions', icon: BookOpen, color: '#3b82f6' },
                            { title: 'Test History', path: '/test-history', icon: Clock, color: '#f59e0b' },
                            { title: 'Live Analysis', path: '/analysis', icon: BarChart2, color: '#10b981' },
                            { title: 'Leaderboard', path: '/leaderboard', icon: Trophy, color: '#ec4899' },
                            { title: 'Mentorship', path: '/mentorship', icon: Users, color: '#8b5cf6' },
                            { title: 'Study Material', path: '/study-material', icon: Layers, color: '#6366f1' },
                            { title: 'Blog & News', path: '/blog', icon: FileText, color: '#06b6d4' },
                            { title: 'Contact Support', path: '/contact', icon: Layout, color: '#ef4444' }
                        ].map((item) => (
                            <Link key={item.title} to={item.path} style={{ textDecoration: 'none' }}>
                                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', height: '100%', transition: 'all 0.3s' }}>
                                    <div style={{ padding: '12px', borderRadius: '12px', background: `${item.color}20`, color: item.color }}>
                                        <item.icon size={24} />
                                    </div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>{item.title}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Main Content Areas */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

                    {/* Active Test Series */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Active Test Series</h2>
                            <Link to="/test-series" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>View All Series</Link>
                        </div>

                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                            <div style={{ position: 'relative', width: '100%', height: '350px', background: 'linear-gradient(90deg, #1e1b4b, #312e81)' }}>
                                <div style={{ padding: '2rem', position: 'relative', zIndex: 2 }}>
                                    <span style={{ background: '#f59e0b', color: 'black', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1rem', display: 'inline-block' }}>LIVE NOW</span>
                                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '700' }}>{selectedGoal ? `${selectedGoal} Official Mock` : 'Full Syllabus Mock'}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>Physics, Chemistry, Maths/Bio • Real Pattern</p>

                                    <div style={{ width: '100%', maxWidth: '400px', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '100px', marginBottom: '1rem' }}>
                                        <div style={{ width: '0%', height: '100%', background: '#f59e0b', borderRadius: '100px' }}></div>
                                    </div>

                                    <Link to={`/attempt-test/${selectedGoal?.toLowerCase().replace(' ', '-') || 'full'}-mock-test`} className="btn-reset" style={{ padding: '12px 30px', background: 'white', color: 'black', borderRadius: '100px', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                        Start Assessment <PlayCircle size={18} />
                                    </Link>
                                </div>
                                {/* Decorative circle */}
                                <div style={{ position: 'absolute', right: '-20px', bottom: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', blur: '40px' }}></div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* My Courses Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>My Learning</h2>
                        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>Explore More</Link>
                    </div>

                    {myCourses.length === 0 ? (
                        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <PlayCircle size={24} color="var(--text-muted)" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Courses Yet</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Start your learning journey with our premium video courses.</p>
                            <Link to="/category/jee" className="btn-reset" style={{
                                display: 'inline-block',
                                padding: '10px 24px',
                                background: 'white', color: 'black',
                                borderRadius: '8px', fontWeight: '600'
                            }}>
                                Browse Courses
                            </Link>
                        </div>
                    ) : (
                        <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                            {myCourses.map((course, idx) => (
                                <div key={idx} className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                                    <div style={{ height: '140px', background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <PlayCircle size={40} color="white" style={{ opacity: 0.9 }} />
                                    </div>
                                    <div style={{ padding: '1.25rem' }}>
                                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '4px', fontWeight: '700' }}>{course.category}</div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.4' }}>{course.title}</h3>
                                        <button className="btn-reset" style={{
                                            width: '100%',
                                            padding: '8px',
                                            background: 'rgba(255,255,255,0.1)',
                                            color: 'white',
                                            borderRadius: '6px',
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}>
                                            Continue Learning
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Content Areas - Grid Continuation */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

                    {/* Pending Actions */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Recommended</h2>
                        </div>
                        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                <h4 style={{ fontWeight: '700', marginBottom: '4px', color: '#818cf8' }}>Mechanics Masterclass</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Strengthen your core concepts.</p>
                                <button onClick={() => window.location.href = '/attempt-test/mechanics-practice'} className="btn-reset" style={{ width: '100%', padding: '8px', background: '#6366f1', color: 'white', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem' }}>Start Practice</button>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                <h4 style={{ fontWeight: '700', marginBottom: '4px', color: '#34d399' }}>Organic Chemistry</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Reaction mechanisms and more.</p>
                                <button onClick={() => window.location.href = '/attempt-test/organic-chemistry'} className="btn-reset" style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px solid #34d399', color: '#34d399', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem' }}>Practice Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Test Schedule */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Schedule</h2>
                        </div>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center', minWidth: '60px' }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TOM'W</div>
                                        <div style={{ fontWeight: '700', color: '#ef4444' }}>10:00</div>
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '700', fontSize: '1rem' }}>Unit Test - 05</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Electromagnetism</p>
                                        <button className="btn-reset" style={{ marginTop: '8px', padding: '6px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700' }}>REGISTER</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Recent Activity</h2>
                        </div>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                            {testHistory.length === 0 ? (
                                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No tests attempted yet. Start a diagnostic test to see your analytics here.
                                </div>
                            ) : (
                                testHistory.slice(0, 5).map((test, idx) => (
                                    <ActivityItem
                                        key={idx}
                                        title={test.name || "Test Attempt"}
                                        subject={`${test.accuracy}% Accuracy • ${test.score}/${test.maxScore} Marks`}
                                        time={test.date || "Just now"}
                                        type="Test"
                                    />
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

};

const SettingsIcon = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);

export default StudentDashboard;
