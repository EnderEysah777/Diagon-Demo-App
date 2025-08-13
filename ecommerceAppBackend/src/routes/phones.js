import { Router } from 'express';
import Phone from '../models/Phone.js';

const router = Router();

/**
 * Query params:
 *  q (text search), brand (comma separated), ram, minPrice, maxPrice,
 *  sort (price_asc|price_desc|newest|name_asc), page, limit
 */
router.get('/', async (req, res) => {
  const {
    q, brand, ram, minPrice, maxPrice,
    sort = 'newest',
    page = 1, limit = 20
  } = req.query;

  const filter = {};
  if (q) filter.$text = { $search: q };
  if (brand) filter.brand = { $in: brand.split(',') };
  if (ram) filter.ram = ram;

  // price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // sorting
  const sortMap = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    name_asc: { model: 1 },
    newest: { createdAt: -1 }
  };

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Phone.find(filter).sort(sortMap[sort] || sortMap.newest).skip(skip).limit(Number(limit)),
    Phone.countDocuments(filter)
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

// Single phone
router.get('/:id', async (req, res) => {
  const phone = await Phone.findById(req.params.id);
  if (!phone) return res.status(404).json({ error: 'Not found' });
  res.json(phone);
});

export default router;
