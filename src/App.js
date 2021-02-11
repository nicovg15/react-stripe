import React from "react";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("ADD PUBLIC KEY");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/checkout",
          {
            id,
            amount: 10 * 100,
          }
        );
        console.log(data);
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h3>Price: $100</h3>
      <CardElement />
      <button>Buy</button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default App;
