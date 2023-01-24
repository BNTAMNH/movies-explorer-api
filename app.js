require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
// const cors = require('./middlewares/cors');
const router = require('./routes/index');
const { devMongoUrl } = require('./utils/config');
const { rateLimit } = require('./utils/rateLimit');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;

mongoose.set('strictQuery', false);
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : devMongoUrl);

const app = express();

app.use(requestLogger);
app.use(rateLimit);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
