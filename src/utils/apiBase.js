let base = '';
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) {
    base = String(import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
  } else if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      base = 'http://localhost:3001';
    } else {
      base = '';
    }
  }
} catch { base = ''; }

export const API_BASE = base;
