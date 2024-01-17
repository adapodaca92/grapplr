const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const logger = require('morgan');
const connectDB = require('./config/database');

require('dotenv').config({path: './config/.env'});

const PORT = process.env.PORT || 8500;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(logger('dev'))

// sessions
console.log(process.env.DB_URL);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}));

// routers

const homeRoutes = require('./routes/homeRoutes');
const gymPostRoutes = require('./routes/gymPostRoutes');

app.use('/', homeRoutes);
app.use('/gymPosts', gymPostRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
});
