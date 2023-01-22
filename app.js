require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');

const app = express();
app.use(bodyParser.json());

const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use('/', router);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});