
var express=require('express');
var bodyparser=require('body-parser');
var path=require('path');
var cookieparser=require('cookie-parser');
var exphbs =require('express-handlebars');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var mongo=require('mongodb');
var mongoose=require('mongoose');
 var User=require('./models/user.js');
var db='mongodb://localhost/portofolio';
var router=express.Router();
mongoose.connect(db);
 

// intialize app
var app = express();

//view engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaltLayout:'layout'}));
app.set('view engine','handlebars');

//bodyparser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());

//sey static folder
app.set(express.static(path.join(__dirname,'public')));

//exp session middleware
app.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true


}));
app.use(passport.initialize());
app.use(passport.session());


//middleware validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
//connect flash
app.use(flash());

//global vars
app.use(function(req,res,next){
	res.locals.success_msg=req.flash('success_msg');
	res.locals.error_msg=req.flash('error_msg');
	res.locals.error=req.flash('error');
	next();

});


app.use('/',routes);
app.use('/users',users);

app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'),function(){
	console.log('Server started on port'+app.get('port'));
});

app.use(express({uploadDir:'/path/to/temporary/directory/to/store/uploaded/files'}));
app.use(bodyparser({uploadDir:'/path/to/temporary/directory/to/store/uploaded/files'}));

var path = require('path'),
    fs = require('fs');
// ...
app.post('/upload', function (req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
    // ...
});

app.get('/image.png', function (req, res) {
    res.sendfile(path.resolve('./uploads/image.png'));
}); 