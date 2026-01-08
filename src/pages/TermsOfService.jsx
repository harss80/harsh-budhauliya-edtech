
import React from 'react';
import { FileText, CheckSquare, Gavel, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '100px', paddingBottom: '60px', color: '#e4e4e7', fontFamily: '"Inter", sans-serif' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '20px', color: '#8b5cf6', marginBottom: '1.5rem' }}>
                        <FileText size={32} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '1rem' }}>Terms of Service</h1>
                    <p style={{ color: '#a1a1aa', fontSize: '1.1rem' }}>Last updated: January 9, 2026</p>
                </div>

                <div style={{ background: '#18181b', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckSquare size={24} color="#8b5cf6" /> 1. Acceptance of Terms
                        </h2>
                        <p style={{ lineHeight: '1.7', color: '#d4d4d8' }}>
                            By accessing and using Digimentors, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Gavel size={24} color="#ec4899" /> 2. User Responsibilities
                        </h2>
                        <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#a1a1aa' }}>
                            <li>You represent that you are of legal age to form a binding contract.</li>
                            <li>You agree to provide accurate and complete information during registration.</li>
                            <li>You are responsible for maintaining the confidentiality of your account password.</li>
                            <li>You agree not to share your account credentials with anyone else.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <AlertTriangle size={24} color="#f59e0b" /> 3. Intellectual Property
                        </h2>
                        <p style={{ lineHeight: '1.7', color: '#d4d4d8' }}>
                            The content on Digimentors, including but not limited to text, graphics, logos, images, test questions, and software, is the property of Digimentors and is protected by copyright laws. You may not reproduce, distribute, or create derivative works from this content without express written permission.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>4. Termination</h2>
                        <p style={{ lineHeight: '1.7', color: '#d4d4d8' }}>
                            We reserve the right to terminate or suspend your account immediately, without prior notice, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>5. Limitation of Liability</h2>
                        <p style={{ lineHeight: '1.7', color: '#d4d4d8' }}>
                            In no event shall Digimentors be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default TermsOfService;
