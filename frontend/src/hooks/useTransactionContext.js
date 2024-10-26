import { TransactionContext } from "../context/transactionContext";
import { useContext } from "react";

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw Error(
      "useTransactionContext must be used inside TransactionContextProvider"
    );
  }
  return context;
};
