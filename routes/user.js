const { verify } = require('jsonwebtoken');
const User = require('../model/User');
const { verifytoken, verifyTokenAndAuthoriztion, verifyTokenAndAdmin } = require('./verifyToken');

const router= require('express').Router();

//update
router.put("/:id" , verifyTokenAndAuthoriztion,async (req,res)=>{
    if(req.body.password){
        req.body.password= Cryptojs.AES.encrypt(req.body.password , process.env.PASS).toString()
    }
    try{
        const updateuser = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },{new :true})
        res.status(200).json(updateuser)
    }catch(err){
        res.status(500).json(err);
    }
} )

//delete
router.delete("/:id"  , verifyTokenAndAuthoriztion , async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error);
    }
})


//getuser

router.get("/find/:id"  , verifyTokenAndAdmin , async (req,res)=>{
    try {
      const user =   await User.findById(req.params.id)
      const {password, ...others } = user._doc;
      res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error);
    }
})

//getalluser

router.get("/"  , verifyTokenAndAdmin , async (req,res)=>{
    try {
      const users =   await User.find()
   
      res.status(200).json(users);

    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports= router