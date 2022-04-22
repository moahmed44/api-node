const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const prodductRoute = require('./routes/product')

dotenv.config()
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,).then(console.log("conect mongo")).catch(err=>console.log(err));


app.use('/api/users' , userRoute )
app.use('/api/auth' , authRoute)
app.use('/api/product' , prodductRoute)



app.listen("5000", ()=>{
    console.log("bakendis run on 5000");
})