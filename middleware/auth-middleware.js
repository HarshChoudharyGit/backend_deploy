const jwt=require('jsonwebtoken');
const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    console.log(authHeader);
    const token=authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            success:false,  
            message:"No token provided"
        });
    }   
    //get token from headers
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=decoded;
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
        
    }

    next();
}
module.exports=authMiddleware;