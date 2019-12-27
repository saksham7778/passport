const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User=require('../models/user');

//passport is using localStrategy to find which user is signed in


//authentication using passport
// for help go to "http://www.passportjs.org/packages/passport-local/ "
passport.use(new LocalStrategy({
        usernameField:'email' // from schema
    },
    function(email, password, done) {
        //find a user and establish identity
        User.findOne({ 
            email: email }, // first email is the email that we are setting up as in 
                         //schema and second one is the one that we got from the parameters here
            function (err, user) {
                if (err){  
                    console.log('Error in finding user --> Passport'); 
                    return done(err);  //done(error,user_found); 
                }
        
                if (!user || user.password != password) { 
                    console.log('invalid username/password');
                    return done(null, false); 
                }
        
                return done(null, user);      
        });
    }
));





  /// serialising the user to decide which key is to kept in cookies
  passport.serializeUser(function(user,done){
        done(null, user.id);
  });


 
 
  // deserialing the user from the key in the cookies
  passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){
        if (err)   {  
            console.log('Error in finding --> Passport'); 
            return done(err); 
        }

        return done(null,user);
    });

  });


// check if user is authenticated

passport.checkAuthentication = function(request,response,next){
    
    //if user is signed in, then pass on the next function(controllers action)
    if(request.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return response.redirect('/users/sign-in')
}



passport.setAuthenticatedUser = function(req,res,next){
    
    //if user is signed in, then pass on the next function(controllers action)
    if(req.isAuthenticated()){
        // request.user contain current signed in user from the session cookie and we are just sendind this to the locals for views
        res.locals.user=req.user;
        
    }
    next();
}

module.exports=passport;