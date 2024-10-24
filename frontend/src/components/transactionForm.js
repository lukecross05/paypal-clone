import React from "react";
import { useState } from "react";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState({});
  const [error, setError] = useState({});

  const handleSubmit = async () => {
    const transaction = { amount, senderID: recipient, recieverID: 1 };
    const response = await fetch(
      "http://localhost:4000/api/transactions/create",
      {
        method: "POST",
        body: JSON.stringify(transaction),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = response.json();
    if (response.ok) {
      console.log("successfully sent", json);
    } else {
      setError(json.error);
    }
  };

  return (
    <div>
      <label>Send Money</label>
      <input
        placeholder="Enter Amount"
        type="text"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
      <input
        placeholder="Enter Recipient ID"
        type="text"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TransactionForm;
