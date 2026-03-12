import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../App.jsx";
import { useToast } from "../components/ToastProvider.jsx";

const CourseDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/courses/${id}`);
        setCourse(res.data);
      } catch {
        setError("Could not load this course.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      showToast("Log in to enroll in this course.", "warning");
      navigate("/login");
      return;
    }

    try {
      setEnrolling(true);
      setError("");
      await axios.post(`${API_BASE_URL}/courses/${id}/enroll`);
      showToast("You’re enrolled! Find it in your dashboard.", "success");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to enroll.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <p>Loading course...</p>;
  }

  if (!course) {
    return <p className="error-text">{error || "Course not found."}</p>;
  }

  return (
    <section className="course-detail">
      <button className="btn-secondary" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="course-detail-header">
        <h1>{course.title}</h1>
        <p className="subtitle">{course.description}</p>
        <div className="meta">
          {course.category && <span>{course.category}</span>}
          {course.level && <span>{course.level}</span>}
          {course.duration && <span>{course.duration}</span>}
          {course.date && <span>{course.date}</span>}
          <span>{course.spotsLeft ?? 0} spots left</span>
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="course-detail-actions">
          <button className="btn-primary" onClick={handleEnroll} disabled={enrolling}>
            {enrolling ? "Enrolling..." : "Enroll in this course"}
          </button>
        </div>
      </div>

      <div className="course-detail-body">
        <div>
          <h3>What you&apos;ll do</h3>
          <p>
            This session is designed to be practical from the first 10 minutes. Expect
            live walkthroughs, guided exercises, and short implementation breaks where
            you apply each concept on your own machine.
          </p>
          <p>
            By the end, you&apos;ll have a small but complete piece of work – such as a
            mini project, case study, or code sample – that you can reference in future
            interviews and applications.
          </p>
        </div>
        <div>
          <h3>Who this is for</h3>
          <p>
            Students and early professionals who want to quickly build job-relevant
            skills without committing to a long bootcamp. You&apos;ll get the right
            amount of theory to feel confident, but the focus is on doing.
          </p>
          <p>
            If you&apos;re comfortable following along with step-by-step instructions
            and asking questions when you get stuck, you&apos;ll be a great fit for this
            workshop.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;

