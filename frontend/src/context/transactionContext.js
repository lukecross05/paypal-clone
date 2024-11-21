import { createContext, useReducer } from "react";

export const TransactionContext = createContext();

export const TransactionReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return {
        transactions: action.payload,
      };
    case "SET_TRANSACTION":
      console.log("dispatched", action.payload);
      return {
        transactions: [action.payload, ...state.transactions],
      };
    case "DELETE_TRANSACTION":
      return {
        transactions: state.transactions.filter(
          (t) => t._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, {
    transactions: null,
  });

  const calculateBalance = (user, transactions) => {
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
    return count;
  };

  return (
    <TransactionContext.Provider
      value={{ ...state, dispatch, calculateBalance }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
