import React, { useState } from "react";
import { useEffect } from "react";
import TransactionForm from "../components/transactionForm";
import { useUserContext } from "../hooks/useUserContext";
import { useTransactionContext } from "../hooks/useTransactionContext";
const Home = () => {
  const { transactions, dispatch } = useTransactionContext();
  const { user } = useUserContext();
  const [balance, setBalance] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      console.log(user.token);
      const response = await fetch("http://localhost:4000/api/transactions/", {
        headers: {
          Authorisation: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        await dispatch({ type: "SET_TRANSACTIONS", payload: json });
        console.log(json);
      }
    };
    fetchData();
    const calculateBalance = async () => {
      console.log(transactions);
      for (const transaction of transactions) {
        console.log(transaction);
        if (transaction.senderID != user.username) {
          const sum = balance + transaction.amount;
          setBalance(sum);
        }
      }
    };
    calculateBalance();
  }, [dispatch]);

  return (
    <div>
      <p>Balance : {balance}</p>
      {transactions &&
        transactions.map((transaction) =>
          user && user.username === transaction.senderID ? (
            <p key={transaction._id}>
              You sent {transaction.recieverID} ${transaction.amount}
            </p>
          ) : (
            <p key={transaction._id}>
              {transaction.senderID} sent you ${transaction.amount}
            </p>
          )
        )}

      <TransactionForm />
    </div>
  );
};

export default Home;
