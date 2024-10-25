const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transactions");
const requireAuth = require("../middleware/authentication");
const {
  createTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");
router.use(requireAuth);
router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/create", createTransaction);
router.delete("/:id", deleteTransaction);
router.patch("/:id", updateTransaction);

module.exports = router;
