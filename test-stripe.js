const stripe = require("stripe")("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"); // Replace with your Stripe Secret Key

async function testStripe() {
    try {
        const account = await stripe.accounts.retrieve();
        console.log("Stripe account connected:", account);
    } catch (error) {
        console.error("Stripe error:", error.message);
    }
}

testStripe();







