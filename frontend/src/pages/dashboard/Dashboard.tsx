import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function Dashboard() {
  const [books, setBooks] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    fetch(`${API}/bookshop`).then((r) => r.json()).then(setBooks);
    fetch(`${API}/pos/sales`).then((r) => r.json()).then(setSales);
    fetch(`${API}/accounts/summary`).then((r) => r.json()).then(setSummary);
  }, []);

  const today = new Date().toDateString();
  const todaySales = sales.filter((s) => new Date(s.createdAt).toDateString() === today);
  const todayTotal = todaySales.reduce((sum, s) => sum + s.total, 0);

  // Sales performance: last 7 sales, oldest to newest
  const recent = sales.slice(-7);
  const maxTotal = Math.max(...recent.map((s) => s.total), 1);
  const chartWidth = 700;
  const chartHeight = 180;
  const points = recent.map((s, i) => {
    const x = recent.length > 1 ? (i / (recent.length - 1)) * chartWidth : chartWidth / 2;
    const y = chartHeight - (s.total / maxTotal) * (chartHeight - 30) - 15;
    return `${x},${y}`;
  }).join(' ');

  // Low stock: books with stock under 5
  const lowStock = books.filter((b) => b.stock < 5);

  // Top selling products: aggregate quantity sold per bookId across all sales
  const soldMap: Record<number, { qty: number; revenue: number }> = {};
  sales.forEach((s) => {
    s.items?.forEach((item: any) => {
      if (!soldMap[item.bookId]) soldMap[item.bookId] = { qty: 0, revenue: 0 };
      soldMap[item.bookId].qty += item.quantity;
      soldMap[item.bookId].revenue += item.price * item.quantity;
    });
  });
  const topProducts = Object.entries(soldMap)
    .map(([bookId, data]) => {
      const book = books.find((b) => b.id === Number(bookId));
      return { name: book?.title || `Book #${bookId}`, ...data };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div>
      <div className="topbar">
        <h2>Good morning, Administrator</h2>
        <span className="date">One control center for sales, stock, finance, people and customers.</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Today's Sales</h3><p>${todayTotal.toLocaleString()}</p></div>
          <div className="card"><h3>Gross Profit</h3><p>${(summary.profit || 0).toLocaleString()}</p></div>
          <div className="card"><h3>Transactions</h3><p>{sales.length}</p></div>
          <div className="card"><h3>Receivables</h3><p style={{ fontSize: 15, color: '#a39d8c' }}>Not yet tracked</p></div>
        </div>

        <div className="dashboard-row">
          <div className="panel chart-panel">
            <h3>Sales Performance</h3>
            {recent.length > 1 ? (
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height={chartHeight}>
                <polyline points={points} fill="none" stroke="#6d1130" strokeWidth="3" />
                {recent.map((s, i) => {
                  const x = (i / (recent.length - 1)) * chartWidth;
                  const y = chartHeight - (s.total / maxTotal) * (chartHeight - 30) - 15;
                  return <circle key={s.id} cx={x} cy={y} r="5" fill="#6d1130" />;
                })}
              </svg>
            ) : (
              <p style={{ color: '#a39d8c', fontSize: 14 }}>Not enough sales yet to show a trend.</p>
            )}
          </div>

          <div className="panel alerts-panel">
            <h3>Control Alerts</h3>
            <div className="alert-item">
              Low stock {lowStock.length > 0 && <span className="alert-badge">{lowStock.length}</span>}
            </div>
            <div className="alert-item muted">Overdue credit — Not yet tracked</div>
            <div className="alert-item muted">Payroll due — Not yet tracked</div>
            <div className="alert-item muted">Cash variance — Not yet tracked</div>
          </div>
        </div>

        <div className="table-card">
          <h3 style={{ paddingTop: 16 }}>Top Selling Products</h3>
          <table className="burgundy-table">
            <thead><tr><th>Product</th><th>Units</th><th>Revenue</th></tr></thead>
            <tbody>
              {topProducts.length > 0 ? topProducts.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.qty}</td>
                  <td>${p.revenue.toLocaleString()}</td>
                </tr>
              )) : (
                <tr><td colSpan={3} style={{ color: '#a39d8c' }}>No sales recorded yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}