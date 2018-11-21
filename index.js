const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//inicializations
const app = express();
require('./config/database');
//config
require('./config/passport')(passport);


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

//static files
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(morgan('dev')); //para ver estados get/post en dev (consola).
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'asd',
    name: 'cookie_name',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./app/routes/routes')(app,passport);
app.use(require('./app/routes/mail'));


var port = process.env.port || 3000;
app.listen(port);