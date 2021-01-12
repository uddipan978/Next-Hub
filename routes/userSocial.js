

const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
//get the particular user social 
const UserSocial = require('../models/userSocial');
const { json } = require('express');

router.get('/userSocial/:id', async (req, res) => {
  const user = await UserSocial.find({userId:req.params.id});
  res.send(user);
});

router.post('/AddSocial',async (req, res) => {

console.log(req.body)
 const  usersocial = new UserSocial(
     
      req.body
     
  )

 console.log(usersocial)

const data =  await usersocial.save();

 res.send(data).status("200")


       
  });


  router.post('/EditSocial/:id',async (req, res) => {

    console.log(req.body)
    const social = await UserSocial.findByIdAndUpdate(req.params.id,
        { 
      userId:req.body.userId,
      youtube: req.body.youtube,
      facebook:req.body.facebook,
      instagram:req.body.instagram,
      twitter: req.body.twitter,
     
  
        
        }, { new: true });
     console.log(social)
    
    res.send(social)
    
    
           
      });



// Edit Array of object in mongoose for social

router.post('/EditSocialArray/:id',async (req, res) => {

  
  var article_id = req.params.id;/** assume here we get 54fcb3890cba9c4234f5c925 id 
    of article as shown in our demo json bve
     "_id" : ObjectId("54fcb3890cba9c4234f5c925"),
     **/ 
    /** assume your req.body like is below
        you can set your logic your own ways
        for this article i am assuming that data
        would come like below
    **/
    //req.body={post: "this is the test comments"};
     
    UserSocial.findByIdAndUpdate(
     article_id,
     { $push: {"comments": req.body}},
     {  safe: true, upsert: true},
       function(err, model) {
         if(err){
        	console.log(err);
        	return res.send(err);
         }
          return res.json(model);
      });
    });




module.exports = router; 
