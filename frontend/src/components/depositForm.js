import React from "react";
import { useState } from "react";
const cardValidator = require("card-validator");

const DepositForm = () => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = () => {
    //validate the card number.
    const cardNumberValidation = cardValidator.number(cardNumber);
    if (cardNumberValidation.isValid) {
      console.log(
        "Card number is valid and recognized as:",
        cardNumberValidation.card.niceType
      );
    } else {
      console.log("Card number is invalid.");
    }

    //validate the expiration date.
    const expirationValidation = cardValidator.expirationDate(expiryDate);
    if (expirationValidation.isValid) {
      console.log("Expiration date is valid.");
    } else {
      console.log("Expiration date is invalid.");
    }

    //validate the CVV.
    const cvvValidation = cardValidator.cvv(cvv);
    if (cvvValidation.isValid) {
      console.log("CVV is valid.");
    } else {
      console.log("CVV is invalid.");
    }
  };

  return (
    <div>
      <label>Deposit Money</label>
      <input
        placeholder="Enter Amount"
        type="text"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
      <input
        placeholder="Enter Card Number"
        type="text"
        onChange={(e) => setCardNumber(e.target.value)}
        value={cardNumber}
      />
      <input
        placeholder="Enter Expiry Date"
        type="date"
        onChange={(e) => setExpiryDate(e.target.value)}
        value={expiryDate}
      />
      <input
        placeholder="Enter CVC"
        type="number"
        onChange={(e) => setCvv(e.target.value)}
        value={cvv}
      />

      <button onClick={handleSubmit}>Deposit</button>
    </div>
  );
};

export default DepositForm;
