import mongoose from "mongoose";
const postdata = new mongoose.Schema({
    images: { type: Array },  
    description: { type: String },
    id:{type:String},
   usrname:{type:String},
});





export default mongoose.model.post||mongoose.model('post',postdata)