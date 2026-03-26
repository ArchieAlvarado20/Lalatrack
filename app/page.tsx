"use client";

import Link from "next/link";
import "@/app/ui/auth/Login.css";
import { useState, useEffect } from "react";
import {
  subscribeUser,
  unsubscribeUser,
  sendNotification,
} from "@/app/actions";

// Utility: convert Base64 string to Uint8Array (needed for VAPID key)
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Push Notification Manager Component
function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        ),
      });
      setSubscription(sub);
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);
    } catch (error) {
      console.error("Failed to subscribe:", error);
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
    }
  }

  async function sendTestNotification() {
    if (subscription && message.trim() !== "") {
      try {
        await sendNotification(message);
        setMessage("");
      } catch (error) {
        console.error("Failed to send notification:", error);
      }
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <section
      style={{
        backgroundColor: "#f96302",
        color: "#fff",
        fontWeight: "700",
        padding: "0.75rem 1.8rem",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        boxShadow: "0 4px 8px rgb(249 99 2 / 0.4)",
        transition: "background-color 0.3s ease",
        marginBottom: "1rem",
      }}
    >
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush} style={{ marginRight: "1rem" }}>
            Unsubscribe
          </button>
          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ marginRight: "1rem", padding: "0.3rem", width: "60%" }}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </section>
  );
}

// PWA Install Prompt Component
function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  // Don't show install prompt if app is already installed (standalone mode)
  if (isStandalone) return null;

  return (
    <section
      style={{
        borderRadius: "12px",
        marginBottom: "2rem",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgb(255 102 0 / 0.3)", // subtle orange shadow
        padding: "1.5rem 2rem",
        fontFamily: "'Inter', sans-serif",
        color: "#333",
      }}
    >
      <h3 style={{ color: "#f96302", marginBottom: "1rem", fontWeight: "700" }}>
        Install App
      </h3>

      <button
        onClick={() => {
          alert(
            "On Android devices, you will see an install prompt automatically. " +
              "On iOS, use the share button and then 'Add to Home Screen'.",
          );
        }}
        style={{
          backgroundColor: "#f96302",
          color: "#fff",
          fontWeight: "700",
          padding: "0.75rem 1.8rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          boxShadow: "0 4px 8px rgb(249 99 2 / 0.4)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#d75001")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#f96302")
        }
      >
        Add to Home Screen
      </button>

      {isIOS && (
        <p
          style={{
            fontSize: "0.85rem",
            marginTop: "1rem",
            color: "#666",
            lineHeight: 1.4,
            maxWidth: "320px",
          }}
        >
          To install this app on your iOS device, tap the share button{" "}
          <span role="img" aria-label="share icon">
            ⎋
          </span>{" "}
          and then "Add to Home Screen"{" "}
          <span role="img" aria-label="plus icon">
            ➕
          </span>
          .
        </p>
      )}
    </section>
  );
}

// Main Home Page Component
export default function Home() {
  return (
    <main style={{ maxWidth: 480, margin: "auto", padding: "1rem" }}>
      {/* Push Notification Manager and Install Prompt */}
      <PushNotificationManager />
      <InstallPrompt />

      {/* Main Content */}
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
    </main>
  );
}
