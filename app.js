require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

//Database
require('./configs/db.config');

// Debbuger
require('./configs/debugger.config');


const app = express();

// Middleware Setup

require('./configs/middleware.config')(app);

// Configs

require('./configs/preformatter.config')(app);
require('./configs/views.config')(app);
require('./configs/session.config')(app);
require('./configs/passport.config')(app);
      


const index = require('./routes/index');
app.use('/', index);


module.exports = app;
