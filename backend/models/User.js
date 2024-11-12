import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema({
    username : {
        type :String ,
        required : true ,
    } ,

    email : {
        type:String ,
        required : true ,
        unique : true
    } ,

    password : {
        type : String,
        required :true
    }
}) ;



const adminSchema = mongoose.Schema({
    username : {
        type :String ,
        required : true ,
    } ,

    email : {
        type:String ,
        required : true ,
        unique : true
    } ,

    password : {
        type : String,
        required :true
    },
},{
    timestamps : true
}) ;

const movieSchema = mongoose.Schema({
    title : {type : String},
    description : {type : String},
    year: {type : Number},
    imageUrl : {type : String},
    // creatorId : ObjectId , 
}) ;

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const movieModel = mongoose.model("movie", movieSchema);
export {userModel,adminModel,movieModel} ;