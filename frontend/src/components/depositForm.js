import React from "react";
import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";

const cardValidator = require("card-validator");

const DepositForm = () => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const { user, dispatch } = useUserContext();

  const handleSubmit = async () => {
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
    if (
      cvvValidation.isValid &&
      expirationValidation.isValid &&
      cardNumberValidation.isValid
    ) {
      //send request.
      await sendRequest();
    }
  };

  const sendRequest = async () => {
    const transaction = {
      amount,
      senderID: user.username,
      recieverID: user.username,
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/transactions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorisation: `Bearer ${user.token}`,
          },
          body: JSON.stringify(transaction),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An unknown error occurred");
      }

      const data = await response.json();
      console.log("Transaction created:", data);
      await dispatch({ type: "SET_TRANSACTION", payload: data });
      setAmount("");
      setCardNumber("");
      setCvv("");
      setExpiryDate("");
    } catch (error) {
      console.error("Error:", error.message);
      // Display error message in the frontend if needed
      alert(error.message); // or set this error message to some state variable
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
        type="month"
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
