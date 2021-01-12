const mongoose = require('mongoose')
const user = require('./user');



let InfluencerOffer =  new mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: user
		},
		title: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
		},
		image: {
			type: String
        },
        price:{
            type: Number


		},
		description:{
            type: String


        },
		currentDate:{
			type:Date,
			default: Date.now
		},
	},
	{
		collection: 'InfluencerOffer',
		timestamps:true
	}
);
InfluencerOffer.index({'$**':'text'});
module.exports = mongoose.model('InfluencerOffer', InfluencerOffer);
