const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transactions");
const {
  createTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");
router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/create", createTransaction);
router.delete("/:id", deleteTransaction);
router.patch("/:id", updateTransaction);

module.exports = router;
