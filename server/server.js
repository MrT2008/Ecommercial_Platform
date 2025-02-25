const express = require('express');
const app = express();
const cors = require('cors');
const { syncModels } = require('./models');

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174'],
};

app.use(cors(corsOptions));

app.get('/api', (req, res) => {
  res.json({ characters: ['doraemon', 'conan', 'luffy', 'zoro'] });
});

// syncModels() will connect and create tables to the database
syncModels();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});