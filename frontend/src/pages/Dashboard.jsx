import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../App.jsx";

const Dashboard = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/users/me`);
        setProfile(res.data);
      } catch {
        setError("Failed to load your dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <section>
      <h2>Hello, {user.name}</h2>
      {error && <p className="error-text">{error}</p>}
      <h3 className="mt-lg">Your enrolled courses</h3>
      <div className="card-grid">
        {profile?.enrolledCourses?.map((course) => (
          <div className="card" key={course._id}>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p className="meta">
              {course.category && <span>{course.category}</span>}
              {course.level && <span>{course.level}</span>}
              {course.duration && <span>{course.duration}</span>}
            </p>
          </div>
        ))}
        {(!profile?.enrolledCourses || profile.enrolledCourses.length === 0) && (
          <p>You haven&apos;t enrolled in any courses yet. Explore the home page to get started!</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;

