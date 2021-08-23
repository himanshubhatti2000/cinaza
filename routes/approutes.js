
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan"); 

router.use(morgan('dev'));

router.use(bodyParser.urlencoded({extended:true}));

router.use(cookieParser())

const multer =require('multer');
const path= require('path');




const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
    filename:(req,file,cb)=>{
        
        cb(null,Date.now()+path.extname(file.originalname))
        
        
    }
})

const upload=multer({storage:storage});



router.use(
  session({
    key:'user_id',
    secret:'random',
    resave:false,
    saveUninitialized:false,
    cookie:{
      expires:600000
    }
  })
)

router.use((req,res,next)=>{
  if (req.cookies.user_id && !req.session.user) {
    res.clearCookie("user_id");
  }
  next();
    
  })
  var sessionChecker =(req,res,next)=>{
    if(req.session.user && req.cookies.user_id){
      res.redirect('/home')
  
    }else{
      next()
    }
  }





const appcontroller=require('../controllers/appcontroller');


//user routs
//homepage
router.get('/',sessionChecker,(req, res) =>{
  
  res.redirect('/home/login');

});

// // login
  router.get('/home/login',sessionChecker,appcontroller.app_login_get);
// // signup
//   router.get('/home/signup',sessionChecker,appcontroller.app_signup_get);
//login 
  router.post('/login',appcontroller.app_login_post)
//logout
  router.get('/logout' ,appcontroller.app_logout);
//signup
  router.post('/signup' ,appcontroller.app_signup_post);
  //   ?\
  router.get('/user' ,appcontroller.app_users);
  //upload image
  router.post('/upload',upload.single('image') ,appcontroller.app_upload_post);
 // // sending friend requests
  router.post('/send_request',appcontroller.app_send_request);
  //accepting friend request
  router.post('/acceptFriend',appcontroller.app_askFriend_post);
  //check friend request
  router.get('/addFriend',appcontroller.app_askFriend_get);
  //adding a post 
  //show all posts
  router.get('/allpost',appcontroller.app_posts_get);
  //add new posts
  router.post('/addpost',appcontroller.app_posts_post);
  //requests pending
  router.get('/requests',appcontroller.app_requests_get);
  //list of users not friend
  router.get('/notfriends',appcontroller.app_notFriends_get);
  //list of users not friend
  router.get('/friends',appcontroller.app_Friends_get);
  //searching users
  router.get('/searchfriends',appcontroller.app_searchFriend_get);
  //home
  router.get('/home',appcontroller.app_home_get);
  //export routes
  module.exports= router;