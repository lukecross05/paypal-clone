import React from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useTransactionContext } from "../hooks/useTransactionContext";

const WithdrawForm = () => {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [error, setError] = useState("");
  const { user, dispatch } = useUserContext();
  const {
    transactions,
    dispatch: transactionDispatch,
    calculateBalance,
  } = useTransactionContext();
  useEffect(() => {
    if (transactions) {
      console.log("Transactions loaded:", transactions);
    }
  }, [transactions]);
  const handleSubmit = async () => {
    const validSortCode = validateSortCode(sortCode);
    const validAccountNumber = validateAccountNumber(accountNumber);
    if (validAccountNumber && validSortCode) {
      await sendRequest();
    }
    //send request.
    //await sendRequest();
  };

  const validateSortCode = async (sortCode) => {
    /*this just checks for valid format for now, as too many banks sort codes exists!
    soon might check specifically what bank sort code belongs to, e.g. natwest
    */
    var count = 0;

    for (const letter of sortCode) {
      console.log(letter);
      //if it should be a number, and it isnt a number
      if (
        [0, 1, 3, 4, 6, 7].includes(count) &&
        !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(letter)
      ) {
        //not valid
        return false;
      }
      if ([2, 5].includes(count) && letter != "-") {
        return false;
      }
      if (count === 7) {
        return true;
      }
      count++;
    }
    return true;
  };

  const validateAccountNumber = (accountNumber) => {
    //same as before, just checking its eight digits.
    var count = 0;

    for (const letter of accountNumber) {
      console.log(letter);
      //if it should be a number, and it isnt a number
      if (
        !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(letter)
      ) {
        //not valid
        return false;
      }

      if (count === 9) {
        return true;
      }
      count++;
    }
    return true;
  };

  const sendRequest = async () => {
    const amountBeingWithdrawn = amount * -1;
    console.log(transactions);
    const balance = await calculateBalance(user, transactions);
    console.log(balance);
    if (balance + amountBeingWithdrawn > 0) {
      const transaction = {
        amount: amountBeingWithdrawn,
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
        await transactionDispatch({ type: "SET_TRANSACTION", payload: data });
        setError("Succesfully withdrew : $ " + amount);

        setAmount("");
        setAccountNumber("");
        setSortCode("");
      } catch (error) {
        console.error("Error:", error.message);
        // Display error message in the frontend if needed
        alert(error.message); // or set this error message to some state variable
      }
    } else {
      setError("insuffiecient funds");
      setAmount("");
      setAccountNumber("");
      setSortCode("");
    }
  };

  return (
    <div>
      <label>Withdraw Money</label>
      <input
        placeholder="Enter Amount"
        type="text"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
      <input
        placeholder="Enter Account Number"
        type="text"
        onChange={(e) => setAccountNumber(e.target.value)}
        value={accountNumber}
      />
      <input
        placeholder="Enter Sort Code"
        type="text"
        onChange={(e) => setSortCode(e.target.value)}
        value={sortCode}
      />

      <button onClick={handleSubmit}>Withdraw</button>

      <p>{error}</p>
    </div>
  );
};

export default WithdrawForm;
