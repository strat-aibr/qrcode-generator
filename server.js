import 'dotenv/config'; // Importa dotenv diretamente como ESM
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_KEY;

app.get('/fetch-qrcode/:endpoint', async (req, res) => {
    const { endpoint } = req.params;
    const apiUrl = `https://evolution.strat.tec.br/instance/connect/${endpoint}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'apikey': API_KEY }
        });

        if (!response.ok) {
            return res.status(response.status).send(response.statusText);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
