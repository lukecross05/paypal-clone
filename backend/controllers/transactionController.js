const Transaction = require("../models/Transactions");
const mongoose = require("mongoose");
const User = require("../models/User");
const createTransaction = async (req, res) => {
  try {
    const { amount, senderID, recieverID } = req.body;
    const id = req.user._id;
    console.log(amount, senderID, recieverID);
    const reciever = await User.findOne({ username: recieverID });
    console.log(reciever);
    if (!reciever) {
      console.log("here");
      throw new Error("Recipient username doesn't exist.");
    }
    const transaction = await Transaction.create({
      amount,
      senderID,
      recieverID,
      ownerObjectID: id,
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getTransactions = async (req, res) => {
  const id = req.user._id;
  console.log("here");
  const transactions = await Transaction.find({ ownerObjectID: id }).sort({
    createdAt: -1,
  });
  console.log(transactions);
  res.status(200).json(transactions);
};

const getTransaction = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid ID" });
  }
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    res.status(500).json({ error: "no such transaction" });
  }
  res.status(200).json(transaction);
};
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid ID" });
  }
  const transaction = await Transaction.findOneAndDelete({ _id: id });
  if (!transaction) {
    res.status(500).json({ error: "no such transaction" });
  }
  res.status(200).json(transaction);
};
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid ID" });
  }
  const transaction = await Transaction.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (!transaction) {
    res.status(500).json({ error: "no such transaction" });
  }
  res.status(200).json(transaction);
};
module.exports = {
  createTransaction,
  getTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
