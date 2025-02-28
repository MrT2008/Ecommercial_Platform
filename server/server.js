const express = require('express');
const cors = require('cors');
const { syncModels } = require('./app/models');
const route = require('./routes/index');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174'],
};

app.use(cors(corsOptions));

route(app);

// syncModels() will connect and create tables to the database
syncModels();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});