import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../App.jsx";
import { useToast } from "../components/ToastProvider.jsx";

const Register = ({ onAuth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password
      });
      onAuth(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <h2>Create your SkillNest account</h2>
      <p className="subtitle">Join and start exploring practical workshops.</p>
      {error && <p className="error-text">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>
        <button className="btn-primary full-width" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </section>
  );
};

export default Register;

