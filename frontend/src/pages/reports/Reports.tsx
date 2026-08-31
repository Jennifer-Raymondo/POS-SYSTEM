import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

const QUICK_REPORTS = ['Sales summary', 'Profit & margin', 'Inventory valuation', 'Customer aging', 'Payroll report', 'Tax report'];

export default function Reports() {
  const [sales, setSales] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    fetch(`${API}/pos/sales`).then((r) => r.json()).then(setSales);
    fetch(`${API}/accounts/summary`).then((r) => r.json()).then(setSummary);
  }, []);

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalUnits = sales.reduce((sum, s) => sum + (s.items?.reduce((a: number, i: any) => a + i.quantity, 0) || 0), 0);
  const avgBasket = sales.length > 0 ? totalRevenue / sales.length : 0;
  const grossMargin = totalRevenue > 0 ? ((summary.profit || 0) / totalRevenue) * 100 : 0;

  const maxRevenue = Math.max(totalRevenue, 1);
  const channels = [
    { label: 'POS', value: totalRevenue, tracked: true },
    { label: 'Wholesale', value: 0, tracked: false },
    { label: 'Portal', value: 0, tracked: false },
    { label: 'Other', value: 0, tracked: false },
  ];

  return (
    <div>
      <div className="topbar">
        <h2>Reports</h2>
        <span className="date">Business performance overview</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Gross Margin</h3><p>{grossMargin.toFixed(1)}%</p></div>
          <div className="card"><h3>Avg Basket</h3><p>${avgBasket.toFixed(2)}</p></div>
          <div className="card"><h3>Units Sold</h3><p>{totalUnits.toLocaleString()}</p></div>
          <div className="card"><h3>Payroll Cost</h3><p style={{ fontSize: 15, color: '#a39d8c' }}>Not yet tracked</p></div>
        </div>

        <div className="dashboard-row">
          <div className="panel">
            <h3>Business Performance</h3>
            {channels.map((c) => (
              <div key={c.label} className="channel-row">
                <span className="channel-label">{c.label}</span>
                <div className="channel-bar-track">
                  <div
                    className="channel-bar-fill"
                    style={{ width: c.tracked ? `${(c.value / maxRevenue) * 100}%` : '4%', opacity: c.tracked ? 1 : 0.3 }}
                  />
                </div>
                <span className="channel-value">
                  {c.tracked ? `$${c.value.toLocaleString()}` : 'Not tracked'}
                </span>
              </div>
            ))}
          </div>

          <div className="panel">
            <h3>Quick Reports</h3>
            <div className="pill-list">
              {QUICK_REPORTS.map((r) => (
                <button key={r} className="report-link" onClick={() => alert('Coming soon')}>{r}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}