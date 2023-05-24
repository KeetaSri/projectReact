const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.put('/api/data/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const { name } = req.body;

  data = data.map(item => {
    if (item.id === itemId) {
      return { ...item, name };
    }
    return item;
  });

  res.json({ message: 'Item updated successfully' });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Backend API server is running on http://localhost:${port}`);
});