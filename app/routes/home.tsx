import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  // Animate the resume counter
  useEffect(() => {
    let start = 0, end = resumes.length;
    if (end) {
      const duration = 650;
      const step = Math.ceil(end / (duration / 28));
      const animate = () => {
        start += step;
        setDisplayCount(start < end ? start : end);
        if (start < end) setTimeout(animate, 28);
      };
      animate();
    } else {
      setDisplayCount(0);
    }
  }, [resumes.length]);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    async function loadResumes() {
      setLoadingResumes(true);
      const data = await kv.list("resume:*", true);
      setResumes(data?.map((r) => ({ ...JSON.parse(r.value), id: r.key.split(":")[1] })) || []);
      setLoadingResumes(false);
    }
    loadResumes();
  }, [kv]);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#eaf6ff] via-[#e2fbf9] to-[#e1eaff] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Animated background blobs */}
      <div style={{
        position: "absolute", top: "60px", left: "-110px",
        width: "350px", height: "340px",
        background: "radial-gradient(circle,#5edde6 60%, #ffffff00 100%)",
        filter: "blur(32px)", zIndex: 0, borderRadius: "42%",
        animation: "floatBlob 11s ease-in-out infinite alternate"
      }} />
      <div style={{
        position: "absolute", right: "-90px", bottom: "-80px",
        width: "260px", height: "260px",
        background: "radial-gradient(circle,#22395dea 80%,#ffffff00 100%)",
        filter: "blur(37px)", zIndex: 0, borderRadius: "42%",
        animation: "floatBlob2 13s ease-in-out infinite alternate"
      }} />

      <Navbar />

      <main className="z-10 w-full flex flex-col items-center justify-center px-5" style={{ position: "relative", minHeight: "90vh" }}>
        {/* Hero Headline */}
        <h1
          style={{
            fontSize: "3.2rem",
            fontWeight: 900,
            textAlign: "center",
            marginBottom: "2.1rem",
            marginTop: "2.2rem",
            letterSpacing: ".01em",
            lineHeight: 1.1,
            color: "#222a33"
          }}
        >
          Track Your{" "}
          <span style={{
            background: "linear-gradient(90deg,#363d4d 30%,#0d2347 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 20px #222a3350"
          }}>Applications</span>
          <span style={{
            background: "linear-gradient(93deg,#23293a 20%,#2a3c56 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}> &amp; </span>
          <span style={{
            background: "linear-gradient(110deg,#2a3c56 55%, #161b21 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>Resume Ratings</span>
        </h1>

        {/* Glassmorphic Stat Card */}
        <section
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1.2px solid #22395d33",
            borderRadius: "2rem",
            boxShadow: "0 10px 42px rgba(100,180,240,0.17) inset,0 12px 32px #4f8eb222",
            backdropFilter: "blur(13px)",
            padding: "2rem 2.5rem",
            width: "80%",
            maxWidth: "420px",
            margin: "0 auto 2.2rem auto",
            textAlign: "center",
            zIndex: 2
          }}
        >
          <div
            style={{
              fontSize: "2.2rem",
              background: "linear-gradient(90deg, #202838 10%, #2748a6 92%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              marginBottom: "2px"
            }}
          >
            {displayCount}
          </div>
          <div
            style={{
              background: "linear-gradient(93deg,#363d4d 10%,#1d2636 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.15rem",
              fontWeight: "600",
              marginBottom: ".7em"
            }}
          >
            Resumes Uploaded
          </div>
          {resumes.length > 0 && (
            <span style={{
              animation: "badgePulse 1.8s infinite alternate",
              background: "linear-gradient(90deg, #222a33 14%, #70a0c4 95%)",
              color: "#fff",
              fontWeight: 700,
              padding: "0.44rem 1.3rem",
              borderRadius: "99px",
              boxShadow: "0 0 12px #37496c33",
              fontSize: "1rem"
            }}>
              AI Feedback Active
            </span>
          )}
        </section>

        {/* Empty State / Loader / Resume List */}
        {!loadingResumes && resumes.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-7 animate-fadein">
            <svg width="108" height="108" viewBox="0 0 120 120" className="mb-5">
              <ellipse cx="60" cy="60" rx="49" ry="44" fill="#25335744" />
              <ellipse cx="60" cy="91" rx="30" ry="7" fill="#e0e5efaa"/>
              <rect x="36" y="52" width="48" height="18" rx="6" fill="#e5eaf9"/>
            </svg>
            <p style={{
              fontSize: "1.18rem",
              color: "#26304a",
              fontWeight: "bold",
              marginBottom: "5px"
            }}>
              No resumes yet.<br/>Your professional journey starts here.
            </p>
            <p style={{
              fontSize: "1rem",
              color: "#576e8f",
              fontStyle: "italic"
            }}>
              Pro Tip: Upload for instant expert feedback!
            </p>
          </div>
        ) : (
          <p style={{
            color: "#253357",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "1.6rem"
          }}>
            Review your submissions and check AI-powered feedback.
          </p>
        )}

        {loadingResumes && (
          <div style={{ marginTop: "2.3rem" }}>
            <svg width="36" height="36" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#253357bb"
                strokeWidth="4"
                strokeDasharray="71"
                strokeDashoffset="10"
                strokeLinecap="round"
                style={{ animation: "spin 0.8s linear infinite" }}
              />
            </svg>
          </div>
        )}

        {resumes.length > 0 && (
          <div
            className="flex flex-row gap-6 overflow-x-auto py-2 px-1"
            style={{
              width: "100%",
              maxWidth: "100vw",
              scrollbarWidth: "thin",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {resumes.map((resume, idx) => (
              <div
                key={resume.id || idx}
                className="relative min-w-[305px] max-w-xs bg-white rounded-lg shadow p-4 flex-shrink-0"
                style={{
                  minWidth: 305,
                  maxWidth: 375,
                  background: "#fafdff",
                  borderRadius: "18px",
                  boxShadow: "0 1px 14px #c3def749",
                  position: "relative"
                }}
              >
                <ResumeCard resume={resume} />
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "3.3rem", marginBottom: "2rem" }}>
          {(!loadingResumes || resumes.length === 0) && (
            <Link to="/upload">
              <button
                style={{
                  background: "linear-gradient(90deg, #202838 14%, #2748a6 95%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.16rem",
                  borderRadius: "32px",
                  boxShadow: "0 6px 35px #222a3359",
                  padding: "1rem 2.7rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.11s, box-shadow 0.12s",
                  animation: "popUp 0.8s cubic-bezier(.55,1.3,.41,.98) both"
                }}
                onMouseDown={e => { e.currentTarget.style.transform='scale(.965)'; }}
                onMouseUp={e => { e.currentTarget.style.transform='scale(1)'; }}
              >
                Upload Resume
              </button>
            </Link>
          )}
        </div>
      </main>
      
      <style>
        {`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(33px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes popUp {
          0%   { opacity:0; transform:scale(0.88) translateY(32px);}
          80%  { opacity:1; transform:scale(1.055) translateY(-6px);}
          100% { opacity:1; transform:scale(1) translateY(0);}
        }
        @keyframes badgePulse {
          0% { box-shadow:0 0 10px #37496c77;}
          100% { box-shadow:0 0 22px #37496cbb;}
        }
        @keyframes floatBlob {
          0% { transform: scale(1) translateY(0px);}
          100% { transform: scale(.98,1.04) translateY(30px);}
        }
        @keyframes floatBlob2 {
          0% { transform: scale(1) translateX(0px);}
          100% { transform: scale(1.04,.96) translateX(-22px);}
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        `}
      </style>
    </div>
  );
}
