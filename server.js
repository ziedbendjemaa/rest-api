const { request } = require("express");
let express=require("express");
const conectDb = require("./config/conectDb");
const User = require("./models/user");


let app=express();
require('dotenv').config({ path: './config/.env' })
conectDb()
app.use(express.json())


//crud

//add user
app.post("/user/post",async(req,res)=>{
    let{name,email,number}=req.body
try {
    let newUser=User({
        name,email,number
    })
    await newUser.save()
    res.send(newUser)
    
} catch (error) {
    console.log(error.message)
}
});

//delete

app.delete("/user/delete/:id",async(req,res)=>{
    try {
        let deletedUser=await User.findByIdAndDelete(req.params.id)
        res.send("user is deleted")
    } catch (error) {
        console.log(error.message)
        
    }
});
// get users
app.get("/user/get",async(req,res)=>{
    try {
        let users= await User.find()
        res.send(users)
    } catch (error) {
        console.log(error.message)
    }
});

// get user by id
app.get("/user/get/:id",async(req,res)=>{
    try {
        let theUser=await User.findById(req.params.id)
        res.send(theUser)
    } catch (error) {
        console.log(error.message)
    }
});

//edit
app.put("/user/edit/:id",async(req,res)=>{
    try {
        let editedUser=await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
        res.send(editedUser)
    } catch (error) {
        console.log(error.message)
    }
})



let PORT=process.env.PORT||2000;
app.listen(PORT,err=>err?console.log(err):console.log(`the server is runing`))