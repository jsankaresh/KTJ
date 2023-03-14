const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const Post = require("../models/Post");
const User=require("../models/User")
//Get Method for all Posts.
router.get("/allPublicPosts", async (req, res) => {
  try{
  const posts = await Post.find();
  res.json({posts,success:true});
  }catch(e){
    console.log(e);
    res.status(401).json({succss:false,error:e.message});
  }
});







router.get("/allPrivatePosts", fetchUser, async (req, res) => {
  try{
    console.log(req.user);
  const posts = await Post.find({ user: req.user.id });
  res.json({posts,success:true});
  }catch(e){
    console.log(e);
    res.status(401).json({success:false,error:e.message});
  }
});




//Add New post . Login Required
router.post(
  "/addPost",
  fetchUser,
  [
   
  ],
  async (req, res) => {
    const { name,requiredTeamMembers } = req.body;
    let success=false;
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array(),success });
      }

      const post = await Post.create({
        name:name,
        requiredTeamMembers:requiredTeamMembers,
        user: req.user.id,
      });

      res.status(200).json({post,success:true});
    } catch (e) {
      console.error(e.message);
      res.status(500).send({ InternalError: "Internal Error" ,success});
    }
  }
);







//Joining request
router.put("/requestJoin/:id",  async (req, res) => {
  let success=false;
  try {
    let curPost = await Post.findById(req.params.id);
    
    const { userId } = req.body;
 
   
    if (!curPost) {
      return res.status(404).json({error:"Not Found",success});
    }
    if (curPost.joiningRequest.includes(userId)) {
      return res.status(404).json({error:"Already Requested",success});
    }
    
    
    curPost["joiningRequest"].push(userId)

    curPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: curPost },
      
      { new: true }
    );

    res.status(200).json({curPost,success});
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ InternalError: "Internal Error" });
  }
});




//Update Post . Login Required
router.put("/select/:id", fetchUser, async (req, res) => {
  let success=false;
  try {
    const { userId } = req.body;
    
    let curPost = await Post.findById(req.params.id);
    let user1 = await User.findById(userId);
    if (!curPost) {
      return res.status(404).json({error:"No Post Found",success});
    }
    if (!user1) {
      return res.status(404).json({error:"User Not Found",success});
    }
    if (curPost.user.toString() !== req.user.id) {
      return res.status(401).send({error:"Access denied",success});
    }
    if (curPost.selectedMembers.includes(userId)) {
      return res.status(401).send({error:"User Already added",success});
    }
    if (curPost.selectedMembers.length==curPost.requiredTeamMembers) {
      return res.status(401).send({error:"Team Full!",success});
    }

    curPost.selectedMembers.push(userId);
    const index = curPost.joiningRequest.indexOf(userId);
    if (index > -1) { 
      curPost.joiningRequest.splice(index, 1); 
    }
    curPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: curPost },
      { new: true }
    );

    res.status(200).json({curPost,success});
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ InternalError: "Internal Error" });
  }
});




//Update Post . Login Required
router.put("/remove/:id", fetchUser, async (req, res) => {
  let success=false;
  try {
    const { userId } = req.body;
    
    let curPost = await Post.findById(req.params.id);
    let user1 = await User.findById(userId);
    if (!curPost) {
      return res.status(404).json({error:"No Post Found",success});
    }
    if (!user1) {
      return res.status(404).json({error:"User Not Found",success});
    }
    if (curPost.user.toString() !== req.user.id) {
      return res.status(401).send({error:"Access denied",success});
    }
    


    const index = curPost.selectedMembers.indexOf(userId);
    if (index > -1) { 
      curPost.selectedMembers.splice(index, 1); 
    }
    const index1 = curPost.joiningRequest.indexOf(userId);
    if (index1 > -1) { 
      curPost.joiningRequest.splice(index1, 1); 
    }
    curPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: curPost },
      { new: true }
    );

    res.status(200).json({curPost,success});
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ InternalError: "Internal Error" });
  }
});







//Delete Post. DELETE Method . Login Required
router.delete("/deletePost/:id", fetchUser, async (req, res) => {
  try {
    let curPost = await Post.findById(req.params.id);
    if (!curPost) {
      return res.status(404).send("Not Found");
    }
    if (curPost.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    curPost = await Post.findByIdAndDelete(req.params.id);
  

    res.status(200).json({ Success: "Successfully deleted", post: curPost });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ InternalError: "Internal Error" });
  }
});

module.exports = router;
