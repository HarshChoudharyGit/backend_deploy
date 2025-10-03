require("dotenv").config();
const express=require("express");
const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());
const authRoutes=require("./routes/auth-routes.js");
const homeRoutes=require("./routes/home-routes.js");
const adminRoutes=require("./routes/admin-routes.js");
const uploadImageRoutes=require("./routes/image-routes.js");
app.use('/api/images',uploadImageRoutes);
const connecttoDB=require("./db/db.js");
app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);

connecttoDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});