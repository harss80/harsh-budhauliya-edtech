
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Search, Crown } from 'lucide-react';

const Leaderboard = () => {
    const [filter, setFilter] = useState('Weekly');
    const [currentUser, setCurrentUser] = useState(null);

    // Mock Leaders Data
    const leaders = [
        { rank: 1, name: "Aarav Sharma", score: 295, exam: "JEE Adv", avatar: "#", change: "up" },
        { rank: 2, name: "Ishita Patel", score: 288, exam: "NEET", avatar: "#", change: "same" },
        { rank: 3, name: "Rohan Gupta", score: 282, exam: "JEE Adv", avatar: "#", change: "up" },
        { rank: 4, name: "Meera Reddy", score: 275, exam: "NEET", avatar: "#", change: "down" },
        { rank: 5, name: "Kunal Singh", score: 270, exam: "JEE Mains", avatar: "#", change: "same" }
    ];

    useEffect(() => {
        const user = localStorage.getItem('digimentors_user_profile');
        if (user) {
            const parsed = JSON.parse(user);
            // Simulate user rank
            setCurrentUser({ ...parsed, rank: 42, score: 215 });
        }
    }, []);

    const RankIcon = ({ rank }) => {
        if (rank === 1) return <Crown size={24} color="#fbbf24" fill="#fbbf24" />;
        if (rank === 2) return <Medal size={24} color="#94a3b8" fill="#94a3b8" />;
        if (rank === 3) return <Medal size={24} color="#b45309" fill="#b45309" />;
        return <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-muted)' }}>#{rank}</span>;
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="academic-badge" style={{ marginBottom: '1rem', background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>
                        HALL OF FAME
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Global Leaderboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Top performers across all Digimentors India branches.</p>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '3rem' }}>
                    {['Weekly', 'Monthly', 'All Time'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className="btn-reset"
                            style={{
                                padding: '10px 24px', borderRadius: '100px',
                                background: filter === f ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: filter === f ? 'white' : 'var(--text-muted)',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Top 3 Podium */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                    {/* Rank 2 */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)', borderRadius: '50%', margin: '0 auto 10px', border: '4px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '800', color: '#1e293b' }}>
                            2
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{leaders[1].name}</h3>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{leaders[1].score} pts</div>
                    </div>

                    {/* Rank 1 */}
                    <div style={{ textAlign: 'center', transform: 'translateY(-20px)' }}>
                        <Crown size={32} color="#fbbf24" fill="#fbbf24" style={{ marginBottom: '10px' }} />
                        <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', borderRadius: '50%', margin: '0 auto 10px', border: '4px solid #fac035', boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '800', color: '#78350f' }}>
                            1
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fbbf24' }}>{leaders[0].name}</h3>
                        <div style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: '600' }}>{leaders[0].score} pts</div>
                    </div>

                    {/* Rank 3 */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #fdba74 0%, #b45309 100%)', borderRadius: '50%', margin: '0 auto 10px', border: '4px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '800', color: '#451a03' }}>
                            3
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{leaders[2].name}</h3>
                        <div style={{ color: '#b45309', fontSize: '0.9rem' }}>{leaders[2].score} pts</div>
                    </div>
                </div>

                {/* Rank List */}
                <div className="glass-card" style={{ padding: '0', maxWidth: '800px', margin: '0 auto', overflow: 'hidden' }}>
                    {leaders.map((leader) => (
                        <div key={leader.rank} style={{
                            display: 'flex', alignItems: 'center', padding: '1.5rem',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            background: leader.rank === 1 ? 'rgba(251, 191, 36, 0.05)' : 'transparent'
                        }}>
                            <div style={{ width: '40px', textAlign: 'center', marginRight: '1rem' }}>
                                <RankIcon rank={leader.rank} />
                            </div>
                            <div style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', marginRight: '1rem' }} />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>{leader.name}</h4>
                                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>{leader.exam}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>{leader.score}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Score</div>
                            </div>
                        </div>
                    ))}

                    {/* Current User Fixed at Bottom of List if not in top 5 */}
                    {currentUser && (
                        <div style={{
                            display: 'flex', alignItems: 'center', padding: '1.5rem',
                            background: 'var(--primary)', position: 'sticky', bottom: 0,
                            boxShadow: '0 -10px 20px rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ width: '40px', textAlign: 'center', marginRight: '1rem', fontWeight: '800' }}>
                                #{currentUser.rank}
                            </div>
                            <div style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', marginRight: '1rem' }} />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px', color: 'white' }}>You ({currentUser.name})</h4>
                                <span style={{ fontSize: '0.8rem', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '4px', color: 'rgba(255,255,255,0.8)' }}>{currentUser.educationDetails?.targetExam || 'Student'}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>{currentUser.score}</div>
                                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>Score</div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Leaderboard;
