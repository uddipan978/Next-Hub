var multer = require('multer')
var InfluencerOffer = require('../models/influencerOffer')
var User = require('../models/user')
const express = require('express');
const Payment = require('../models/payment')
const router = express.Router();
const stripe = require('stripe')("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")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    let a = file.originalname.split('.')
    cb(null, `${file.fieldname}-${Date.now()}.${a[a.length - 1]}`)
  }
})

var upload = multer({ storage: storage })

router.post('/addOffer', upload.single("image"), async (req, res) => {

  let offer = new InfluencerOffer({
    userId: req.body.userId,
    title: req.body.title,
    image: req.file.path,
    price: req.body.price,
    description: req.body.description




  })

  offer.save().then(merchant => {
    console.log(merchant)
    res.status(200).json({ 'business': 'business in added successfully', offer: merchant });
  })
    .catch(err => {
      console.log(offer)
      res.status(400).send("unable to save to database");
    })


});


router.put('/editProduct/:id', upload.single("image"), async (req, res) => {


  var offer = await InfluencerOffer.findByIdAndUpdate(req.params.id);

  if (!offer) return res.status(404).send('The offer with the given ID was not found.');
  else {
    offer.title = req.body.title ? req.body.title : offer.title;
    // image:req.file.path,
    offer.price = req.body.price ? req.body.price : offer.price;
    offer.description = req.body.description ? req.body.description : offer.description;



  }

  await offer.save()



  res.send(offer);
});


router.get('/getSpecificUserProducts/:userId', async (req, res) => {
  const offers = await InfluencerOffer.find({ userId: req.params.userId });
  res.send(offers);
});

router.get('/getSpecificProduct/:id', (req, res) => {
  InfluencerOffer.findById(req.params.id)
    .then((resp) => {
      res.send(resp)
    })
    .catch((err) => {
      res.send(err)
    })
})
//  get offer by id
router.get('/getSpecificProduct/:id', async (req, res) => {
  const offers = await InfluencerOffer.find({ _id: req.params.id });
  res.send(offers);
});

// get specific product       
router.get('/getSpecificProduct/:id', (req, res) => {
  InfluencerOffer.findById(req.params.id)
    .then((resp) => {
      res.send(resp)
    })
    .catch((err) => {
      res.send(err)
    })
})

//-------------------------------------GET Price Filter-----------------------------//   

router.post('/getPrice', (req, res) => {
  const max = req.body.maxPrice
  const min = req.body.minPrice
  console.log(max, min)
  InfluencerOffer.find({
    price: { $lte: max ? max : 10000000000, $gte: min ? min : 0 }
  })
    .then((resp) => {
      res.send(resp)
    })
    .catch((err) => {
      res.send(err)
    })
})

//-------------------------------------GET All Offers-----------------------------//   
router.get('/getAllOffers', (req, res) => {
  InfluencerOffer.find()
    .then((resp) => {
      res.send(resp)
    })
    .catch((err) => {
      res.send(err)
    })
})


router.delete('/:id', async (req, res) => {

  const offer = await InfluencerOffer.findByIdAndRemove(req.params.id);

  if (!offer) return res.status(404).send('The offer with the given ID was not found.');

  res.send(offer);
});

router.get('/getSearchProducts/:productTitle', (req, res) => {
  const searchString = req.params.productTitle
  InfluencerOffer.find({ $text: { $search: searchString } })
    .then((resp) => {
      res.send(resp)
    })
    .catch((err) => {
      res.send(err)
    })
})

/*FOR PAYMENT*/
//getting token from stripe

router.post('/stripe/payment', async (req, res) => {
  const amount = parseInt((parseFloat(req.body.amount)) * 100);
  console.log(`amount ${amount}`)
  console.log(req.body)
  const token = await stripe.tokens.create({
    card: {
      number: req.body.cardNumber,
      exp_month: req.body.month,
      exp_year: req.body.year,
      cvc: req.body.cvc
    },
  })
    .catch(err => {
      switch (err.type) {
        case 'StripeCardError':
          res.status(401).json({
            message: "invalid card details"
          })
          console.log("invalid card details")
          // A declined card error
          //   err.message; 
          // => e.g. "Your card's expiration year is invalid."
          break;
        case 'StripeRateLimitError':
          // Too many requests made to the API too quickly
          res.status(403).json({
            message: "Rate limit error"
          })
          console.log("rate limit error")
          break;
        case 'StripeInvalidRequestError':
          // Invalid parameters were supplied to Stripe's API
          res.status(401).json({
            message: "Invalid Request"
          })
          console.log("invalid request")
          break;
        case 'StripeAPIError':
          // An error occurred internally with Stripe's API

          res.status(502).json({
            message: "Payment Gateway Error"
          })
          console.log("payment gateway api error")
          break;
        case 'StripeConnectionError':
          // Some kind of error occurred during the HTTPS communication
          res.status(403).json({
            message: "Payment Gateway Connection Error"
          })
          console.log("payment gateway connection error")
          break;
        case 'StripeAuthenticationError':
          // You probably used an incorrect API key
          res.status(401).json({
            message: "Authentication Error"
          })
          console.log("authentication error")
          break;
        default:
          // Handle any other types of unexpected errors
          res.status(503).json({
            message: "Error "
          })
          break;
      }
    })

  console.log(`token ${token.id}`)

  //charging via stripe token 

  const charge = await stripe.charges.create({
    amount: (amount),
    currency: 'usd',
    source: token.id,
    description: 'description',
  })
    .catch(err => {
      switch (err.type) {
        case 'StripeCardError':
          res.status(401).json({
            message: "invalid card details"
          })
          console.log("invalid card details")
          // A declined card error
          //   err.message; 
          // => e.g. "Your card's expiration year is invalid."
          break;
        case 'StripeRateLimitError':
          // Too many requests made to the API too quickly
          res.status(403).json({
            message: "Rate limit error"
          })
          console.log("rate limit error")
          break;
        case 'StripeInvalidRequestError':
          // Invalid parameters were supplied to Stripe's API
          res.status(401).json({
            message: "Invalid Request"
          })
          console.log("invalid request")
          break;
        case 'StripeAPIError':
          // An error occurred internally with Stripe's API

          res.status(502).json({
            message: "Payment Gateway Error"
          })
          console.log("payment gateway api error")
          break;
        case 'StripeConnectionError':
          // Some kind of error occurred during the HTTPS communication
          res.status(403).json({
            message: "Payment Gateway Connection Error"
          })
          console.log("payment gateway connection error")
          break;
        case 'StripeAuthenticationError':
          // You probably used an incorrect API key
          res.status(401).json({
            message: "Authentication Error"
          })
          console.log("authentication error")
          break;
        default:
          // Handle any other types of unexpected errors
          res.status(503).json({
            message: "Error "
          })
          break;
      }
    });

  console.log(`charge ${charge}`)

  if (charge.status == "succeeded") {
    return res.status(200).json({
      message: "payment successfull"
    })
  }
  else {
    return res.status(404).json({
      message: "payment failed"
    })
  }
})


module.exports = router