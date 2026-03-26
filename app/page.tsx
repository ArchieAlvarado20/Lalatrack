"use client";
import Link from "next/link";
import "@/app/ui/auth/Login.css";
import { useState, useEffect } from "react";
import { subscribeUser, unsubscribeUser, sendNotification } from "./actions";

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
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
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
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  );
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />

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
    </div>
  );
}
