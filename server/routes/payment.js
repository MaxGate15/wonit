const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const axios = require('axios');

// Deposit
router.post('/deposit', auth, async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    if (!amount || !paymentMethod) return res.status(400).json({ error: 'Amount and payment method required' });
    
    const user = await User.findById(req.user.id);
    user.balance += parseFloat(amount);
    await user.save();
    
    res.json({ 
      message: 'Deposit successful',
      newBalance: user.balance
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Withdraw
router.post('/withdraw', auth, async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    if (!amount || !paymentMethod) return res.status(400).json({ error: 'Amount and payment method required' });
    
    const user = await User.findById(req.user.id);
    if (user.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });
    
    user.balance -= parseFloat(amount);
    await user.save();
    
    res.json({ 
      message: 'Withdrawal successful',
      newBalance: user.balance
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get balance
router.get('/balance', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Initiate Paystack Payment
router.post('/initiate', auth, async (req, res) => {
  try {
    const { amount, email } = req.body;
    console.log('Initiate payment:', { amount, email, user: req.user });
    if (!amount || !email) return res.status(400).json({ error: 'Amount and email required' });

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        amount: amount * 100, // Paystack expects amount in pesewas
        email,
        currency: 'GHS'
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ authorization_url: response.data.data.authorization_url });
  } catch (err) {
    console.error('Paystack initiation error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Payment initiation failed', details: err.response?.data || err.message });
  }
});

// Verify Paystack Payment
router.get('/verify/:reference', auth, async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const { status, customer, amount, currency, paid_at } = response.data.data;

    // Check if payment was successful
    if (status === 'success') {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      // TODO: Determine plan duration based on amount paid (e.g., map amounts to plans)
      const planDurationDays = 1; // Example: Daily plan = 1 day

      // Update user's VIP status
      user.isVip = true;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + planDurationDays);
      user.vipExpiry = expiryDate;

      await user.save();

      res.json({
        message: 'Payment successful, VIP status updated',
        vipExpiry: user.vipExpiry
      });

    } else {
      res.status(400).json({ error: 'Payment verification failed', status });
    }

  } catch (err) {
    console.error("Verification Error:", err.response?.data || err.message);
    res.status(500).json({ error: 'Payment verification failed', details: err.response?.data || err.message });
  }
});

module.exports = router; 