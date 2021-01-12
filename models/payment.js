const mongoose = require('mongoose')
const user = require('./user');

let Payment =  new mongoose.Schema({
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: user
		},
		cardName: {
            type : String,
            required : true
        },
        cardNumber: {
            type: String,
            required : true
        },
        month: {
            type: String,
            required : true
        },
        year: {
            type: String,
            required : true
        },
        cvc : {
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true
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

module.exports = mongoose.model('Payment', Payment);


// router.post("/paymentDetailToDb", (req, res) => {
//   console.log(req.body);
//   if (req.body === null) res.status(400).send("Bad Request");
//   let newPayment = new Payment({
//     userId : req.body.userId,
//     cardName: req.body.cardName,
//     cardNumber: req.body.cardNumber,
//     month: req.body.month,
//     year: req.body.year,
//     cvc: req.body.cvc,
//     price: req.price.price,
//     currentDate: ''
//   });

//   console.log("Payment Created as: " + newPayment)
//   newPayment
//     .save()
//     .then((newPayment) => res.send(newPayment))
//     .catch((err) => console.log(err));
// });