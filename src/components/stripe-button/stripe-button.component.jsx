import React from "react";
import StripeCheckOut from "react-stripe-checkout";
import STRIPE_PUBLISHABLE_KEY from "../../.env.local";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = STRIPE_PUBLISHABLE_KEY;
  const onToken = token => {
    alert("Payment successfull");
    console.log(token);
  };
  return (
    <StripeCheckOut
      label="Pay Now"
      name="Crown clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
