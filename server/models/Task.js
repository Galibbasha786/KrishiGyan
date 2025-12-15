// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    farmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    category: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, default: "" },
    priority: { type: String, default: "medium", enum: ["low", "medium", "high"] },
    status: { type: String, default: "pending", enum: ["pending", "inProgress", "completed"] },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;


