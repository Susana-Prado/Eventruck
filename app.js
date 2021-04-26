require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require('express-session');
const MongoStore   = require('connect-mongo');

//Database
require('./configs/db.config');

// Debbuger
require('./configs/debugger.config');

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(
  session({
    secret: "basic-auth-secret",
    resave: true, // Vuelva a guardar,
    saveUninitialized: false, 
    cookie: { maxAge: 3600000 },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/eventruck',
      ttl: 60 * 60 * 24 * 7 // Time to live - 7 days (14 days by)
    })
  })
)

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// Configs

require('./configs/preformatter.config')(app);
require('./configs/views.config')(app);
// require('./configs/session.config')(app);
require('./configs/middleware.config')(app);

const index = require('./routes/index');
const authRouter = require('./routes/auth.routes');
const privateRouter = require('./routes/private-routes');
const foodtruckRouter = require('./routes/foodtruck.routes');

app.use('/', index);
app.use('/auth', authRouter);
app.use('/private', privateRouter);
app.use('/foodtruck', foodtruckRouter);

module.exports = app;
