import React, { useState } from "react";
import Navbar from "~/components/Navbar";

function Contact() {
  const [toast, setToast] = useState("");
  const ACCESS_KEY = "8aa9f81f-b272-474f-9903-219d15c24695";

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Make sure access_key field is set
    if (!formData.get("access_key")) {
      formData.append("access_key", ACCESS_KEY);
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      event.target.reset();
      setToast("Thank you! Your message was sent successfully.");
      setTimeout(() => setToast(""), 3500);
    } else {
      setToast(data.message || "Something went wrong. Please try again.");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: "#f6f8fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 1rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 700,
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 16px rgba(40,50,85,0.08)",
            padding: "2rem 2rem 1.7rem 2rem",
            border: "1px solid #e6e8eb",
            position: "relative",
          }}
        >
            {toast && (
            <div style={toastStyleTop}>
              {toast}
            </div>
          )}

          <h2
            style={{
              textAlign: "center",
              fontSize: "1.65rem",
              fontWeight: 800,
              marginBottom: "1.1rem",
              color: "#243054",
              letterSpacing: ".008em",
            }}
          >
            Contact Us
          </h2>
          <form
            onSubmit={onSubmit}
            autoComplete="off"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <input type="hidden" name="access_key" value={ACCESS_KEY} />

            <label htmlFor="name" style={labelStyle}>Name</label>
            <input
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Your Name"
              id="name"
              style={inputStyle}
              aria-label="Your Name"
            />

            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Your Email"
              id="email"
              style={inputStyle}
              aria-label="Your Email"
            />

            <label htmlFor="message" style={labelStyle}>Message</label>
            <textarea
              name="message"
              required
              placeholder="How can we help?"
              id="message"
              rows={4}
              style={textareaStyle}
              aria-label="Your Message"
            />

            <button
              type="submit"
              style={buttonStyle}
              onMouseDown={e =>
                (e.currentTarget.style.background = "#205780")
              }
              onMouseUp={e =>
                (e.currentTarget.style.background = "#223158")
              }
            >
              Send Message
            </button>
          </form>
          <div
            style={{
              color: "#395078",
              marginTop: "1.15rem",
              textAlign: "center",
              fontSize: "0.95rem",
            }}
          >
            Or email us:{" "}
            <a
              href="mailto:zaydthirteen@gmail.com"
              style={{
                color: "#5566ad",
                textDecoration: "underline",
              }}
            >
              zaydthirteen@gmail.com
            </a>
          </div>
        </div>
        <style>
          {`
            @media (max-width: 550px) {
              div[style*="max-width: 420px"] {
                padding: 1.12rem 4vw 1.27rem 4vw !important;
              }
              h2 { font-size: 1.13rem !important; }
            }
            @keyframes fadeInSlideUp {
              from { opacity: 0; transform: translateY(18px) translateX(-50%) }
              to   { opacity: 1; transform: translateY(0) translateX(-50%) }
            }
          `}
        </style>
      </div>
    </>
  );
}

const labelStyle = {
  fontWeight: 600,
  color: "#223158",
  fontSize: ".98rem",
  marginBottom: 2,
};
const inputStyle = {
  padding: "0.7rem 1rem",
  borderRadius: "7px",
  border: "1px solid #dbe1ea",
  fontSize: "1rem",
  background: "#f8fafb",
};
const textareaStyle = {
  padding: "1rem",
  borderRadius: "7px",
  border: "1px solid #dbe1ea",
  fontSize: "1rem",
  background: "#f8fafb",
  resize: "vertical",
};
const buttonStyle = {
  background: "#223158",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1rem",
  borderRadius: "8px",
  padding: "0.9rem 0.3rem",
  marginTop: "1.2rem",
  border: "none",
  cursor: "pointer",
  transition: "background 0.13s",
};
const toastStyleTop = {
  position: "absolute",
  top: "1.2rem",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#223158",
  color: "#fff",
  borderRadius: "7px",
  fontWeight: 700,
  padding: "0.73rem 1.4rem",
  fontSize: ".97rem",
  boxShadow: "0 4px 14px #23235425",
  zIndex: 100,
  animation: "fadeInSlideDown 0.32s cubic-bezier(.55,1.8,.33,.86)",
};

export default Contact;
