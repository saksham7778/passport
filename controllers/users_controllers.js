const User= require('../models/user')

module.exports.profile = function(request,response){
    
    return response.render('users',{
        title:"helloSaksham"
    });
    // return response.end("<h1> Users Profile! !</h1>");
} 


//render the sign up page
module.exports.signup = function(request,response){
    
    if(request.isAuthenticated()){
        response.redirect('/users/profile');
    }

    return response.render('user_sign_up',{
        title:"Saksham | Sign Up"
    });
}


//render the sign in page
module.exports.signin = function(request,response){

    if(request.isAuthenticated()){
        response.redirect('/users/profile');
    }


    return response.render('user_sign_in',{
        title:"Saksham | Sign In"
    });

}


// get the sign up data
module.exports.create = function(request,response){
    
    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }

    User.findOne({ email:request.body.email}, function(err,user){
        if(err){    console.log("error in finding user in sign up");    return;     }

        if(!user){
            User.create(request.body,function(err,user){
                if(err){    console.log("error in finding user in sign up");    return;     }
                
                return response.redirect('/users/sign-in');
            })
        }
        else{
            return response.redirect('back');
        }
    });
}


// sign in and create a session for user
module.exports.createSession = function(request,response){
    return response.redirect('/');
}
