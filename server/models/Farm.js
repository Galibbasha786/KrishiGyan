import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  farmName: {
    type: String,
    required: true
  },
  location: {
    type: String,
  },
  cropType: {
    type: String,
  },
  size: {
    type: Number, // in acres/hectares
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;
