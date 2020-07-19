var express             = require('express'),
    app                 = express(),
    mongoose            = require('mongoose'),
    bodyParser          = require('body-parser'),
    Item                = require('./models/Item'),
    Order               = require('./models/Order'),
    Master_User         = require("./models/User"),
    Fashion_items       = require("./sample-items.js"),
    Cart                = require('./models/Cart'),
    UserDetail          = require("./models/UserDetail"),
    product_categories  = require('./load-categories');


mongoose.connect('mongodb://localhost/Shop_v5_Auth', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine','ejs');



var adminRoute      = require('./routes/Admin');
var cartRoute       = require("./routes/Cart");
var fashionRoute    = require('./routes/Fashion')
var userRoute       = require("./routes/User");
var indexRoute      = require("./routes/Index");
var seedRoute       = require("./routes/SeedDB");

app.use(bodyParser.urlencoded({extended:true}));

app.use("/",indexRoute);
app.use("/seed",seedRoute);
app.use("/admin",adminRoute);
app.use("/user/:name",userRoute);
app.use("/fashions",fashionRoute);



// auth packages

var passport                = require("passport"),
    LocalStrategy           = require("passport-local").Strategy,
    passportLocalMongoose   = require("passport-local-mongoose"),
    expressSession          = require("express-session");


app.set('port', process.env.PORT || 3000);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(Master_User.serializeUser());

passport.deserializeUser(Master_User.deserializeUser());

passport.use(new LocalStrategy(Master_User.authenticate()));

//  intialize express session
app.use(expressSession({
    secret:"lokesh is a web developer",
    resave:false,
    saveUninitialized:false
}))




//  below are the some common routes


// var lokesh = 12;

// app.get(`/sd/:${lokesh}`,function (req,res)
// {
//     res.send(`${req.params}`);
// })

//  below are the sedding items





app.listen(process.env.PORT, process.env.IP, function ()
{
    console.log(process.env.PORT,process.env.IP)
    console.log('server started SuccessFully !!');

});
