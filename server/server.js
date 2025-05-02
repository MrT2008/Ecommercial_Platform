const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const route = require('./routes/index');
const { syncModels } = require('./app/models');
require('./app/configs/passportConfig'); // Ensure passportConfig is required to initialize strategies

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')))
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174'],
    credentials: true,
};

app.use(cors(corsOptions));

route(app);

// syncModels() will connect and create tables to the database
syncModels();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});