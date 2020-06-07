const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const graphqlHTTP = require('express-graphql');
const bluebird = require('bluebird');
const dotenv = require('dotenv');

const schema = require('./graphql/Schemas');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { promiseLibrary: bluebird, useNewUrlParser: true})
    .then(() => console.log('Successfully connected to database...'))
    .catch((err) => console.error(err));



const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
}));

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render error page
    res.status(err.status || 500);
    res.render('error');
});

modules.export = app;

