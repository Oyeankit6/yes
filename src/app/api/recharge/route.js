import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Export a named export for each HTTP method, as required by Next.js app route
export async function POST(req) {
  try {
    const { amount, paymentMethodType = "card" } = await req.json();

    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires the amount in the smallest currency unit
      currency: "usd", // Set the appropriate currency, e.g., "usd" for US dollars
      payment_method_types: [paymentMethodType], // Specify the desired payment method type
    });

    // Return the client secret to the client
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);

    // If there's an error, return a JSON response with the error message
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
