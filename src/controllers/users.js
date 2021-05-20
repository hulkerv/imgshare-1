const usersCtrl = {};
const User = require('../models/users');
const passport = require('passport');



usersCtrl.signup = async (req, res) =>{
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password) {
        errors.push({text: 'Passwpords do not match'});
    };
    if(password.length < 4){
        errors.push({text: 'Passwords must be at least 4 characters.'})
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password,
        })
    }else{
        const emailUser = await User.findOne({email : email});
        if(emailUser){
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name, email, password});
            newUser.password =  await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You Are Registered');
            res.redirect('/users/login');
        }
    }
};

usersCtrl.renderSignupForm = (req, res) =>{
    res.render('users/signup');
};

usersCtrl.renderLoginForm = (req, res) =>{
    res.render('users/login');
};

usersCtrl.login = passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/images/home',
    failureFlash: true
});

usersCtrl.logout = (req,res) => {
  
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/login');
    
};

module.exports= usersCtrl;