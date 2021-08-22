const User =require('../models/users');
const Posts =require('../models/posts');


const bcrypt=require('bcrypt');
const { result, forEach } = require('lodash');
const { search } = require('../routes/approutes');
var formidable = require('formidable');

const path= require('path');
const { query } = require('express');

const axios =require('axios');

//login

const app_login_post=async(req,res)=>{
    var id = req.body.id
    var password = req.body.password
    
    try{
    var user= await User.findOne({id:req.body.id})
    if(!user){
        res.send('user not found');
    }
    if(!(await bcrypt.compare(password,user.password)))
        { 
          res.send('user not found wrong password');
            
        }
        req.session.user = user;
        req.session.user.id=user.id;
        
        res.redirect('/home')
    } catch (error) {
        console.log(error);
      }

}
//signup

const app_signup_post= async(req,res)=>{
    
    try{
      var user= await User.findOne({id:req.body.id})
      if(user==null){
        const salt=await bcrypt.genSalt()
        const hashedpassword= await bcrypt.hash(req.body.password,salt);
        const user=new User({id:req.body.id,password:hashedpassword ,profile: {firstName:req.body.firstName ,lastName:req.body.lastName }});
        
        
        user.save()
        .then((result)=>{ 
          req.session.user = user;
          req.session.user.id=user.id;
            res.send(result)
          }) 
          .catch((err)=>{console.log(err);});
      }else{
        res.send('user id already exist')
      }
          
    }catch{
        res.status(500);
    }
}
//logout
const app_logout=(req,res)=>{
  console.log('logout ')
    if (req.session.user ) {
        res.clearCookie("user_id");
        res.send("cookie cleared")  //////////send to starting page
      } else {
        res.send("no user was there")
      }

}
//SESSION USER
const app_users=(req,res)=>{
    if(req.session.user && req.cookies.user_id){
      res.send(req.session.user.profile)
    }else{ 
      res.send('user 404')
    }
}
// }// image  ////////////////////////////////////////////////???????????????????????????????
const app_upload_post=async(req, res) =>{
    image=req.file;    // require an image file will use upload in approuts
    console.log(image)
    user=await User.findOneAndUpdate(
      {id: req.session.user.id    }, 
      {profile :
      {'userImage': image.filename }}
      );
    req.session.user.userImage=image.filename;
    res.send(image);
};
//sending a friend request
const app_send_request=async(req,res)=>{
  
    var queri=req.body.id;           // require the id of person whome we are sending a friend request
    global.queri=queri;             // here queri is the friend searched / selected
    
    var search= await User.findOne({id:queri})
    //checking if the queri has already friendrest sent
    var myself= await User.findOne({id:req.session.user.id ,friendsRequested: { $elemMatch:{username:queri}}})
    // checking if the queri has already friend
    var accepted= await User.findOne({id:req.session.user.id ,friendsAcceppted: { $elemMatch:{username:queri}}})
    if(req.session.user.friendsPending==global.queri){
      res.redirect('/acceptFriend')
    }
    console.log('22')
    if(myself==null && accepted==null &&req.session.user.id!=global.queri){
    if(search){
        //sending a friend request
        await User.findOneAndUpdate({id:req.session.user.id }, {$push :{friendsRequested:[{username:queri}]}});
        //recieving a friend request
        await User.findOneAndUpdate({id:queri }, {$push :{friendsPending:[{username:req.session.user.id}]}});
        res.send('friend request sent')
    }
    else{
      res.send("no one found by that name/id");
        
    }
    }else{
      await User.findOneAndUpdate({id:req.session.user.id }, {$pull :{friendsRequested:{username:queri}}});
      await User.findOneAndUpdate({id:queri }, {$pull :{friendsPending:{username:req.session.user.id}}});
      res.send("already sent request");
      
    
    }
    
}
//if sent a friend request this will send the id and profile 
const app_askFriend_get=async(req,res)=>{
  var result2=[];
  var allfriends=req.session.user.friendsPending;
  await User.find().sort({createdAt:-1})
  .then((result)=>{
    result.forEach(result=>{
      allfriends.forEach(allfriends=> {
        if(result.id==allfriends.username && result.id!=req.session.user.id){
          result2.push(result.id , result.profile);
        }
      
    })
  })
    res.send(result2)
  
})
  .catch((err)=>{console.log(err);});

}
//search a friend
const app_searchFriend_get=async(req,res)=>{
  
  var isfriend =false;
  var search= req.body.friendsearched;
  var userbyid=await User.findOne({id:search})
  var userbyname=await User.find({profile: { $elemMatch:{firstName:search}}})

  if(userbyid!=null){   //checking by id
  var iffriend=await User.findOne({id:req.session.user.id ,friendsAccepted: { $elemMatch:{username:search}}})
  if(iffriend==null)
  {isfriend=false}
  else{isfriend=true}
  res.send(userbyid.id,user.profile ,'is friend ',isfriend)
  }
  else if(userbyname!=null){ //checking by name
    var iffriend=await User.findOne({id:req.session.user.id ,friendsAccepted: { $elemMatch:{username:search}}})
    if(iffriend==null)
    {isfriend=false}
    else{isfriend=true}
    res.send(userbyname.id,user.profile ,'is friend ',isfriend)
    }
    else{
      res.send('no one found by that name')
    }

}
// it will show all the  friendrequests we got
const app_requests_get=(req,res)=>{
    friends=req.session.user.friendsPending;
    res.send(friends)
}
//accept a friend request
  const app_askFriend_post=async(req,res)=>{
    global.queri=req.body.id;
    console.log(global.queri)
    console.log(req.session.user.id )
    var myself= await User.findOne({id:req.session.user.id ,friendsAccepted: { $elemMatch:{username:global.queri}}})
    var search= await User.findOne({id:req.session.user.id ,friendsPending: { $elemMatch:{username:global.queri}}})
    
    if(myself==null && req.session.user.id!=global.queri){
      if( search!=null){
      //sending data in db
           await User.findOneAndUpdate(
             {id:req.session.user.id },
            {$push :{friendsAccepted:{username:global.queri}}}
            );
           await User.findOneAndUpdate(
             {id: global.queri},
             {$push :{friendsAccepted:{username:req.session.user.id}}}
             );
           
            // deleting ddata in database like requests
      await User.findOneAndUpdate(
        {id:req.session.user.id },
        {$pull :{friendsPending:{username:global.queri}}},
         {$pull :{friendsRequested:{username:global.queri}}}
         
         );
      await User.findOneAndUpdate(
        {id:global.queri },
         {$pull :{friendsRequested:{username:req.session.user.id}}}, 
         {$pull :{friendsPending:{username:req.session.user.id}}}
         );
           res.send('friend request accepted')
      }else{
        res.send("sent request waiting for approval");
      }
    }else{
      
      res.send("already friends");

    }

}
// will give the list of users which are not friends
const app_notFriends_get=async(req,res)=>{
  var result2=[];
  var allfriends=req.session.user.friendsAccepted
  await User.find().sort({createdAt:-1})
  .then((result)=>{
    for(x=0;x<=4;x++){
    result.forEach(result=>{
      allfriends.forEach(allfriends=> {
        if(result.id!=allfriends.username && result.id!=req.session.user.id){
          result2.push(result.id);
          }
          
      
    })
  })
}
    res.send(result2)
    x=0;
})
  .catch((err)=>{console.log(err);});
}
// this will send the list of all our friends
const app_Friends_get=async(req,res)=>{
  var result2=[];
  var allfriends=req.session.user.friendsAccepted
  await User.find().sort({createdAt:-1})
  .then((result)=>{
    
    result.forEach(result=>{
      allfriends.forEach(allfriends=> {
        if(result.id===allfriends.username && result.id!=req.session.user.id){
          result2.push(result.id , result.profile);
          }
          
      
    })
  })
    res.send(result2)
    x=0;
})
  .catch((err)=>{console.log(err);});
}
//this will show all posts
const app_posts_get=async(req,res)=>{
  var result2=[];
  var allfriends=req.session.user.friendsAccepted;
    await Posts.find().sort({createdAt:-1})
    .then((result)=>{
      
      result.forEach(result=>{
        
        allfriends.forEach(allfriends=> {
        if(result.uploader==allfriends.username || result.uploader==req.session.user.id){
          
          result2.push(result);
        }  
    })
    if(result.uploader==req.session.user.id)
    {
      result2.push(result);
    }
  })
  res.send(result2);
  })
  .catch((err)=>{console.log(err);});
  
};
//this will add new posts
const app_posts_post=async(req,res)=>{
  var result2=[];
    var request=req.body;   // yha apna sara req.body wala call kario
    console.log(request)
    const response=await axios.get(`https://imdb-api.com/en/API/Ratings/k_oqqcwuz1/${request.id}`)
    console.log("response is",response.data)
    const post=new Posts
    (
    {
    id:             request.id,  //movie id
    reivew:         request.review,
    uploader:       req.session.user.id,
    haswatched:     request.haswatched,
    imdb:           response.data.imDb,
    metacritic:     response.data.metacritic,
    rottentomatoes: response.data.rottenTomatoes,
    uploaderimage:  req.session.user.userImage,
    movieimage:     request.movieimage,
    }
    );
    var allfriends=req.session.user.friendsAccepted
    console.log(allfriends)
    await post.save()
    await Posts.find().sort({createdAt:-1})
    .then((result)=>{
      
      result.forEach(result=>{
        
        allfriends.forEach(allfriends=> {
        if(result.uploader==allfriends.username || result.uploader==req.session.user.id){
          
          result2.push(result);
        }  
    })
    if(result.uploader==req.session.user.id)
    {
      result2.push(result);
    }
  })
  res.send(result2);
  })
  .catch((err)=>{console.log(err);});
  
};

const app_home_get=async(req,res)=>{
// posts
  var friendrequests;
  var result2=[];
  var allfriends=req.session.user.friendsAccepted;
    await Posts.find().sort({createdAt:-1})
    .then((result)=>{
      
      result.forEach(result=>{
        
        allfriends.forEach(allfriends=> {
        if(result.uploader==allfriends.username || result.uploader==req.session.user.id){
          
          result2.push(result);
        }     })
    if(result.uploader==req.session.user.id)
    {
      result2.push(result);
    }  })  })
  .catch((err)=>{console.log(err);});

  var requests=req.session.user.friendsPending;
  if(requests!=null){friendrequests=true;}
  else{friendrequests=false;}




  var senddata=({
    user        : {userid      :  req.session.user.id,
                  userimage   :  req.session.user.profile.userImage,
                  firstname   :  req.session.user.profile.firstName,
                  lastname    :  req.session.user.profile.lastName,},
    posts       :  result2,
    requests    :  friendrequests
  })


  res.send(senddata );
//friends pending 

}


module.exports={
    //app_index,

    app_signup_post,
    app_logout,
    app_login_post,
    app_users,
    app_upload_post,
    app_askFriend_post,
    app_send_request,
    app_askFriend_get,
    app_posts_get,
    app_posts_post,
    app_requests_get,
    app_notFriends_get,
    app_Friends_get,
    app_searchFriend_get,
    app_home_get
}