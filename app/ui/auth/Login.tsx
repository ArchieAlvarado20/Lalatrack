"use client";
import Link from "next/link";
import "@/app/ui/auth/Login.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
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
          Simple, elegant and efficient Rider Income Tracker
        </div>
      </div>

      <div className="login-form-wrap">
        {/* {error && (
          <div className="error-msg">
            ❌ Invalid email or password. Try again.
          </div>
        )} */}

        <label className="form-label">Email Address</label>
        <div className="input-row">
          <input
            className="form-input"
            id="inp-email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            style={{ marginTop: "1rem" }}
          />
          <span className="input-icon">✉️</span>
        </div>

        <label className="form-label">Password</label>
        <div className="input-row">
          <input
            className="form-input"
            id="inp-password"
            // type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />
          <span
            className="input-icon"
            // onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer", marginTop: "-.5rem" }}
          >
            {/* {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />} */}
          </span>
        </div>

        <a className="forgot-link">Forgot password?</a>

        <Link href="/dashboard">
          <button className="btn-primary">Sign In →</button>
        </Link>

        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">or continue with</span>
          <div className="divider-line"></div>
        </div>

        <div className="social-row">
          <button className="btn-social">
            <span className="btn-social-icon">
              <FcGoogle size={18} />
            </span>{" "}
            Google
          </button>
          <button className="btn-social">
            <span className="btn-social-icon">
              {" "}
              <FaApple size={18} />
            </span>{" "}
            Apple
          </button>
        </div>

        <div className="signup-row">
          Don{"'"}t have an account? <a>Sign Up Free</a>
        </div>
      </div>
    </div>
  );
}
