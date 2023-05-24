const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

app.get('/api/data', (req, res) => {
  res.json(data);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Backend API server is running on http://localhost:${port}`);
});