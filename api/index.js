console.log('Server function initialized');
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS to allow your GitHub Pages domain
app.use(cors({
    origin: true
}));
app.use(express.json());
// Proxy endpoint (POST Handler) for MonkeyType API
app.get('/', async (req, res) => {
    
    try {
        const headers = {
            'Authorization': `ApeKey ${process.env.MONKEYTYPE_API_KEY}`,
            'Content-Type': 'application/json',
        };

        console.log('Making request to:', endpoint);
        console.log('Headers:', { ...headers, Authorization: 'ApeKey [REDACTED]' });

                const endpoint = 'https://api.monkeytype.com/users/personalBests?mode=time&mode2=60';
        const response = await fetch(endpoint, {
            headers,
        });

        console.log('MonkeyType API response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('MonkeyType API error:', errorText);
            return res.status(response.status).json({ 
                error: 'MonkeyType API error', 
                status: response.status,
                details: errorText 
            });
        }

        const data = await response.json();
        console.log('MonkeyType API success:', data);
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Proxy request failed', details: error.message });
    }
});

// Test endpoint
app.get('/api/test', (req, res) => {
    // Set CORS headers explicitly
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    res.json({ 
        message: 'Backend is working!', 
        hasApiKey: !!process.env.MONKEYTYPE_API_KEY,
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
