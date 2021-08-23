const express = require('express');
const mongoose =require('mongoose');
const cors=require("cors")
const approutes = require('./routes/approutes');



//express app
const app = express();

//app.use(cors())
if(process.env.NODE_ENV!=="production"){
  console.log(
    "iam in use"
  )
  app.use(
    cors({
         origin: "http://localhost:3000", // allow to server to accept request from different origin
         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
         credentials: true // allow session cookie from browser to pass through
   }))}


app.use(express.static('public'));
app.use(express.json())
// connect to mongodb

 const dbURI ='mongodb+srv://anyx:Y35yzhvXhcx3OAkF@nodenuts.cdcxi.mongodb.net/CINAZA?retryWrites=true&w=majority';
 mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,  useFindAndModify: false })
   .then((result)=>{//listen for app
     app.listen(5000);
    console.log('connected') ;})
  .catch((err)=>{console.log(err)})

//register view engine
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));



  //app routes
app.use(approutes);

  //404 page
app.use((req,res)=>{
  res.status(404).render('404',{title:' 404'});
});