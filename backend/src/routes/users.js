import express from "express";
import User from "../models/User.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      enrolledCourses: user.enrolledCourses
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

