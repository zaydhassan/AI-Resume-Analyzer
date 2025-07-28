import React from "react";
import Navbar from "~/components/Navbar";
import { FaRobot } from "react-icons/fa";

export default function About() {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(120deg,#eef6fc 0%,#e2fbf9 55%,#e4f4fb 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blurred Gradient Shapes for Depth */}
        <div
          style={{
            position: "absolute",
            left: "-120px",
            top: "50px",
            width: "330px",
            height: "330px",
            background: "radial-gradient(circle,#5edde658 80%,#ffffff00 95%)",
            filter: "blur(26px)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-90px",
            bottom: "-90px",
            width: "270px",
            height: "270px",
            background: "radial-gradient(circle,#76aee655 70%,#ffffff00 100%)",
            filter: "blur(32px)",
            zIndex: 0,
          }}
        />
        {/* Animated About Card */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            background: "rgba(255,255,255,0.72)",
            boxShadow: "0 10px 46px 0 rgba(73,97,180,0.13)",
            borderRadius: "26px",
            maxWidth: "720px",
            width: "100%",
            padding: "3.5rem 2.1rem 2.5rem 2.1rem",
            textAlign: "center",
            backdropFilter: "blur(9px)",
            animation: "fadeInUp 0.87s cubic-bezier(.7,1.8,.4,.98) 0.05s both",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "inline-block",
                background: "linear-gradient(60deg,#5edde6 30%,#299eef 100%)",
                borderRadius: "100%",
                padding: "0.6rem 0.8rem",
                boxShadow: "0 4px 18px #5edde624",
              }}
            >
              <FaRobot color="#fff" size={40} />
            </div>
          </div>
          <h1
            style={{
              fontSize: "2.55rem",
              fontWeight: "900",
              color: "#2d2e40",
              marginBottom: "0.6rem",
              letterSpacing: "0.03em",
            }}
          >
            About <span style={{ color: "#299eef" }}>CVault</span>
          </h1>
          <p
            style={{
              fontSize: "1.27rem",
              fontWeight: "700",
              color: "#5edde6",
              marginBottom: "1.45rem",
              lineHeight: "1.7",
            }}
          >
            Automate your hiring. Discover the best candidates. Let AI work for you.
          </p>
          <div
            style={{
              fontSize: "1.09rem",
              color: "#2d2e40",
              lineHeight: "1.78",
              marginBottom: "1.35rem"
            }}
          >
           CVault empowers recruiters to post jobs, upload résumés, and instantly analyze candidates with advanced scoring and matching—all in a fast, intuitive workspace designed for efficiency. Our platform brings together AI-driven feedback, candidate-job fit analytics, and streamlined team collaboration in a beautifully simple UI.
          </div>
          <div
            style={{
              marginTop: "2.1rem",
              textAlign: "center",
            }}
          >
            <button
              style={{
                background: "linear-gradient(90deg, #5edde6 0%, #299eef 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "22px",
                fontWeight: 700,
                fontSize: "1.1rem",
                padding: "0.92rem 2.3rem",
                cursor: "pointer",
                boxShadow: "0 2px 12px #299eef26",
                transition: "box-shadow 0.18s, transform 0.18s",
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = "0 7px 24px #299eef26";
                e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = "0 2px 12px #299eef26";
                e.currentTarget.style.transform = "";
              }}
            >
              Explore Features
            </button>
          </div>
        </div>
        <style>
          {`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(36px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </div>
    </>
  );
}
