const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  //each transaction needs a sender ID, reciever ID, amount,
  //
  amount: {
    type: Number,
    required: true,
  },
  senderID: {
    type: String,
    required: true,
  },
  recieverID: {
    type: String,
    required: true,
  },
  ownerObjectID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
