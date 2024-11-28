const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')

exports.userRegistration=async(req,res)=>{
  try{
    console.log(req.body);
    const {email,username,password}=req.body
    if(!email || !username || !password){
        res.status(400).json("Invalid Data")
    }
    else{
        const newUser=new users({
            email,username,password
        })
        await newUser.save()
        res.status(200).json(newUser)

    }
  }
  catch(err){
    console.log(err);
    res.status(400).json(err)
  }
}

exports.userLogin=async(req,res)=>{
   try{
    const {email,password}=req.body
    if(!email || !password){
        res.status(400).json("Invalid Data")
    }else{
        const existingLogin=await users.findOne({email,password})
        if(existingLogin){
            const token=jwt.sign({userId:existingLogin._id},process.env.SECRET_KEY)
            res.status(200).json({token ,username: existingLogin.username})
        }else{
            res.status(400).json("Invalid email/password")
        }
    }
   }
   catch(err){
    console.log(err);
    res.status(400).json(err)
   }
    
}