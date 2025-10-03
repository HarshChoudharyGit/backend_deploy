//register controller
const User=require('../models/User.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const registerUser=async(req,res)=>{
    try {
        //extract user info from req.body
        const {name,email,password,role}=req.body;
        //check if user already exist
        const checkexistinguser=await User.findOne({$or:[{email:email},{name:name}]});
        if(checkexistinguser){
            return res.status(400).json({
                success:false,
                message:"User already exists with this email or name"
            });
        }
        //hash user password
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        //create new user
        const newuser=new User({
            name,   
            email,
            password:hashedpassword,
            role:role || 'user'
        });
        await newuser.save();
        if(newuser){    
            res.status(201).json({
                success:true,
                message:"User registered successfully",
            }); 
        }else{
            res.status(400).json({
                success:false,
                message:"Failed to register user"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"});
    }
}
//login controller
const loginUser=async(req,res)=>{
    try {
        const {name,password}=req.body;
        //check if user exists
        const existinguser=await User.findOne({name:name});
        if(!existinguser){
            return res.status(400).json({
                success:false,
                message:"User does not exist with this name"
            });
        }
        //compare password
        const ismatch=await bcrypt.compare(password,existinguser.password);
        if(!ismatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            });
        }
        //login successful
        //bearer token
        //create user token
        const accessToken=jwt.sign(
            {userId:existinguser._id,name:existinguser.name,role:existinguser.role},
            process.env.JWT_SECRET,{
                expiresIn:'15m'
            }
        )
        return res.status(200).json({
            success:true,
            message:'Logged in successfully',
            accessToken
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"});
    }
};
const changePassword=async(req,res)=>{
try{
const userId=req.user.userId;
const {oldPassword,newPassword}=req.body;
//find the current login user
const user=await User.findById(userId);
if(!user){
    return res.status(404).json({
        success:false,
        message:"User not found"
    });
}
//compare old password
const ismatch=await bcrypt.compare(oldPassword,user.password);
if(!ismatch){
    return res.status(400).json({
        success:false,
        message:"Old password is incorrect"
    }); 
}
//hash new password
const salt=await bcrypt.genSalt(10);
const hashedpassword=await bcrypt.hash(newPassword,salt);
user.password=hashedpassword;
await user.save();
return res.status(200).json({
    success:true,
    message:"Password changed successfully"
});

}catch(e){
    console.log(e);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error"});  

}
}
module.exports={registerUser,loginUser,changePassword};