var express=require('express');
var router=express.Router();
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;


router.get('/register',function(req,res){
	res.render('register');
});
router.get('/login',function(req,res){
	res.render('login');
});

router.get('/create',function(req,res){
	res.render('create');
});

router.get('/confirmreg',function(req,res){
	res.render('confirmreg');
});
router.get('/confirmcr',function(req,res){
	res.render('confirmcr');
});


router.post('/register',function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	var password2=req.body.password2;


	req.checkBody('username','username is required').notEmpty();

req.checkBody('password','password is required').notEmpty();
});


 var errors=req.validationErrors();

if(errors){
	res.render('register',{
	errors:errors
	});
} else{
var newUser=new User({
	username:username,
	password:password
});
User.createUser(newUser,function(err,user){

if(err) throw err;
console.log(user);
	
});
req.flash('success_msg','You are registered and can now login');
res.redirect('/users/login');
}

		
	




passport.use(new localStrategy(
  function(username, password, done) {
  	User.getUserByUsername(username,function(err,user){
  		if(err) throw err;
  		if(!user){
  			return done(null,false,{message:'unkown user'});
  		}

  		User.comparePassword(password,user.password,function(err,isMatch){
  			if (err) throw err;
  			if(isMatch){
  				return done(null,user);

}else {
  				return done(null,false,{message:'Invalid password'});

  			}
  		})
  	})
    
  }));
module.exports=router;

