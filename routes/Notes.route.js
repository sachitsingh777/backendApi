const express=require("express")
const {NoteModel}=require("../model/notes.model")
const notesRouter=express.Router()

notesRouter.get("/", async(req,res)=>{
try{
const notes=await NoteModel.find({authorID:req.body.authorID})
res.status(200).send(notes)
}catch(err){
    res.status(400).send({"err":err.messgae})
}
})
notesRouter.post("/create", async (req,res)=>{
    try{

const note=new NoteModel(req.body)
await note.save()
res.send({"msg":"New Note has been Created"})  
    }catch(err){
        res.status(400).send({"err":err.message})
    }

})
notesRouter.patch("/update/:noteID", async(req,res)=>{
 const {noteID}=req.params
 const notes=await NoteModel.findOne({_id:noteID})
 console.log(notes)
 try{
    if(req.body.authorID!==notes.authorID){
        res.status(200).send({"msg":`you are not authorized `})  
    }else{
      await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
    res.status(200).send({"msg":`The note with id:${noteID} has been updated`})  
    }
    
}catch(err){
    res.status(400).send({"err":err.message})
 }
})
notesRouter.delete("/delete/:noteID", async(req,res)=>{
    const {noteID}=req.params
    const notes=await NoteModel.findOne({_id:noteID})
    try{
       if(req.body.authorID!==notes.authorID){
           res.status(200).send({"msg":`you are not authorized `})  
       }else{
         await NoteModel.findByIdAndDelete({_id:noteID},req.body)
       res.status(200).send({"msg":`The note with id:${noteID} has been Deleted`})  
       }
       
   }catch(err){
       res.status(400).send({"err":err.message})
    }
})
module.exports={
notesRouter
}
