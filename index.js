require('dotenv').config()
require("./db");
var cors = require('cors')
const express = require("express");
const authT=require('./routes/auth');
const notesT=require('./routes/notes');
const postT=require('./routes/postsC');

const app = express();
const port = process.env.PORT || 5000;

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json());
app.use("/api/auth", authT);
// app.use("/api/notes", notesT);

app.use("/api/posts", postT);
app.use(express.static("frontend/build"));

const path = require("path");

app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

})




// console.log(process.env.JWTSecret);

app.listen(port,() => {
  console.log(`INotebook listening on port ${port}`);
});
