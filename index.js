require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://cesar:cesar123@cluster0.ylhiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const cookieSession = require('cookie-session');
const passport = require('./config/passport');
const express = require('express');
const app = express();

const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: false
}));

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/auth/login");
    }
}

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['clave'] //clave para encriptar
}))
//inicializar passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.render('index', {
        status: req.isAuthenticated() ? 'logout' : 'login',
        url: req.isAuthenticated() ? '/auth/logout' : '/auth/login'
    })
})

app.get('/auth/login', function (req, res) {
    res.render('login')
})

app.get('/auth/logout', function (req, res) {
    req.logout()
    res.redirect('/')
})

app.get('/auth/google/login', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get(
    '/auth/google/redirect',
    passport.authenticate('google', {failureRedirect: '/auth/login'}),
    function (req, res) {
        res.redirect('/profile')
    }
);

app.get(
    '/profile',
    checkAuthentication,

    function (req, res) {
        console.log(req.user)
        res.render('profile', {...req.user})

    }
);

app.listen(3000);