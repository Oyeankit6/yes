const mongoose = require("mongoose");

const WithdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  method: String, // "bank" or "upi"
  paymentDetails: Object, // Bank or UPI details
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Withdrawal ||
  mongoose.model("Withdrawal", WithdrawalSchema);
