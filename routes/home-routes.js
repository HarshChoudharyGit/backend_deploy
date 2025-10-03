const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/auth-middleware.js');
router.get('/welcome',authMiddleware,(req,res)=>{
    const {name,role}=req.user;
   res.json({
    user:{name,role},
    message:"Welcome to the Home Page" 
   })
});
module.exports=router;