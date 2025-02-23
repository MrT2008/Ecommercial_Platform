const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174'],
};

app.use(cors(corsOptions));

app.get('/api', (req, res) => {
  res.json({ characters: ['doraemon', 'conan', 'luffy', 'zoro'] });
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});