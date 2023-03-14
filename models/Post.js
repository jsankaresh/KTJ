const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  name :{
      type : String,
      required :true
  },
  requiredTeamMembers :{
    type : Number,
    required: true
},
selectedMembers:{
    type:Array,
    default:[]
}
,
joiningRequest:{
    type:Array,
    default:[]
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },


});
const Post =mongoose.model('posts',PostSchema);
Post.createIndexes();
module.exports=Post