import mongoose from "mongoose";

const timerSchema = new mongoose.Schema({
  remainingTime: {
    type: Number,
    required: true,
  },
  running: {
    type: Boolean,
    required: true,
  },
  period: {
    type: Number,
    required: true,
  },
});

const Timer = mongoose.models.Timer || mongoose.model("Timer", timerSchema);

export default Timer;
