// models/rechargeSchema.js
import mongoose from "mongoose";

const rechargeSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      ref: "User", // Reference to the User model
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v > 0; // Only positive recharge amounts are valid
        },
        message: (props) => `${props.value} is not a valid recharge amount!`,
      },
    },
    utrNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Recharge =
  mongoose.models.Recharge || mongoose.model("Recharge", rechargeSchema);

export default Recharge;
