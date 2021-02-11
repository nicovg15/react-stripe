const express = require("express");
const stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = new Stripe("ADD PRIVATE KEY");

app.use(cors());
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Select a description",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    res.send("received");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server on port ", 3001);
});
