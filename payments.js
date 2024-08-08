const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/charge', async (req, res) => {
  const { amount, token } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: token,
      description: 'Test charge',
    });
    res.status(200).json(charge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
