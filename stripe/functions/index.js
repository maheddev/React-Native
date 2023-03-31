const functions = require('firebase-functions');
const stripe = require('stripe')(
  'sk_test_51MM9UrH6FoiALPvQYg81XYU5MjA3Y5Fn170x6bctc4gaZ7cbPaPF9x8OFEsmrnoI6Hdkh61MUdtCgIkQ8y5nfZNm00wQI2zrUs',
);
exports.completePaymentWithStripe = functions.https.onRequest(
  (request, response) => {
    stripe.charges
      .create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: 'tok_mastercard',
      })
      .then(charge => {
        response.send(charge);
      })
      .catch(error => {console.log(error)});
  },
);
