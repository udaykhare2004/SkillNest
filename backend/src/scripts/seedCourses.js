import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/skillnest";

const mockCourses = [
  {
    title: "Intro to Web Development",
    description: "Build your first responsive website with HTML, CSS, and a touch of JavaScript in this hands-on beginner workshop.",
    category: "Web",
    level: "Beginner",
    duration: "3 hours",
    date: "24 Mar, 5–8pm",
    spotsLeft: 18
  },
  {
    title: "JavaScript for Problem Solving",
    description: "Strengthen your fundamentals with real-world coding challenges and patterns used in interviews and projects.",
    category: "Programming",
    level: "Intermediate",
    duration: "2.5 hours",
    date: "26 Mar, 7–9:30pm",
    spotsLeft: 25
  },
  {
    title: "React in a Weekend",
    description: "A concise, project-driven intro to React hooks, components, and state management for modern frontends.",
    category: "Frontend",
    level: "Intermediate",
    duration: "2 days",
    date: "Sat–Sun, 10am–4pm",
    spotsLeft: 12
  },
  {
    title: "UX Essentials for Developers",
    description: "Learn layout, typography, and interaction design principles to make your apps feel polished and intuitive.",
    category: "Design",
    level: "Beginner",
    duration: "3 hours",
    date: "30 Mar, 6–9pm",
    spotsLeft: 20
  },
  {
    title: "APIs with Node & Express",
    description: "Design and build a RESTful API with authentication, validation, and clean project structure.",
    category: "Backend",
    level: "Intermediate",
    duration: "4 hours",
    date: "2 Apr, 3–7pm",
    spotsLeft: 15
  },
  {
    title: "Git & GitHub for Collaboration",
    description: "Master branches, pull requests, and workflows so you can contribute confidently to real-world projects.",
    category: "Tools",
    level: "Beginner",
    duration: "2 hours",
    date: "4 Apr, 5–7pm",
    spotsLeft: 30
  },
  {
    title: "Data Visualization with Python",
    description: "Use pandas and popular plotting libraries to turn raw data into clear, compelling visuals.",
    category: "Data",
    level: "Intermediate",
    duration: "3 hours",
    date: "6 Apr, 4–7pm",
    spotsLeft: 16
  },
  {
    title: "Personal Portfolio in a Day",
    description: "Plan and build a clean, responsive portfolio that properly showcases your projects and story.",
    category: "Career",
    level: "Beginner",
    duration: "1 day",
    date: "10 Apr, 10am–5pm",
    spotsLeft: 10
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: "skillnest" });
    console.log("Connected to MongoDB");

    await Course.deleteMany({});
    console.log("Cleared existing courses");

    const inserted = await Course.insertMany(mockCourses);
    console.log(`Inserted ${inserted.length} mock courses.`);
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

seed();

