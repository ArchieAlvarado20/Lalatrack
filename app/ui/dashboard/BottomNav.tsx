import {
  FaMotorcycle,
  FaHome,
  FaFileInvoiceDollar,
  FaUserAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link href={"/dashboard"} className="nav-item active">
        <span className="nav-icon">
          <FaHome size={32} />
        </span>
        <span className="nav-label">Home</span>
      </Link>
      <Link href={"/rides"} className="nav-item">
        <span className="nav-icon">
          <FaMotorcycle size={32} />
        </span>
        <span className="nav-label">Rides</span>
      </Link>
      <div className="nav-item" style={{ flex: 0.8 }}>
        <div className="nav-fab">+</div>
      </div>
      <Link href={"/expenses"} className="nav-item">
        <span className="nav-icon">
          <FaFileInvoiceDollar size={32} />
        </span>
        <span className="nav-label">Expenses</span>
      </Link>
      <Link href={"/profile"} className="nav-item">
        <span className="nav-icon">
          <FaUserAlt size={32} />
        </span>
        <span className="nav-label">Profile</span>
      </Link>
    </nav>
  );
}
