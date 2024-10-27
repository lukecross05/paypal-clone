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

  return (
    <TransactionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};
