const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const userSchema=new Schema({
    id: {
        type: String,
        

    },
    review: {
        type: String,  
    },
    uploader: {
        type: String,  
    },
    haswatched: {
        type: Boolean  
    },
    imdb:{
        type:String,
    },
    metacritic:{
        type:String,
    },
    rottentomatoes:{
        type:String,
    },
    uploaderimage:{
        type:String,

    },
    movieimage:{
        type:String,

    }
    

},{timestamps:true});

const Posts=mongoose.model('Posts',userSchema);
module.exports=Posts;