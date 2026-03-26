import OrderCard from "./OrderCard";

export default function RecentOrders() {
  return (
    <>
      <div className="section-header">
        <div className="section-title">Recent Orders</div>
      </div>

      <OrderCard
        icon="📦"
        id="#LLM-20483"
        title="Documents & Files"
        route="📍 Makati → Taguig"
        price="₱185"
        status="● Active"
        statusClass="status-active"
      />

      <OrderCard
        icon="🛍️"
        id="#LLM-20479"
        title="Shopee Parcels (3)"
        route="📍 Quezon City → Pasig"
        price="₱240"
        status="✓ Done"
        statusClass="status-done"
      />

      <OrderCard
        icon="🛍️"
        id="#LLM-20479"
        title="Shopee Parcels (3)"
        route="📍 Quezon City → Pasig"
        price="₱240"
        status="✓ Done"
        statusClass="status-done"
      />
    </>
  );
}
