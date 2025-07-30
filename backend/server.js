require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS to allow your GitHub Pages domain
app.use(cors({
    origin: true, // Allow all origins for now to debug
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());

// Proxy endpoint for MonkeyType API
app.post('/api/monkeytype', async (req, res) => {
    const { endpoint, method = 'GET', body } = req.body;

    console.log('Received request:', { endpoint, method, body });
    console.log('API Key available:', !!process.env.MONKEYTYPE_API_KEY);

    try {
        const headers = {
            'Authorization': `ApeKey ${process.env.MONKEYTYPE_API_KEY}`,
            'Content-Type': 'application/json',
        };

        console.log('Making request to:', endpoint);
        console.log('Headers:', { ...headers, Authorization: 'ApeKey [REDACTED]' });

        const response = await fetch(endpoint, {
            method,
            headers,
            body: method === 'POST' ? JSON.stringify(body) : undefined,
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

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});