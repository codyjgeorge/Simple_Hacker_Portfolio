require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
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