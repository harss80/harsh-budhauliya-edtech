
import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '100px', paddingBottom: '60px', color: '#e4e4e7', fontFamily: '"Inter", sans-serif' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', color: '#3b82f6', marginBottom: '1.5rem' }}>
                        <Shield size={32} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '1rem' }}>Privacy Policy</h1>
                    <p style={{ color: '#a1a1aa', fontSize: '1.1rem' }}>Last updated: January 9, 2026</p>
                </div>

                <div style={{ background: '#18181b', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Eye size={24} color="#3b82f6" /> 1. Information We Collect
                        </h2>
                        <p style={{ lineHeight: '1.7', color: '#d4d4d8', marginBottom: '1rem' }}>
                            We collect information you provide directly to us when you create an account, participate in our tests, or communicate with us. This includes:
                        </p>
                        <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#a1a1aa' }}>
                            <li>Account Information (Name, Email, Phone Number, Grade).</li>
                            <li>Academic Data (Target Exam, Test Scores, Performance History).</li>
                            <li>Usage Data (Interaction with courses, time spent on questions).</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Lock size={24} color="#10b981" /> 2. How We Use Your Information
                        </h2>
                        <p style={{ lineHeight: '1.7', color: '#d4d4d8', marginBottom: '1rem' }}>
                            We use the collected data to personalize your learning experience and improve our detailed analytics engine. Specifically, we use it to:
                        </p>
                        <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#a1a1aa' }}>
                            <li>Generate personalized performance reports and insights.</li>
                            <li>Recommend specific batches or study material based on weak areas.</li>
                            <li>Authenticate your access to premium content and test series.</li>
                            <li>Process transactions and send related information.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FileText size={24} color="#f59e0b" /> 3. Data Protection
                        </h2>
                        <p style={{ lineHeight: '1.7', color: '#d4d4d8' }}>
                            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, accidental loss, or destruction. Your password is encrypted, and sensitive data is stored securely.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>4. Contact Us</h2>
                        <p style={{ lineHeight: '1.7', color: '#d4d4d8' }}>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@digimentors.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>support@digimentors.com</a>.
                        </p>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
