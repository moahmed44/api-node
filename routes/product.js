const { verify } = require('jsonwebtoken');
const Product = require('../model/Product');
const { verifytoken, verifyTokenAndAuthoriztion, verifyTokenAndAdmin } = require('./verifyToken');

const router= require('express').Router();

//creat

router.post("/" , verifyTokenAndAdmin, async (req,res)=>{
    const newproduct = new Product(req.body)
    try {
        const saveproduct = await newproduct.save();
        res.status.json(saveproduct);
    } catch (error) {
        res.status(500).json(error);
    }
})


//update
router.put("/:id" , verifyTokenAndAdmin,async (req,res)=>{
    
    try{
        const updateproduct = await Product.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },{new :true})
        res.status(200).json(updateproduct)
    }catch(err){
        res.status(500).json(err);
    }
} )

//delete
router.delete("/:id"  , verifyTokenAndAdmin , async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error);
    }
})


//getproduct

router.get("/find/:id" , async (req,res)=>{
    try {
      const product =   await Product.findById(req.params.id)
    
      res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error);
    }
})

//getall

router.get("/"  , async (req,res)=>{
    
    try {
      const product =   await Product.find()
   
      res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports= Product