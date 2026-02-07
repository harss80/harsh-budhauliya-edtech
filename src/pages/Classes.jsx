import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const classes = [6, 7, 8, 9, 10, 11, 12];

const Classes = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '100px', paddingBottom: '60px', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: 8 }}>School Boards</h1>
          <p style={{ color: '#a1a1aa' }}>Choose your class to access videos, PDFs and test series.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {classes.map((g) => (
            <Link key={g} to={`/class/${g}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={24} color="#e5e7eb" />
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>Class {g}</div>
                  <div style={{ color: '#a1a1aa', fontSize: '0.95rem' }}>Videos • PDFs • Test Series</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
