type OrderCardProps = {
  icon: string;
  id: string;
  title: string;
  route: string;
  price: string;
  status: string;
  statusClass: string;
};

export default function OrderCard({
  icon,
  id,
  title,
  route,
  price,
  status,
  statusClass,
}: OrderCardProps) {
  return (
    <div className="order-card">
      <div className="order-icon-wrap">{icon}</div>

      <div className="order-info">
        <div className="order-id">{id}</div>
        <div className="order-title">{title}</div>
        <div className="order-route">{route}</div>
      </div>

      <div className="order-right">
        <div className="order-price">{price}</div>
        <span className={`status-badge ${statusClass}`}>{status}</span>
      </div>
    </div>
  );
}
