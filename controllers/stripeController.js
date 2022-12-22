const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  // this is to make sure the prices coming from the front-end are accurate with correspondence to the database which was not shown here though.
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  // we then create a paymentIntent that returns a promise containing an object.
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(), // this is the total amount.
    currency: "usd", //and the currency.
  });
//   console.log(paymentIntent);
  // then we send the paymentIntent.client_secret to the front end.
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
