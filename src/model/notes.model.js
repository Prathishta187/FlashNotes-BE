import mongoose from "mongoose";

const noteschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    tag:{
        type:["stirng"],
        default:[]
    },
    // owner:{
    //     ref:"User",
    //     type:mongoose.Schema.ObjectId,
    //     required:true
    // }

},
{timestamps:true}
)

const Note = mongoose.model("Note",noteschema)
export default Note