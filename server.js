const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/authRoute');
const bookRoutes = require('./routes/bookRoute');
const requestRoutes = require('./routes/requestRoute');


// app
const app = express();

// db
mongoose.connect(process.env.DATABASE_URL_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('database connected'));

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', requestRoutes);

app.use('/', (req, res) => {
    res.json({
        msg: "Welcome to Library Management system"
    })
})


// listen
app.listen(process.env.PORT, () => {
    console.log('server is running...');
})