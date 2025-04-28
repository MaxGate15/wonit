const PAYSTACK_SECRET_KEY = 'sk_test_f1e7124b4920133d96c1d11d137fbe6649755581';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/payment/initiate', async (req, res) => {
  console.log('Received request body:', req.body);
  const { amount, email } = req.body;
  console.log('Initiating payment with:', {
    amount,
    email,
    currency: 'GHS',
    key: PAYSTACK_SECRET_KEY
  });
  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        amount: amount * 100, // Paystack expects amount in kobo/pesewas
        email,
        currency: 'GHS',
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json({ authorization_url: response.data.data.authorization_url });
  } catch (err) {
    console.error('Paystack error:', err.response?.data || err.message);
    res.status(500).json({ error: err.message, details: err.response?.data });
  }
});

// Optional: Payment verification endpoint
app.get('/api/payment/verify/:reference', async (req, res) => {
  const { reference } = req.params;
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.response?.data });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`)); 