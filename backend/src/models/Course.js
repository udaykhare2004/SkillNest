import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    duration: { type: String },
    date: { type: String },
    spotsLeft: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);

