const express = require('express')
const router = express.Router()
const User=require('../models/User')
const {body,validationResult} = require('express-validator')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "LAZiZFOODkyabaathaiekdumumdaa$#"

router.post("/createuser",
   [ body('email','enter valid email').isEmail(),  //for getting email and validate it
    body('name').isLength(),
    body('password','enter valid Password').isLength({min:8}),
    body('repassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords mismatch');
        }
        return true;
      }).withMessage('Passwords mismatch')],
    async (req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({erros:errors.array()});//
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)

    try{
      await  User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            repassword:secPassword,
            location:req.body.location
        })
        res.json({success:true});//send response if user is create or not after hit end-point
    }
    catch(error){
        console.log(error)
        res.json({success:false});
    }
})

router.post("/loginuser",
    [ body('email').isEmail(),  //for getting email and validate it
   
     body('password','incorrect Password').isLength({min:8})],
   
     async (req,res)=>{
 
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({erros:errors.array()});
          }
    let email = req.body.email;
 
     try{
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"accounts doesn't exists"})
        }
        
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)

        if(!pwdCompare)
        {
            return res.status(400).json({errors:"Invalid  passwords"})
        }

        const data = {
            user:{id:userData.id}
        }
         const authToken = jwt.sign(data,jwtSecret);
         res.json({success:true, authToken:authToken});//send response if user is create or not after hit end-point
     }
     catch(error){
         console.log(error)
         res.json({success:false});
     }
 })

module.exports =router;