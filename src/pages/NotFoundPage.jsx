import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="section-wrap" style={{ paddingTop: "80px", paddingBottom: "80px", textAlign: "center", minHeight: "65vh" }}>
      <span style={{ fontSize: "70px" }}>🧭</span>
      <h1 style={{ fontSize: "36px", marginTop: "16px", color: "var(--ink)", fontFamily: "Nunito, sans-serif" }}>
        Page Not Found
      </h1>
      <p style={{ color: "var(--muted)", maxWidth: "420px", margin: "10px auto 28px", fontSize: "15px" }}>
        We couldn't find the page you were looking for. Let's get you back to discovering lovely gifts!
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="secondary-btn">
          <Home size={16} /> Back to Home
        </Link>
        <Link to="/products" className="primary-btn">
          Shop All Gifts <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
