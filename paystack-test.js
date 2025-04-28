const axios = require('axios');
const PAYSTACK_SECRET_KEY = 'sk_test_f1e7124b4920133d96c1d11d137fbe6649755581';

axios.post(
  'https://api.paystack.co/transaction/initialize',
  {
    amount: 5000,
    email: 'test@example.com',
    currency: 'GHS',
  },
  {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  }
).then(res => {
  console.log('SUCCESS:', res.data);
}).catch(err => {
  console.error('ERROR:', err.response?.data || err.message);
}); 