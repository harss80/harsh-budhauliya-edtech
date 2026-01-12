
import fs from 'fs';
import http from 'http';
import path from 'path';

const DB_FILE = './db.json';
const PORT = 3000;

// Initialize DB
if (!fs.existsSync(DB_FILE)) {
    const initialData = {
        users: [],
        activities: [],
        stats: { totalVisits: 0 }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

const getDB = () => JSON.parse(fs.readFileSync(DB_FILE));
const saveDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

const server = http.createServer((req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // GET Data
    if (req.url === '/api/data' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(fs.readFileSync(DB_FILE));
        return;
    }

    // POST Visit
    if (req.url === '/api/visit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const visit = JSON.parse(body);
                const db = getDB();

                // Add Activity
                db.activities.unshift(visit);
                if (db.activities.length > 500) db.activities = db.activities.slice(0, 500);

                // Update Stats
                if (!db.stats) db.stats = { totalVisits: 0 };
                db.stats.totalVisits += 1;

                saveDB(db);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, stats: db.stats }));
            } catch (e) {
                console.error(e);
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Failed to process' }));
            }
        });
        return;
    }

    // POST User (Login/Signup)
    if (req.url === '/api/user' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const user = JSON.parse(body);
                const db = getDB();

                // Check if user exists
                const existingIndex = db.users.findIndex(u => u.email === user.email);
                if (existingIndex >= 0) {
                    // Update recent login time or merge details?
                    // Keep existing ID if not provided, etc.
                    db.users[existingIndex] = { ...db.users[existingIndex], ...user };
                } else {
                    db.users.push(user);
                }

                saveDB(db);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (e) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Failed to save user' }));
            }
        });
        return;
    }

    res.writeHead(404);
    res.end();
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Digimentors Backend running on port ${PORT}`);
});
