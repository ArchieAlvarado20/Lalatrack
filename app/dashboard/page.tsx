import Topbar from "@/app/ui/dashboard/Topbar";
import RecentOrders from "@/app/ui/dashboard/RecentOrders";
import BottomNav from "@/app/ui/dashboard/BottomNav";
import BalanceStrips from "@/app/ui/dashboard/BalanceStrip";
import "@/app/ui/dashboard/Dashboard.css";
import "@/app/ui/globals.css";

export default function Page() {
  return (
    <div className="screen">
      <Topbar />
      <BalanceStrips />

      <div className="dash-content">
        <RecentOrders />
      </div>
      <BottomNav />
    </div>
  );
}
