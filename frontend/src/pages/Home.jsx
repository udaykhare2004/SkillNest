import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../App.jsx";
import { useToast } from "../components/ToastProvider.jsx";

const Home = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollingId, setEnrollingId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/courses`);
        setCourses(res.data);
      } catch {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) {
      setError("Please log in to enroll.");
      showToast("Log in to enroll in a course.", "warning");
      return;
    }
    try {
      setEnrollingId(courseId);
      setError("");
      await axios.post(`${API_BASE_URL}/courses/${courseId}/enroll`);
      showToast("You’re enrolled! Check your dashboard.", "success");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to enroll.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <section>
      <h1>Discover short courses & workshops</h1>
      <p className="subtitle">
        Bite-sized, practical sessions to level up your skills fast.
      </p>
      {error && <p className="error-text">{error}</p>}
      <div className="card-grid">
        {courses.map((course) => (
          <div className="card" key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p className="meta">
              {course.category && <span>{course.category}</span>}
              {course.level && <span>{course.level}</span>}
              {course.duration && <span>{course.duration}</span>}
            </p>
            <div className="card-actions">
              <Link to={`/courses/${course._id}`} className="btn-secondary">
                View details
              </Link>
              <button
                className="btn-primary"
                onClick={() => handleEnroll(course._id)}
                disabled={enrollingId === course._id}
              >
                {enrollingId === course._id ? "Enrolling..." : "Enroll"}
              </button>
            </div>
          </div>
        ))}
        {courses.length === 0 && <p>No courses yet. Check back soon!</p>}
      </div>
    </section>
  );
};

export default Home;

