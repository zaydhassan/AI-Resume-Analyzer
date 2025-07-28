import React, { useState } from "react";
import { Link } from "react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/features", label: "Features" },
  { to: "/contact", label: "Contact" },
  { to: "/upload", label: "Upload Resume" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <nav
      className="w-full z-20 h-16 flex items-center px-6 py-0"
      style={{
        background: "rgba(245,249,255,0.93)",
        boxShadow: "0 2px 18px #33d3ff0f",
        position: "relative",
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: 900,
          fontSize: "1.3rem",
          color: "#168da6",
          letterSpacing: ".07em",
          textDecoration: "none",
        }}
      >
        CVault
      </Link>

      <div
        className="ml-auto gap-7 items-center font-semibold text-slate-700 text-[1.05rem] hidden md:flex"
      >
        {navLinks.slice(1).map((l) => (
          <Link
            key={l.to}
            to={l.to}
            style={{
              marginLeft: "1.5rem",
              padding: ".5rem 0",
              color: "#0b2540",
              textDecoration: "none",
              transition: "color .18s",
            }}
            onClick={handleNavClick}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <button
        className="ml-auto flex md:hidden flex-col w-9 h-10 items-center justify-center"
        aria-label="Toggle navigation"
        style={{
          background: "none",
          border: "none",
          outline: "none",
          cursor: "pointer",
          zIndex: 50,
        }}
        onClick={() => setMobileOpen((v) => !v)}
      >

        <span
          style={{
            display: "block",
            width: 28,
            height: 4,
            borderRadius: 3,
            background: "#149eb2",
            margin: "4px 0",
            transition: "0.35s",
            transform: mobileOpen ? "rotate(45deg) translate(6px, 6px)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: 28,
            height: 4,
            borderRadius: 3,
            background: "#149eb2",
            margin: "4px 0",
            transition: "0.35s",
            opacity: mobileOpen ? "0" : "1",
          }}
        />
        <span
          style={{
            display: "block",
            width: 28,
            height: 4,
            borderRadius: 3,
            background: "#149eb2",
            margin: "4px 0",
            transition: "0.35s",
            transform: mobileOpen ? "rotate(-45deg) translate(6px, -6px)" : "none",
          }}
        />
      </button>

      <div
        style={{
          display: mobileOpen ? "flex" : "none",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(244, 250, 255, .98)",
          zIndex: 40,
          padding: "4.2rem 0 2rem",
          alignItems: "center",
          transition: "0.29s",
        }}
        className="md:hidden"
      >
        {navLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            style={{
              margin: "1.1rem 0",
              fontSize: "1.32rem",
              fontWeight: "700",
              textDecoration: "none",
              color: "#1787a7",
              letterSpacing: ".02em",
            }}
            onClick={handleNavClick}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
