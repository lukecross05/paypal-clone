import React from "react";
import { useEffect, useState } from "react";
import TransactionForm from "../components/transactionForm";
const Home = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/api/transactions/");
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        await setTransactions(json);
        console.log("okay");
      }
      await console.log(transactions);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <div>
      {transactions &&
        transactions.map((transaction) => (
          <p key={transaction._id}>{transaction.amount}</p>
        ))}
      <TransactionForm />
    </div>
  );
};

export default Home;
