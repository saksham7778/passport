const express=require("express");
const cookieParser= require('cookie-parser');
const app=express();
const port =8000;
const expressLayouts= require('express-ejs-Layouts');
const db=require('./config/mongoose');

//after pastport.js
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal = require('./config/passport-local-strategy');



// to get good quality data from browser
app.use(express.urlencoded());

// for cookies
app.use(cookieParser());

// for static files of css and js
app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// setting up ejs view engine 
app.set('view engine' , 'ejs');
app.set('views','./views');

// in pastport.js  (used as a middleware)
// to encrypt the cookie send as serialser in passport-local-strategy.js in config folder
app.use(session({
    name:'5. codeial',
    //ToDO Change the secret before deployment in production mode 
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100) //in milli seconds
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser());


// use express router
app.use('/',require("./routes/index"));


app.listen(port,function(err){
    if(err){
        console.log("Error in port is :-",err );
    }
    console.log("server is running on port", port);
});