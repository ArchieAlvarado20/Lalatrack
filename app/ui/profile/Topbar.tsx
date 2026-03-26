import "@/app/ui/globals.css";
import "@/app/ui/dashboard/Topbar.css";
import Link from "next/link";
import { FaBell, FaRegSun } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="dash-topbar">
      <div className="topbar-row">
        <div className="topbar-brand">
          <div className="topbar-logo">L</div>
          <div className="topbar-title">Lalatrack</div>
        </div>

        <div className="topbar-actions">
          <button className="topbar-btn">
            <FaBell size={18} />
            <span className="notif-dot"></span>
          </button>
          <button className="topbar-btn">
            <Link href="/auth/login">
              <FaRegSun />
            </Link>
          </button>
        </div>
      </div>

      <div className="greeting-block">
        <div className="greeting-small">Good morning,</div>
        <div className="greeting-name">Juan dela Cruz</div>
        <div className="greeting-status">
          <span className="status-dot-green"></span>
          Driver Online
        </div>
      </div>
    </div>
  );
}
