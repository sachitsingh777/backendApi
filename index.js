const express=require("express")
const app=express()
const {connection}=require("./db")
const { userRouter } = require("./routes/User.routes")
const { auth } = require("./middleware/authentication")
const { notesRouter } = require("./routes/Notes.route")
require("dotenv").config()
const cors=require("cors")
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Home Page")
})


app.use(auth)
app.use("/notes",notesRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to the Database")
      }catch(err){
          console.log(err)
          console.log("Not connected to the Database")
      }
    console.log("server is running at 8080")
})