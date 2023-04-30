const express=require("express")
const { UserModel } = require("../model/User.model")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
// userRouter.post("/register",async(req,res)=>{
//    try{ const user=new UserModel(req.body)
//     await user.save()
//     res.status(200).send({"msg":"New user has been registered"})
// }catch(err){
//     res.status(400).send({"err":err.message})
// }
// })

userRouter.post("/register",async(req,res)=>{
  const {name,email,pass,age}=req.body
  try{
  bcrypt.hash(pass, 8, async (err, hash)=>{
  const user=new UserModel({name,email,pass:hash,age})
  await user.save()
  res.send({msg:"Registered"})
  });
  }catch(err){
    res.send("Error in registering the user")
    console.log(err)
}
})



userRouter.post("/login",async(req,res)=>{
  const {email,pass}=req.body
  try{
  const user=await UserModel.findOne({email})
  console.log(user)
  if(user){
      bcrypt.compare(pass, user.pass, function(err, result) {
      if(result){
      const token = jwt.sign({authorID:user._id ,author:user.name}, 'masai');
       res.status(200).send({"msg":"Login Successfull","token":token})
  } else { 
    res.status(200).send({"msg":"Wrong in Credntials"})
  }
  });
  } else {
    res.status(200).send({"msg":"Wrong Credntials"})
  }
  } catch(err){
    res.status(400).send({"err":err.message})
  }
  
})

// userRouter.post("/login",async(req,res)=>{
//     const {email,pass}=req.body
//     try{
//       const user= await UserModel.findOne({email,pass})
//       if(user){
//         res.status(200).send({"msg":"Login Successfull"})
//       }else{
//         res.status(200).send({"msg":"Wrong Credentials"})
//       }
//     }
//     catch(err){
//         res.status(400).send({"err":err.message})
//     }
// })

module.exports={userRouter}