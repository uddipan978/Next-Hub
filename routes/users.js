const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
var multer  = require('multer');
var fs = require('fs');
const {OAuth2Client} = require('google-auth-library')
const path =require('path');
const fetch = require('node-fetch');

const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

const SocialAccounts = require('../models/socialAccounts') 

const client = new OAuth2Client('191278417966-3fme93nsehp6ormu3m2hsbgdqqg6de34.apps.googleusercontent.com')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './images/')
  },
  filename: function (req, file, cb) {
      cb(null, new mongoose.Types.ObjectId() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      console.log('if')
      cb(null, true);
  }
  else {
      console.log('else')
      cb(null, false);
  }
}

const upload = multer({
  storage: storage
  , limits: {
      fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter
});
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/',async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  console.log(req.body)
  user = new User({
  name:req.body.name,
  username:req.body.username,
  email:req.body.email,
  phoneNumber:req.body.phoneNumber,
  password:req.body.password


  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const newUser = await user.save()

  const socialArray =  await SocialAccounts (
    {

      userId:newUser._id,
      social:[
          { title:"youtube",
             link:"www.youtube.com"
      
          }
      
      
      ]
      
      
      }

  )


     await  socialArray.save()
     
 
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name' ,"username", 'email','phoneNumber']));
});


// ------------ Update user name and user name -------------//

router.put('/updateprofile/:id',async(req,res)=>{

// const user = await User.findById(req.params.id)
// console.log(user)
// const updateduser = await user.update({$set:{name:"true"}}) 
// res.send(updateduser)


const id = req.params.id;
const { name, username} = req.body;

User.findOne({ _id: id })
    .exec()
    .then(user => {
        if (user) {

            user.name = name;
            user.username = username;
          
            user.save()
            .then(userobj => {
                res.status(201).json({
                    user: userobj
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
            
        }
        else {
            res.status(404).json({
                message: "no user found"
            })
        }


    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })



})








// router.post('/google', authController.login);

router.post('/uploadProfilePic/:id',upload.single('profilePic'), async (req, res) => {

  User.findById(req.params.id, function(err, user) {
    if (!user) res.status(404).send("data is not found");
    else {
      
     
      user.profilePic = req.file.path;
     



    user
        .save()
        .then(user => {
          res.json("profile Pic Added");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
   
   
   });

   /* GOOGLE LOGIN */

   router.post('/googleLogin', (req,res) => {
    const {token} = req.body
    console.log(token)
    
    client.verifyIdToken({idToken: token,audience: '104590688028-biofee5gi73s9i0dc9gm9u1mmi956ub1.apps.googleusercontent.com'})
    .then((response) => {
      const { email_verified, name, email, picture, given_name } = response.payload;
      
      if(email_verified) {
        User.findOne({email})
        .exec((err,user) => {
          if(err){
            return res.status(400).json({
              error : 'Something went wrong'
            })
          }else{
            if(user){
                const token = jwt.sign({
                  _id: user._id
                },
                'nextHub_jwtPrivateKey',
                {expiresIn: '7d'}
                )

                const {_id, name, email, picture, given_name} = user
                res.json({
                  token,
                  user: {_id, name, email, picture, given_name}
                })
            }
            else{
              let password = '123456';
              let newUser = new User({
                name : name,
                email: email,
                password: password,
                profilePic: picture,
                username: given_name
              })

              newUser.save((err,data) => {
                if(err){
                  return res.status(400).json({
                    error : 'Something went wrong'
                  })
                  const token = jwt.sign({
                    _id: data._id
                  },
                  'nextHub_jwtPrivateKey',
                  {expiresIn: '7d'}
                  )
  
                  const {_id, name, email, picture, given_name} = user
                  res.json({
                    token,
                    user: {_id, name, email, picture, given_name}
                  })
                }
              })
            }
          }
        })
      }
      
      console.log(response.payload)
    })

    
  
  })


  // ------------login with facebook----//

  router.post('/facebooklogin',async(req,res)=>{
    // const {userID,accessToken} = req.body 
    // console.log(userID);
    // console.log(accessToken);



    const {userID,accessToken,email,picture,name,id} = req.body
    
    console.log(userID);
    console.log(accessToken);
    console.log(name);
    console.log(email)
    console.log(picture)




  
    let user = await User.findOne({ email: email });
    if (user) {
      if(user.userId){
        //login

         user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare("12345", user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
      }
      else{
        res.status(404).json({
          message  :"no user found"
        })
      }
    }

    else{
  
    user = new User({
      name:name,
      username:name,
      email:email,
      password:"12345",
      userId:userID,
      profilePic:picture
      
    
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await user.save()

      const socialArray =  await SocialAccounts (
        {
    
          userId:newUser._id,
          social:[
              { title:"youtube",
                 link:"www.youtube.com"
          
              }
          
          
          ]
          
          
          }
    
      )
    
    
         await  socialArray.save()


      const token = user.generateAuthToken();
      res.header('x-auth-token', token).send(token);
    

    }
  // let urlGraphFacebook =`https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
  // await fetch(urlGraphFacebook,{
  //   method:'Get'
  // }).then(res => console.log(`facebook response ${res}`))
  // .then(
  //   json => console.log(json))


 





})

module.exports = router; 
