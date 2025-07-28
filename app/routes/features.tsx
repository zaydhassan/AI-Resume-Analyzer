import React from "react";
import Navbar from "~/components/Navbar";
import { FaClipboardList, FaUpload, FaStar, FaUsers, FaChartBar, FaMobileAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaClipboardList color="#2d66c5" size={32} />,
    title: "Job Listings Board",
    desc: "Create and manage job postings in a central dashboard for effortless hiring."
  },
  {
    icon: <FaUpload color="#ea46b6" size={32} />,
    title: "Resume Upload & Storage",
    desc: "Securely upload, store, and access resumes in multiple formats instantly."
  },
  {
    icon: <FaStar color="#f38fc6" size={32} />,
    title: "AI Resume Evaluation",
    desc: "Get instant, AI-powered match scores and tailored improvement tips."
  },
  {
    icon: <FaUsers color="#0e4ac9" size={32} />,
    title: "Candidate-Job Matching",
    desc: "Automatically match and rank candidates based on skills and experience."
  },
  {
    icon: <FaChartBar color="#2d66c5" size={32} />,
    title: "Feedback & Reporting",
    desc: "Export feedback and analytics to boost your hiring team’s insights."
  },
  {
    icon: <FaMobileAlt color="#ea46b6" size={32} />,
    title: "Modern, Responsive UI",
    desc: "Enjoy a sleek, mobile-friendly experience with intuitive navigation."
  },
];

export default function Features() {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fbff",
          padding: "3rem 1rem",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 900, color: "#222", marginBottom: "0.5rem" }}>
            Powerful Features for <span style={{ color: "#f38fc6" }}>Recruiters</span>
          </h1>
          <p style={{ color: "#2d66c5", marginBottom: "2.7rem", fontSize: "1.15rem" }}>
            Everything you need to simplify, scale, and streamline your hiring process.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            {features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  border: "1px solid #e7eaf6",
                  borderRadius: "16px",
                  padding: "2rem 1.5rem",
                  boxSizing: "border-box",
                  textAlign: "left",
                  boxShadow: "0 2px 8px rgba(30,60,200,0.04)",
                  transition: "transform 0.12s, box-shadow 0.12s",
                  cursor: "default",
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
                  e.currentTarget.style.boxShadow = "0 4px 18px rgba(30,60,200,0.08)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(30,60,200,0.04)";
                }}
              >
                <div style={{ marginBottom: 18 }}>{feat.icon}</div>
                <h2 style={{ fontSize: "1.23rem", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#233077" }}>
                  {feat.title}
                </h2>
                <div style={{ color: "#2d2e40", fontSize: "1.03rem", lineHeight: 1.6 }}>
                  {feat.desc}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <button
              style={{
                background: "linear-gradient(90deg, #f38fc6 0%, #ea46b6 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "22px",
                fontWeight: 700,
                fontSize: "1.1rem",
                padding: "0.9rem 2.1rem",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(233, 70, 182, 0.09)",
                margin: "0 auto",
                display: "block",
              }}
            >
              Try It Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
