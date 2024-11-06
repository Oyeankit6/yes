import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
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
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
