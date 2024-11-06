// // src/models/resultSchema.js

// import mongoose from "mongoose";

// const resultSchema = new mongoose.Schema({
//   period: {
//     type: Number,
//     required: true,
//   },
//   number: {
//     type: Number,
//     required: true,
//   },
//   color: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Middleware to ensure that the total number of entries does not exceed 150

// const Results =
//   mongoose.models.Result || mongoose.model("Result", resultSchema);

// export default Results;

import mongoose from "mongoose";

// Define the schema for individual result categories
const ResultCategorySchema = new mongoose.Schema({
  number: { type: Number, required: true },
  color: { type: String, required: true },
});

// Define the main results schema with period and results for four categories
const ResultSchema = new mongoose.Schema(
  {
    period: {
      type: Number,
      required: true,
      unique: true,
    },
    results: {
      Parity: ResultCategorySchema,
      Sapre: ResultCategorySchema,
      Bcone: ResultCategorySchema,
      Emerd: ResultCategorySchema,
    },
  },
  { timestamps: true }
);

// Export the schema with a fallback for existing models
export default mongoose.models.Results ||
  mongoose.model("Results", ResultSchema);
