import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../App.jsx";
import { useToast } from "../components/ToastProvider.jsx";

const emptyCourse = {
  title: "",
  description: "",
  category: "",
  level: "Beginner",
  duration: "",
  date: "",
  spotsLeft: 0
};

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCourse);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(res.data);
    } catch {
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const startCreate = () => {
    setEditing(null);
    setForm(emptyCourse);
  };

  const startEdit = (course) => {
    setEditing(course._id);
    setForm({
      title: course.title || "",
      description: course.description || "",
      category: course.category || "",
      level: course.level || "Beginner",
      duration: course.duration || "",
      date: course.date || "",
      spotsLeft: course.spotsLeft || 0
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "spotsLeft" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError("");
      if (editing) {
        await axios.put(`${API_BASE_URL}/courses/${editing}`, form);
        showToast("Course updated.", "success");
      } else {
        await axios.post(`${API_BASE_URL}/courses`, form);
        showToast("Course created.", "success");
      }
      await loadCourses();
      setEditing(null);
      setForm(emptyCourse);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save course.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/courses/${id}`);
      await loadCourses();
      showToast("Course deleted.", "info");
    } catch {
      setError("Failed to delete course.");
      showToast("Failed to delete course.", "error");
    }
  };

  return (
    <section>
      <h2>Admin – Manage Courses</h2>
      {error && <p className="error-text">{error}</p>}

      <div className="admin-layout">
        <form className="course-form" onSubmit={handleSubmit}>
          <h3>{editing ? "Edit course" : "Create new course"}</h3>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label className="field-span-2">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              required
            />
            <span className="field-help">
              This appears on the course list and detail page. Focus on what someone will
              actually be able to do after attending.
            </span>
          </label>
          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange} />
            <span className="field-help">e.g. Web, Data, Design, Career</span>
          </label>
          <label>
            Level
            <select name="level" value={form.level} onChange={handleChange}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <span className="field-help">Used as a chip on the course card.</span>
          </label>
          <label>
            Duration
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g. 2 hours, 2 days"
            />
            <span className="field-help">Shown on both the list and detail views.</span>
          </label>
          <label>
            Date
            <input
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="e.g. 24 Mar, 6–8pm"
            />
            <span className="field-help">Free text – use something your students understand.</span>
          </label>
          <label>
            Spots left
            <input
              type="number"
              name="spotsLeft"
              value={form.spotsLeft}
              onChange={handleChange}
              min={0}
            />
            <span className="field-help">
              Controls the &quot;spots left&quot; label on cards and detail pages.
            </span>
          </label>
          <div className="form-actions field-span-2">
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : editing ? "Update course" : "Create course"}
            </button>
            {!editing && (
              <button type="button" className="btn-secondary" onClick={startCreate}>
                Reset
              </button>
            )}
          </div>
        </form>

        <div className="admin-course-list">
          <h3>Existing courses</h3>
          {loading && <p>Loading courses...</p>}
          {!loading && courses.length === 0 && <p>No courses yet.</p>}
          {courses.map((course) => (
            <div className="card" key={course._id}>
              <h4>{course.title}</h4>
              <p>{course.description}</p>
              <p className="meta">
                {course.category && <span>{course.category}</span>}
                {course.level && <span>{course.level}</span>}
                {course.duration && <span>{course.duration}</span>}
                <span>{course.spotsLeft ?? 0} spots left</span>
              </p>
              <div className="card-actions">
                <button className="btn-secondary" onClick={() => startEdit(course)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => handleDelete(course._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminCourses;

