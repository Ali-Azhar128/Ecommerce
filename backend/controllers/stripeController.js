import Stripe  from 'stripe'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'

dotenv.config()

const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

const stripePayment = asyncHandler(async (req, res) => {
    try {
        const { amount, currency } = req.body; // Assuming you send amount and currency in the request body
        const finalAmount = Math.round(amount * 100); // Converting amount to cents

        
    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalAmount,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        },
    });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error.message)
        res.status(400).json({ error: error.message });
    }
});

export default stripePayment;