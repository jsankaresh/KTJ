const express = require("express");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchUser = require("../middleware/fetchUser");
const JWTSecret = process.env.JWTSECRET;
//POST request to create user . No login required
router.post(
  "/createUser",
  [
    body("name", "Atleast 3 character required in Name").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Password should be atleast of length 8").isLength({
      min: 8,
    }),
  ],

  // Async function for creating user
  async (req, res) => {
    try {
      const errors = validationResult(req);
      
      let success=false;
      //checks if any validation error
      if (!errors.isEmpty()) {
        
        return res.status(400).json({ Error: errors.array() ,success});
      }
      let user = await User.findOne({ email: req.body.email });
      // check if email already registered
      if (user) {
        return res.status(400).json({ Error: "Email already registered." ,success});
      }

      //Generation of salt and hash
      const salt = await bcrypt.genSalt(10);

      const secPass = await bcrypt.hash(req.body.password, salt);

      //Creation of new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        about :req.body.about
      });

      //sending AuthToken
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken =  jwt.sign(data, JWTSecret);
       success=true;
      res.json({ authToken: authToken, status: "User successfully created",success });
    } catch (error) {
      console.log(error);
      
      const success=false;
      res.status(500).send({ Error: "Server Error" ,success});
    }
  }
);
//Post Method to get using Login Cred.
router.post(
  "/login",

  [
    body("email", "Invalid email").isEmail(),
    body("password", "Password should be atleast of length 8").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    try {
      //checks if any validation error
      if (!errors.isEmpty()) {
        return res.status(400).json({ Error: "Invalid Credentials" ,success});
      }
      let user = await User.findOne({ email: req.body.email });
      // check if email already registered
      if (!user) {
        return res.status(400).json({ Error: "Invalid Credentials" ,success});
      }
      const compare=await bcrypt.compare(req.body.password, user.password);
      if (!compare) {
        return res.status(400).json({ Error: "Invalid Credentials" ,success});
      }

      //sending AuthToken
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWTSecret);
      
      success=true;
      res.json({ authToken: authToken, status: "User successfully Login",success });
    } catch (error) {
      res.status(500).send({ Error: "Server Error" });
    }
  }
);

//Get login details using Post MEthod.Login using auth Token
router.post("/getUser", fetchUser, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");
    res.send({user,success:true});
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ Error: "Server Error" ,success:false});
  }
});




//Get login details using Post MEthod.Login using auth Token
router.get("/getProfile/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select("-password");
    res.send({user,success:true});
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ Error: "Server Error" ,success:false});
  }
});
module.exports = router;
