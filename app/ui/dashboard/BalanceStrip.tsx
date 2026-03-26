import "@/app/ui/dashboard/BalanceStrip.css";

export default function BalanceStrips() {
  return (
    <div className="balance-strip">
      <div className="balance-item">
        <div className="balance-label">Earnings</div>
        <div className="balance-value orange">₱2,480</div>
        <div className="balance-sub">▲ 12% today</div>
      </div>
      <div className="balance-divider"></div>
      <div className="balance-item">
        <div className="balance-label">Expenses</div>
        <div className="balance-value orange">₱2,480</div>
        <div className="balance-sub">▲ 12% today</div>
      </div>
      <div className="balance-divider"></div>
      <div className="balance-item">
        <div className="balance-label">Rating</div>
        <div className="balance-value">4.9 ⭐</div>
        <div className="balance-sub" style={{ color: "var(--gray-400)" }}>
          {" "}
          Excellent{" "}
        </div>
      </div>
    </div>
  );
}
