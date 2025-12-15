// models/Income.js
import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    cropSales: {
      type: Number,
      default: 0,
      min: 0,
    },
    otherIncome: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);
export default Income;


