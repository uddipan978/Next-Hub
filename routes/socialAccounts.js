
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
//get the particular user social 
const socialAccounts = require('../models/socialAccounts');
const { json } = require('express');

//---------------Add  User Social Accounts-----------------//
router.post('/adduserSocialAccounts',async (req, res) => {

    console.log(req.body)
     const  usersocial = new socialAccounts(   
          req.body  
      )
     console.log(usersocial)
    const data =  await usersocial.save();
     res.send(data).status("200")
    
    
           
      });
      
 //--------------End--------------//     



//----------- update the link of the obj in array---------//
      router.put('/update/:obj_id/:social_id',async (req, res) => {
       const newLink = req.body.link
        console.log(req.body)
        socialAccounts.update({'social._id': req.params.social_id},
        {'$set': {
               'social.$.link': newLink ,
         }},
            function(err,model) {
             if(err){
              console.log(err);
              return res.send(err);
          }
          return res.json(model);
   });
        
               
          });
///------------------------End---------------------//

//------------------ Add new Social Link to the social link array ---------------//
//obj._id is the id which is the id of whole object 
router.post('/addNewLink/:obj_id', async(req,res)=>{

    
console.log(req.body)

    var obj_id = req.params.obj_id;/** assume here we get 54fcb3890cba9c4234f5c925 id 
    of article as shown in our demo json bve
     "_id" : ObjectId("54fcb3890cba9c4234f5c925"),
     **/ 
    /** assume your req.body like is below
        you can set your logic your own ways
        for this article i am assuming that data
        would come like below
    **/
    //req.body={post: "this is the test comments"};
     
    socialAccounts.findByIdAndUpdate(
        obj_id,
     { $push: {"social": req.body}},
     {  safe: true, upsert: true},
       function(err, model) {
         if(err){
        	console.log(err);
        	return res.send(err);
         }
          return res.json(model);
      });



})


// -------------------- get particular user social Account by id--------------//

router.get('/getSocialAccounts/:userId',async(req,res)=>{

   
		const offers = await socialAccounts.findOne({userId:req.params.userId});
		res.send(offers);



})
      
module.exports = router; 