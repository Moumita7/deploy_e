const express=require("express")
const { connection } = require("./config/db")
require('dotenv').config()
var cors = require('cors')
const { userRouter } = require("./routes/user")
const { postRouter } = require("./routes/post")
const { authenticate } = require("./middleware/authentication")

const app=express()
 
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Home page check");
  });
  
  app.use("/users", userRouter);
  
  app.use(authenticate);
  app.use("/posts", postRouter);


let port=process.env.port
app.listen(port,async()=>{
    try {
        await connection;
        console.log("DB connected")
    } catch (error) {
        console.log("DB not connected")
    }
    console.log(`server will run ${port}`)
})

