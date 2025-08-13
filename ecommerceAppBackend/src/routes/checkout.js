import { Router } from 'express';
import requireAuth from '../middlewares/requireAuth.js';

const router = Router();

/**
 * POST /api/checkout
 * body: { items: [{id, qty, price}], shippingAddress }
 * This is a mock endpoint that returns a fake order id.
 */
router.post('/', requireAuth, async (req, res) => {
  const { items = [], shippingAddress } = req.body;
  if (!items.length) return res.status(400).json({ error: 'Cart is empty' });
  const total = items.reduce((s, it) => s + (it.price * it.qty), 0);
  // In real life, integrate a gateway here.
  res.json({ orderId: 'ORD-' + Date.now(), total, shippingAddress });
});

export default router;
