const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({
    message : "Invalid email or password."
  });

  const token = user.generateAuthToken();
  res.send(token);
});



// get user profile against id to display profile

router.get('/getUserProfile/:id',async(req,res)=>{

const user = await User.findById({_id:req.params.id});


  res.send(user)










})

// router.post('/facebook', async (req, res) => {
//   const {userID,accessToken} = req.body 
//   let urlGraphFacebook =`https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
//   fetch(urlGraphFacebook,{
//     method:'Get'
//   }).then(res=> res.json()).then(
//     res=>{ 
//  const {name,email}=res;
//    User.findOne({email}).exec((err,user)=>{
//      if(err){
//   return res.status(400).json({
//     error:'Something Went Wrong ...'
//   })

//      }
// //else  
// else{

//   if(user){
//     const token =user.generateAuthToken()    //jwt.signin({_id:user._id},process.env.JWT_SIGIN_KEY,{expiresIn:"7d"});
//     const {_id,name,email}=user;

//     res.json({
//       token,
//       user:{_id,name,email}
//     })
//   }else{
//      let password =email+process.env.JWT_SIGIN_KEY;
//      let newUser = new User({name,email,password});

//      newUser.save((err,data)=>{

//     if(err){
//       return res.status(400).json({
//         error:"Something went Wrong..."
//       })
//     }

//     const token = newUser.generateAuthToken() // jwt.signin({_id:data._id}, process.env.JWT_SIGIN_KEY,{expiresIn:'7d'});
//     const {_id,name,email}= newUser;

//     res.json({
//       token,
//       user:{_id,name,email}
//     })

//      })
//   }

// }


//    })



//     }
//   )

// });

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
