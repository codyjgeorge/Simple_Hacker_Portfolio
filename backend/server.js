require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS to allow your GitHub Pages domain
app.use(cors({
    origin: ['https://codygeorge.github.io', 'http://localhost:3000', 'http://127.0.0.1:5500', 'https://codygeorge.github.io/Simple_Hacker_Portfolio'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Proxy endpoint for MonkeyType API
app.post('/api/monkeytype', async (req, res) => {
    const { endpoint, method = 'GET', body } = req.body;

    try {
        const response = await fetch(endpoint, {
            method,
            headers: {
                'Authorization': `ApeKey ${process.env.MONKEYTYPE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: method === 'POST' ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Proxy request failed', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});