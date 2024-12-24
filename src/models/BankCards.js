import mongoose from "mongoose";

const PaymentDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["bank", "upi"],
      required: true,
    },
    bankDetails: {
      name: {
        unique: true,
        type: String,
        required: function () {
          return this.type === "bank";
        },
      },
      ifsc: {
        type: String,
        required: function () {
          return this.type === "bank";
        },
      },
      bankName: {
        type: String,
        required: function () {
          return this.type === "bank";
        },
      },
      accountNumber: {
        type: String,
        required: function () {
          return this.type === "bank";
        },
      },
      mobileNumber: {
        type: String,
        required: function () {
          return this.type === "bank";
        },
      },
      email: {
        type: String,
        required: function () {
          return this.type === "bank";
        },
      },
    },
    upiDetails: {
      upiId: {
        type: String,
        unique: true,
        required: function () {
          return this.type === "upi";
        },
      },
    },
  },
  { timestamps: true }
);

const PaymentDetail =
  mongoose.models.PaymentDetail ||
  mongoose.model("PaymentDetail", PaymentDetailSchema);
export default PaymentDetail;
