const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const userSchema=new Schema({
    id: {
        type: String,
        unique:true,

    },
    profile: {
        firstName: {
            type: String,
            default:''
        },
        lastName: {
            type: String,
            default:''
            
        },
        userImage : {
            type:String,
            default:''
        },
    },

    password: {
        type: String,  
    },
    
     friendsAccepted: [{ username: {type: String, default: ''} }],
     friendsRequested:[{username: {type: String, default: ''}}],
     friendsPending:[{ username: {type: String, default: ''} }],
     
},{timestamps:true});

const User=mongoose.model('User',userSchema);
module.exports=User;