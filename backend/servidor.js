const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000; 

const DHL_API_KEY = 'Ic9GVRrlINp8ao3O5gz8VqmbOKUyOUBv';

app.use(express.json());
app.use(cors());

app.get('/track', async (req, res) => {
    const trackingNumber = req.query.trackingNumber;

    if (!trackingNumber) {
        return res.status(400).send({ message: 'O código de rastreamento é necessário.' });
    }

    try {
        const response = await axios.get(`https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`, {
            headers: {
                'DHL-API-Key': DHL_API_KEY
            }
        });

        res.send(response.data);
    } catch (error) {
        console.error('Erro ao realizar a requisição:', error);
        res.status(500).send({ message: 'Erro ao buscar informações de rastreamento' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
