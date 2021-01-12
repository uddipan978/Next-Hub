const mongoose = require('mongoose')
const user = require('./user');



let UserSocial =  new mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: user
        },
        
        social:[
            {
                title:String,
                
                link:String
            }

        ],
		youtube: {
            type: String,
            
            minlength: 5,
            maxlength: 50
		},
		facebook: {
            type: String,
          
            minlength: 5,
            maxlength: 50
        },
        instagram: {
            type: String,
            
            minlength: 5,
            maxlength: 50
        },
        twitter:{
            type: String,
            minlength: 5,
            maxlength: 50

        },
		currentDate:{
			type:Date,
			default: Date.now
		},
	},
	{
		collection: 'UserSocial',
		timestamps:true
	}
);

module.exports = mongoose.model('UserSocial', UserSocial);
