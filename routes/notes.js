const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Notes = require("../models/Note");

const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

//Get Method for all Notes.
router.get("/allNotes", fetchUser, async (req, res) => {
  try{
    console.log(req.user);
  const notes = await Notes.find({ user: req.user.id });
  res.json({notes,success:true});
  }catch(e){
    console.log(e);
    res.status(401).json({succss:false,error:e.message});
  }
});

//Add New Note . Login Required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Atleast 3 character required in Title").isLength({ min: 3 }),
    body("description", "Description should be atleast of length 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    let success=false;
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array(),success });
      }

      const note = await Note.create({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });

      res.status(200).json({note,success:true});
    } catch (e) {
      console.error(e.message);
      res.status(500).send({ InternalError: "Internal Error" ,success});
    }
  }
);

//Update Note . Login Required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  let success=false;
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let curNote = await Note.findById(req.params.id);
    if (!curNote) {
      return res.status(404).json({error:"Not Found",success});
    }
    if (curNote.user.toString() !== req.user.id) {
      return res.status(401).send({error:"Not allowed",success});
    }

    curNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    // const note=Note.findByIdAndUpdate()

    res.status(200).json({curNote,success});
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ InternalError: "Internal Error" });
  }
});

//Delete  Note. DELETE Method . Login Required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let curNote = await Note.findById(req.params.id);
    if (!curNote) {
      return res.status(404).send("Not Found");
    }
    if (curNote.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    curNote = await Note.findByIdAndDelete(req.params.id);
    // const note=Note.findByIdAndUpdate()

    res.status(200).json({ Success: "Successfully deleted", note: curNote });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ InternalError: "Internal Error" });
  }
});

module.exports = router;
