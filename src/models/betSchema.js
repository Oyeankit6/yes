import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  periodNo: { type: Number, required: true },
  amount: { type: Number }, // Match the field name with the frontend
  number: { type: Number },
  fee: { type: Number, default: 0.2 },
  result: { type: String },
  category: {
    type: String,
    enum: ["Parity", "Sapre", "Bcone", "Emerd"], // Define allowed categories
    required: true, // Ensure category is required
  },

  color: { type: String },
  status: { type: String },
  createTime: { type: Date, default: Date.now }, // Handled by the schema
});

betSchema.index({ createTime: 1 }, { expireAfterSeconds: 48 * 60 * 60 });
const Bet = mongoose.models.Bet || mongoose.model("Bet", betSchema);

export default Bet;
