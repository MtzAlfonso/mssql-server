const express = require('express');
const cors = require('cors');
const { databaseConnection } = require('./database/connection');
require('dotenv').config();

// App config
const app = express();

// Database connection
databaseConnection();

// MiddleWares
app.use(cors());
app.use(express.json());

// Routes
app.use('/clients', require('./routes/clients'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
