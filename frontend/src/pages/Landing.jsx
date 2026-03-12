import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="landing-hero">
        <span className="badge">For students & early professionals</span>
        <h1>Grow faster with curated, bite-sized learning.</h1>
        <p className="subtitle">
          SkillNest connects you to focused short courses and workshops designed for
          busy students. Join small, live cohorts, learn by doing, and walk away with
          projects you can actually show.
        </p>
        <div className="landing-actions">
          <Link to="/courses" className="btn-primary">
            Explore courses
          </Link>
          <Link to="/register" className="btn-secondary">
            Create free account
          </Link>
        </div>
        <p className="landing-footnote">
          Live, instructor-led sessions. Practical projects. Clear outcomes for your CV
          and portfolio – without a months-long commitment.
        </p>
      </div>

      <div className="landing-grid">
        <div className="card">
          <h3>Hands-on, not theoretical</h3>
          <p>
            Every workshop is structured around building something tangible – shipping a
            mini app, designing a flow, or completing a focused data exercise.
          </p>
        </div>
        <div className="card">
          <h3>Curated mentors</h3>
          <p>
            Learn from engineers, designers, and data professionals who actively work in
            industry and share the patterns they use day to day.
          </p>
        </div>
        <div className="card">
          <h3>Weekend-friendly formats</h3>
          <p>
            High-intensity formats that fit evenings or weekends, so you can upskill
            alongside your semester, internship, or job.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;

