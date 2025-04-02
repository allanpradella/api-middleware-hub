const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Armazenamento temporário (em memória)
const storedVariables = {};

// Rota para fazer chamadas à API de origem
app.post('/api/fetch', async (req, res) => {
  const { method, url, body } = req.body;
  
  try {
    const response = await axios({
      method,
      url,
      data: body
    });
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rota para enviar dados ao sistema de destino
app.post('/api/send', (req, res) => {
  const { destinationUrl, mappedData } = req.body;
  // Aqui você implementaria o envio real
  console.log("Dados mapeados:", mappedData);
  res.json({ success: true, sentTo: destinationUrl });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));