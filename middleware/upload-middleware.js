const multer=require('multer');
const path=require('path');
//set mutler storage
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
//file filter
const fileFilter=(req,file,cb)=>{
    const allowedFileTypes=['image/jpeg','image/jpg','image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Only .jpeg,.jpg and .png files are allowed'),false);
    }   
};
//init upload
const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:1024*1024*5} //5MB limit
});
module.exports=upload;