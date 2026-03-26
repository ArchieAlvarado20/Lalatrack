import Topbar from "@/app/ui/rides/Topbar";
import BottomNav from "@/app/ui/dashboard/BottomNav";
import RecentOrders from "@/app/ui/dashboard/RecentOrders";

export default function Page() {
  return (
    <div className="screen">
      <Topbar />
      <div className="dash-content">
        <RecentOrders />
      </div>
      <BottomNav />
    </div>
  );
}
