import mongoose from "mongoose";

// Define the user schema with the userId field
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true, // Ensure userId is unique
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) => `${props.value} is not a valid balance!`,
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Pre-save hook to set userId
userSchema.pre("save", async function (next) {
  // If userId is not set (new user), fetch the highest existing userId
  if (this.isNew) {
    const lastUser = await mongoose
      .model("User")
      .findOne()
      .sort({ userId: -1 });
    const nextUserId = lastUser ? lastUser.userId + 1 : 532111;
    this.userId = nextUserId;
  }
  next();
});

// Create and export the User model, ensuring the schema is connected
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
