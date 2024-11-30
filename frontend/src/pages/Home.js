import React, { useState } from "react";
import { useEffect } from "react";
import TransactionForm from "../components/transactionForm";
import { useUserContext } from "../hooks/useUserContext";
import { useTransactionContext } from "../hooks/useTransactionContext";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const { transactions, dispatch, calculateBalance } = useTransactionContext();
  const { user } = useUserContext();
  const [balance, setBalance] = useState(0);
  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/api/transactions/", {
      headers: {
        Authorisation: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      await dispatch({ type: "SET_TRANSACTIONS", payload: json });
      //calculateBalance();
      console.log(json);
    }
    return json;
  };
  const { data, status } = useQuery("transactions", fetchData);
  /*useEffect(() => {
    fetchData();
    //calculateBalance();
  }, [dispatch]);

  /*const calculateBalance = async () => {
    console.log(balance);
    var count = 0;
    for (const transaction of transactions) {
      if (
        !(
          user &&
          user.username === transaction.senderID &&
          !(
            transaction.recieverID === transaction.senderID &&
            transaction.recieverID === user.username
          )
        )
      ) {
        count = count + transaction.amount;
        console.log(transaction);
      } else {
        count = count - transaction.amount;
      }
    }
    setBalance(count);
  };*/
  useEffect(() => {
    if (transactions) {
      setBalance(calculateBalance(user, transactions));
    }
  }, [transactions]);
  return (
    <div>
      {status === "loading" ? (
        <ClipLoader loading={status === "loading"} />
      ) : (
        <div>
          <p>Balance : {balance}</p>
          {transactions &&
            transactions.map((transaction) =>
              user && user.username === transaction.senderID ? (
                !(
                  transaction.recieverID === transaction.senderID &&
                  transaction.recieverID === user.username
                ) ? (
                  <p key={transaction._id} className="expense">
                    You sent {transaction.recieverID} ${transaction.amount}
                  </p>
                ) : transaction.amount > 0 ? (
                  <p key={transaction._id} className="income">
                    You deposited ${transaction.amount}
                  </p>
                ) : (
                  <p key={transaction._id} className="expense">
                    You withdrew ${transaction.amount}
                  </p>
                )
              ) : (
                <p key={transaction._id} className="income">
                  {transaction.senderID} sent you ${transaction.amount}
                </p>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default Home;
