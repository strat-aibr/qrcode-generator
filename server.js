import 'dotenv/config'; // Importa e carrega as variáveis de ambiente do .env
import express from 'express'; // Importa o framework Express
import fetch from 'node-fetch'; // Importa o node-fetch para fazer requisições HTTP

const app = express();
const PORT = 3000; // Porta do servidor

// Obtém a API_KEY do arquivo .env
const API_KEY = process.env.API_KEY;

app.get('/fetch-qrcode/:endpoint', async (req, res) => {
    const { endpoint } = req.params; // Obtém o endpoint da URL
    const apiUrl = `https://evolution.strat.tec.br/instance/connect/${endpoint}`; // URL da API

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'apikey': API_KEY } // Adiciona o API Key no header
        });

        if (!response.ok) {
            return res.status(response.status).send(response.statusText);
        }

        const data = await response.json(); // Converte a resposta para JSON
        res.json(data); // Envia os dados como resposta
    } catch (error) {
        console.error('Error fetching QR Code:', error);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
