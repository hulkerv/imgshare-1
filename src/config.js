//REQUERIMENTS 
const express = require('express');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const errorHandler = require('errorHandler');

//INITIALIZATIONS
const app =express();
const routes = require('./routes/index');
require('./config/passport');

//SETTINGS
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./helpers'),
    handlebars: allowInsecurePrototypeAccess(handlebars),
}));
app.set('view engine', '.hbs');
    
//MIDDLEWARES
app.use(morgan('dev'));
app.use(multer({dest: path.join(__dirname, './public/upload/temp')}).single('image'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true   
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
    
//Global Variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
    
// routes
routes(app);
    
// static files
app.use('/public', express.static(path.join(__dirname, './public')))

// errorhandlers
if ('development' === app.get('env')){
    app.use(errorHandler);
}
    
module.exports= app;


