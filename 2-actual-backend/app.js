const express = require('express');
const bodyParser = require('body-parser');
const { getStoredItems, storeItems } = require('./data/items');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

// Enable CORS for frontend clients
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// GET /items with optional category filtering & search
app.get('/items', async (req, res) => {
  try {
    let storedItems = await getStoredItems();
    // Normalize in case data was saved in nested form
    if (Array.isArray(storedItems[0]) && storedItems.length === 1) {
      storedItems = storedItems[0];
    }

    const { category, search, sort } = req.query;

    if (search) {
      const q = search.toLowerCase();
      storedItems = storedItems.filter(
        item =>
          item.item_name?.toLowerCase().includes(q) ||
          item.company?.toLowerCase().includes(q)
      );
    }

    if (category && category.toLowerCase() !== 'all') {
      storedItems = storedItems.filter(
        item => item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (sort === 'price_asc') {
      storedItems.sort((a, b) => a.current_price - b.current_price);
    } else if (sort === 'price_desc') {
      storedItems.sort((a, b) => b.current_price - a.current_price);
    } else if (sort === 'rating_desc') {
      storedItems.sort((a, b) => (b.rating?.stars || 0) - (a.rating?.stars || 0));
    }

    res.json({ items: storedItems });
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to retrieve items.' });
  }
});

// GET /items/:id
app.get('/items/:id', async (req, res) => {
  try {
    let storedItems = await getStoredItems();
    if (Array.isArray(storedItems[0]) && storedItems.length === 1) {
      storedItems = storedItems[0];
    }
    const item = storedItems.find((item) => item.id === req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ item });
  } catch (err) {
    console.error('Error fetching item by id:', err);
    res.status(500).json({ error: 'Failed to retrieve item.' });
  }
});

// POST /items (Add new product)
app.post('/items', async (req, res) => {
  try {
    let existingItems = await getStoredItems();
    if (Array.isArray(existingItems[0]) && existingItems.length === 1) {
      existingItems = existingItems[0];
    }
    const itemData = req.body;
    if (!itemData.item_name || !itemData.current_price) {
      return res.status(400).json({ message: 'Item name and current_price are required.' });
    }
    const newItem = {
      ...itemData,
      id: Date.now().toString(),
    };
    const updatedItems = [newItem, ...existingItems];
    await storeItems(updatedItems);
    res.status(201).json({ message: 'Stored new item.', item: newItem });
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).json({ error: 'Failed to save item.' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
