import React from "react";
import { useEffect, useState } from "react";
import TransactionForm from "../components/transactionForm";
import { useUserContext } from "../hooks/useUserContext";
import { useTransactionContext } from "../hooks/useTransactionContext";
const Home = () => {
  const { transactions: transactionsContext, dispatch } =
    useTransactionContext();
  const { user } = useUserContext();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log(user.token);
      const response = await fetch("http://localhost:4000/api/transactions/", {
        headers: {
          Authorisation: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        console.log("error fetching data");
      }

      const json = await response.json();
      await dispatch({ type: "SET_TRANSACTIONS", payload: json });
      setTransactions(json);
      console.log(json);
    };
    fetchData();
  }, [dispatch, user]);

  return (
    <div>
      {transactionsContext &&
        transactionsContext?.map((transaction) => (
          <p key={transaction._id}>{transaction.amount}</p>
        ))}
      <TransactionForm />
    </div>
  );
};

export default Home;
