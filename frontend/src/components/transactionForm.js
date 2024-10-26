import React from "react";
import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState({});
  const [error, setError] = useState({});
  const { user } = useUserContext();
  const handleSubmit = async () => {
    const transaction = {
      amount,
      senderID: user.username,
      recieverID: recipient,
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
    } catch (error) {
      console.error("Error:", error.message);
      // Display error message in the frontend if needed
      alert(error.message); // or set this error message to some state variable
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
        placeholder="Enter Recipient Username"
        type="text"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TransactionForm;
