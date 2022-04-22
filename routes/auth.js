const router= require('express').Router();
const User = require("../model/User")
const Cryptojs = require('crypto-js')
const jwt = require("jsonwebtoken");


//Register
router.post("/register",async (req,res)=>{
    const newUser = new User({
        username :req.body.username,
        email:req.body.email,
        password:Cryptojs.AES.encrypt(req.body.password , process.env.PASS).toString()
    })

    try{
        const saveuser =  await newUser.save()
        res.status(201).json(saveuser)
    }catch(err){
           res.status(500).json(err);
    }
    
})

//login
router.post("/login" , async (req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("Wrong")
        
        const hashpassword = Cryptojs.AES.decrypt(user.password, process.env.PASS)
        const orgpassword = hashpassword.toString(Cryptojs.enc.Utf8);
        orgpassword !==req.body.password && res.status(401).json("Wrong");
        const accesstoken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },process.env.JWT_SEC,
        {expiresIn:"2d"}
        )
        const {password, ...others } = user._doc;
        res.status(200).json({...others , accesstoken});

    } catch (error) {
        res.status(500).json(error)
    }

} )
module.exports= router