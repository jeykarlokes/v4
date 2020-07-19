var express             = require("express"),
    app                 = express(),
    router              = express.Router({mergeParams:true}),
    Master_User         = require('../models/User'),
    UserDetail         = require('../models/UserDetail'),
    product_categories  = require('../load-categories');

var passport                = require("passport"),
    LocalStrategy           = require("passport-local").Strategy,
    passportLocalMongoose   = require("passport-local-mongoose"),
    expressSession          = require("express-session");


// app.set('port', 3000);
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(Master_User.serializeUser());

passport.deserializeUser(Master_User.deserializeUser());

passport.use(new LocalStrategy(Master_User.authenticate()));

//  intialize express session
router.use(expressSession({
    secret:"lokesh is a web developer",
    resave:false,
    saveUninitialized:false
}))

router.get('/',function (req, res) {
    console.log(req.user);
    res.render('landing.ejs');
})
router.get('/home', function(req, res) {
    res.render('home.ejs', {products:product_categories});
})



router.get('/login', function(req, res) {
    res.render('Logins.ejs');
});

router.post('/login',passport.authenticate('local',{
    successRedirect:"/home",
    failureRedirect:"/login"
}),function(req,res)
{

})


router.get('/register',function(req,res)
{
    res.render('Register');

})

router.post('/register',function(req,res)
{
    console.log('register');
    Master_User.register(new Master_User(
        {username:req.body.username}),req.body.password,function (err,user)
        {
        if(err)
        {
            console.log(err);
            res.redirect('/register');
        }
        else
        {
            passport.authenticate('local')(req,res,function()
            {
                res.redirect('/login');
            })
        }
    })

});


//  logout functionality
router.get('/logout',function(req,res)
{
//  passport is destroying all user data in the sessions
    req.logout();
    res.redirect('/login');
})



function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    else
    {
        res.redirect('/register');
    }
}

module.exports = router;
