const express=require("express")
const postRouter=express.Router()
const {PostModel}=require("../models/post")

postRouter.get("/",async(req,res)=>{
    try {
        const post=await PostModel.find()
        res.send(post)
    } catch (error) {
        res.send({"msg":"Something went wrong"})
        
    }

})

postRouter.post("/top",async(req,res)=>{
    const payload=req.body
    try {
        const postNote=new PostModel(payload)
        await postNote.save()
        res.send("Created the post")
    } catch (error) {
        res.send({"msg":"Something went wrong"})
    }
 
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const post=await PostModel.findOne({"_id":id})
    const userID_in_post=post.userID
    const userID=req.body.userID
    try {
        if(userID!==userID_in_post){
            res.send({"msg":"You are not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the post")
        }
    } catch (error) {
        console.log(err)
        res.send("Something went wrong")
    }
   
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try {
        await PostModel.findByIdAndDelete({"_id":id})
        res.send("Deleted the post")
    } catch (error) {
        console.log(err)
        res.send("Something went wong")
    }
})


module.exports={postRouter}