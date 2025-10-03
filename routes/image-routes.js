const express=require('express');
const authMiddleware=require('../middleware/auth-middleware.js');
const adminMiddleware=require('../middleware/admin-middleware.js');
const router=express.Router();
const uploadMiddleware=require('../middleware/upload-middleware.js');
const uploadImage=require('../controllers/image-controller.js').uploadImage;
const fetchImagescontroller=require('../controllers/image-controller.js').fetchImagescontroller;
//upload the image
router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImage);
router.get('/fetch',authMiddleware,fetchImagescontroller);
module.exports=router;