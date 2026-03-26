"use client";
import Link from "next/link";
import { useState } from "react";
import "@/app/ui/auth/login.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleRegister = () => {
    const email = (document.getElementById("inp-email") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("inp-password") as HTMLInputElement
    ).value;

    if (!email || !password) {
      setError(true);
    } else {
      setError(false);
      alert("Account created successfully!");
    }
  };

  return (
    <div className="screen">
      <div className="login-hero">
        <div className="brand-mark">
          <div className="brand-icon">L</div>
          <div className="brand-name">Lalatrack</div>
        </div>

        <div className="login-tagline">
          Start
          <br />
          <span>Your</span>
          <br />
          Journey.
        </div>

        <div className="login-sub">
          Create your account and begin tracking your income بسهولة
        </div>
      </div>

      <div className="login-form-wrap">
        {error && (
          <div className="error-msg">❌ Please fill in all fields.</div>
        )}

        <label className="form-label">Email Address</label>
        <div className="input-row">
          <input
            className="form-input"
            id="inp-email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
          />
          <span className="input-icon">✉️</span>
        </div>

        <label className="form-label">Password</label>
        <div className="input-row">
          <input
            className="form-input"
            id="inp-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
          />
          <span
            className="input-icon"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            👁️
          </span>
        </div>

        <Link href="/dashboard">
          <button className="btn-primary" onClick={handleRegister}>
            Sign Up →
          </button>
        </Link>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">or sign up with</span>
          <div className="divider-line"></div>
        </div>

        <div className="social-row">
          <button className="btn-social">
            <span className="btn-social-icon">🔵</span> Google
          </button>
          <button className="btn-social">
            <span className="btn-social-icon">🍎</span> Apple
          </button>
        </div>

        <div className="signup-row">
          Already have an account?{" "}
          <Link href="/">
            <a>Sign In</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
