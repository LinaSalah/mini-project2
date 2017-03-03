

var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var Schema=mongoose.Schema;
var db=mongoose.connection;

var UserSchema=new Schema({
	name:String,
	age:Number,
	ID:{
		type:String,
		unique:true
	},
	username:{
		type:String,
		unique:true
	},
   
    password:String
})
var User=mongoose.model('User',UserSchema);
module.exports=User;


mongoose.connect('mongodb://localhost/student');





module.exports.createUser=function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser,password, salt, function(err, hash) {
        newUser.password=hash;
        newUser.save(callback); 
    });
});
}

module.exports.getUserByUsername=function(username,callback){
	var query={username:username};
	User.findOne(query,callback);
}

module.exports.comparePassword=function(candidatePassword,hash,callback){

}