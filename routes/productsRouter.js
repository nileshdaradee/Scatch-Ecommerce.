const express = require("express");
const router = express.Router();
const upload=require('../config/multer-config')
const productModel=require('../models/product-model')

router.post("/create",upload.single("image") ,async (req, res) =>{
 try {
    
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  
  const newImage = new productModel({
    name: req.body.name,
    data: req.file.buffer,
    contentType: req.file.mimetype,
    price:req.body.price,
    discount:req.body.discount,
    bgcolor:req.body.bgcolor,
    panelcolor:req.body.panelcolor,
    textcolor:req.body.textcolor



});

await newImage.save();

  

  req.flash("success","product created succesfully.")
  res.redirect('/owners/admin');
  }
 catch (error) {
  res.send(error.message);
 }
  
});




module.exports = router;
