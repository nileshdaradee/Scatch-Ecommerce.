const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const {relogin}=require('../controllers/authController')
const mongoose=require('mongoose')


router.get("/",function (req, res) {
  let error = req.flash("error");
  res.render("index", { error ,loggedin:false});
});

router.get("/shop", isloggedin, async (req, res)=> {
  let success=req.flash("success")
  const images = await productModel.find();
    res.render('shop', { products: images ,success});
 
});

router.get("/cart", isloggedin, async (req, res)=> {
  let user=await userModel.findOne({email:req.user.email}).populate("cart");
  console.log(user.cart);
 res.render('cart',{products:user.cart})
 
});


router.get("/addtocart/:id", isloggedin, async (req, res)=> {
  let user=await userModel.findOne({email:req.user.email});

  user.cart.push({item:req.params.id,quantity:5});
  console.log(user.cart)
  await user.save()

  


  console.log(cartItem)
  req.flash("success","Added to cart");
  res.redirect("/shop")

 
});










module.exports = router;
