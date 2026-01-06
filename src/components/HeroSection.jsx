import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Octahedron, Dodecahedron, Icosahedron } from '@react-three/drei';
import { ArrowRight, PlayCircle } from 'lucide-react';

const AnimatedShape = ({ position, color, geometry: Geometry }) => {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Geometry ref={meshRef} position={position} args={[1, 0]}>
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.9}
                />
            </Geometry>
        </Float>
    );
};

const GeometricShapes = () => {
    return (
        <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            <fog attach="fog" args={['#0a0b10', 5, 20]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -5, -5]} intensity={2} color="#6366f1" />

            <AnimatedShape position={[4, 1, -5]} color="#6366f1" geometry={Icosahedron} />
            <AnimatedShape position={[-5, 2, -4]} color="#10b981" geometry={Octahedron} />
            <AnimatedShape position={[0, -2, -3]} color="#3b82f6" geometry={Dodecahedron} />
        </Canvas>
    );
};

const HeroSection = () => {
    return (
        <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 'min(180px, 15vh)', paddingBottom: '80px' }}>

            {/* Blueprint Overlay Lines */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}></div>
            <div style={{ position: 'absolute', top: '20%', left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)', opacity: 0.5 }}></div>
            <div style={{ position: 'absolute', top: '80%', left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)', opacity: 0.5 }}></div>

            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)', filter: 'blur(80px)', opacity: 0.2, borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '0%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }}></div>

            <Suspense fallback={null}>
                <GeometricShapes />
            </Suspense>

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="academic-badge"
                        style={{ marginBottom: '2.5rem' }}
                    >
                        <span className="scrolling-badge">✨ Redefining Digital Pedagogy</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ fontSize: 'var(--font-sizes-h0)', lineHeight: '1', fontWeight: '800', letterSpacing: '-0.04em', marginBottom: '2.5rem', color: 'white' }}
                    >
                        Master Your Future <br />
                        <span className="gradient-text">Through AI-Driven Learning</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ fontSize: 'var(--font-sizes-body-lg)', color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '750px', margin: '0 auto 4rem', lineHeight: '1.6', fontWeight: '400' }}
                    >
                        The next generation of <span style={{ color: 'white', fontWeight: '600' }}>adaptive education</span>. Tailored curriculums for NEET, JEE, and competitive excellence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="hero-buttons"
                    >
                        <button className="btn-reset"
                            onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{
                                padding: '16px 36px',
                                background: 'white',
                                color: 'black',
                                borderRadius: '100px',
                                fontWeight: '700',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 20px 40px -10px rgba(255,255,255,0.1)',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 30px 60px -12px rgba(255,255,255,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(255,255,255,0.1)';
                            }}
                        >
                            Explore Programs <ArrowRight size={22} />
                        </button>

                        <button className="btn-reset"
                            onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontWeight: '600', padding: '12px 24px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease', fontSize: '0.95rem', justifyContent: 'center' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        >
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PlayCircle size={18} fill="white" stroke="none" />
                            </div>
                            Watch Methodology
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
