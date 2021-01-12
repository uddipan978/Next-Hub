const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 
 userId:{
type:String,

 },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  username:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  profilePic:{

    type: String

  },
  phoneNumber:{

    type: String

  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id,name:this.name, email:this.email,username:this.username,profilePic:this.profilePic,phoneNumber:this.phoneNumber, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    username:Joi.string().min(5).max(15).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phoneNumber:Joi.string(),
    // profilePic:Joi.string().required(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;