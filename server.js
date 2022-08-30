require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

// connect to db
connectDB();
//logging requests
app.use(logger);

app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//cookies
app.use(cookieParser());
//serve static files
app.use('/', express.static(path.join(__dirname, 'public')));
// serve html pages
app.use('/', require('./routes/root'));

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

app.use('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
        console.log(req.params);
    } else if (req.accepts('json')) {
        res.json({ error: '404 , not found' });
    } else {
        res.type('txt').send('page not found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB!');
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});
