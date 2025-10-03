const Image=require('../models/Image.js');
const { uploadtoCloudinary }=require('../helpers/cloudinaryHelper.js');

const uploadImage=async(req,res)=>{
    try{
        if(!req.file){  
            return res.status(400).json({success:false,
                message:'File is required.No file uploaded'});
        }
        const {url,publicId}=await uploadtoCloudinary(req.file.path);
        const newImage=new Image({
            url,
            publicId,   
            uploadedBy:req.user.id
        });
        await newImage.save();
        res.status(201).json({success:true,
            message:'Image uploaded successfully',
            image:newImage});

    }catch(error){
        console.error('Image upload error:',error);
        res.status(500).json({message:'Server error'});
    }
};
const fetchImagescontroller=async(req,res)=>{
    try{
  const Images=await Image.find({uploadedBy:req.user.id}).sort({createdAt:-1});
  if(Images){
    return res.status(200).json({success:true,images:Images});
  } 
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Server error'});
    }
}
module.exports={uploadImage,fetchImagescontroller};
