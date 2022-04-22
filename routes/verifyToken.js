 const jwt = require("jsonwebtoken")



 const verifytoken = (req, res , next)=>{
     const authHeader = req.headers.token
     if(authHeader){
         const token = authHeader.sqlit(" ")[1];
         jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
             if(err)res.status(403).json("token  is  not valid");
             req.user= user;
             next();
         })

     }else{
         return res.status(401).json("you are not authenticated")
     }
 }


 const verifyTokenAndAuthoriztion =(req,res,next)=>{
     verifytoken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(401).json("you are not alowed")
        }
     })
 }


 const verifyTokenAndAdmin =(req,res,next)=>{
    verifytoken(req, res, ()=>{
       if(req.user.isAdmin){
           next()
       }else{
           return res.status(401).json("you are not alowed")
       }
    })
}
 module.exports = {verifytoken , verifyTokenAndAuthoriztion , verifyTokenAndAdmin}