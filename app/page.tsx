"use client";
import Link from "next/link";
import "@/app/ui/auth/Login.css";

export default function Home() {
  return (
    <div className="screen">
      <div className="login-hero">
        <div className="brand-mark">
          <div className="brand-icon">L</div>
          <div className="brand-name">Lalatrack</div>
        </div>

        <div className="login-tagline">
          Track
          <br />
          <span>Your</span>
          <br />
          Income.
        </div>

        <div className="login-sub">
          Take control of your daily earnings with a simple, elegant, and
          powerful rider income tracker built for real-world hustle.
        </div>
      </div>

      <div className="login-form-wrap">
        <div className="login-sub2" style={{ marginBottom: "20px" }}>
          Whether you{"'"}re a delivery rider, motor-taxi rider, tnvs driver,
          freelancer, or side hustler <br /> — Lalatrack helps you monitor,
          analyze, and grow your income with ease.
        </div>

        <Link href="/auth/login">
          <button className="btn-primary">Get Started →</button>
        </Link>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">why choose Lalatrack</span>
          <div className="divider-line"></div>
        </div>

        <div className="social-row">
          <button className="btn-social">
            <span className="btn-social-icon">📊</span> Track Daily Earnings
          </button>
          <button className="btn-social">
            <span className="btn-social-icon">⚡</span> Fast & Simple UI
          </button>
        </div>

        <div className="signup-row">
          Start managing your income smarter — no complexity, just clarity.
        </div>
      </div>
    </div>
  );
}
