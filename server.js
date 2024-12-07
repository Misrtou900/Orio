const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS middleware
const stripe = require("stripe")("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"); // Replace with your Stripe Secret Key

const app = express(); // Initialize Express

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

app.post("/create-checkout-session", async (req, res) => {
    const { email, plan } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan === "premium" ? "price_1QTLWnCAGN9YXluLrUhQlE3m" : "price_1QTLVtCAGN9YXluLhpiauBhk",
                    quantity: 1,
                },
            ],
            mode: "subscription",
            customer_email: email,
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe session:", error.message); // Log the exact error
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
