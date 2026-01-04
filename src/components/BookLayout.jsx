import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const BookLayout = ({ children }) => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ container: scrollRef });

    // Smooth scroll progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="book-container">
            {/* Spine (Sidebar/TopBar) */}
            <div className="book-spine">
                <div className="spine-text">DIGIMENTORS</div>
            </div>

            {/* Main Content Area */}
            <div className="book-content" style={{ overflowY: 'auto', maxHeight: '100vh', scrollBehavior: 'smooth' }} ref={scrollRef}>

                {/* Reading Progress Indicator */}
                <motion.div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'var(--highlight-gold)',
                        transformOrigin: '0%',
                        scaleX,
                        zIndex: 100
                    }}
                />

                {/* Paper Texture Overlay */}
                <div className="page-texture"></div>

                <div className="content-inner">
                    {children}
                </div>

                {/* Floating Bookmark */}
                <div className="bookmark" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Index</span>
                </div>

            </div>
        </div>
    );
};

export default BookLayout;
