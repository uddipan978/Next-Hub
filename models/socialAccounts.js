
const mongoose = require('mongoose')
const user = require('./user');


//03002090959 anees khan pucit blood doner society 
let SocialAccounts =  new mongoose.Schema({
    userId: {
        type:String,
        required:true,
        ref:user
    },
    createdAt: { type: Date, default: Date.now },

    social: [{ title: String,
                 link: String,
                 posted: {type: Date, default: Date.now}
               }]
	},
	{
		collection: 'SocialAccounts',
		timestamps:true
	}
);

module.exports = mongoose.model('SocialAccounts', SocialAccounts);








