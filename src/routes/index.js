const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const image = require('../controllers/image');
const users = require('../controllers/users');

const {isAuthenticated} = require('../helpers/auth');

module.exports = app => {
    
    router.get('/', home.index);
    
    //IMAGES  
    router.get('/images/home', isAuthenticated, image.index);
    router.get('/images/:image_id', isAuthenticated ,image.viewImage);
    router.post('/images',image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id', image.remove);
    
    //USERS
    router.get('/users/signup',  users.renderSignupForm);
    router.post('/users/signup',  users.signup);
    router.get('/users/login',  users.renderLoginForm);
    router.post('/users/login', users.login);
    router.get('/users/logout', users.logout);
    app.use(router);
}