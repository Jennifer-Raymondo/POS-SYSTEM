import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

const POSTING_RULES = [
  { event: 'POS Sale', debit: 'Cash / Bank', credit: 'Sales + Tax', posting: 'Automatic' },
  { event: 'Credit Sale', debit: 'Receivable', credit: 'Sales + Tax', posting: 'Automatic' },
  { event: 'Purchase Received', debit: 'Inventory', credit: 'Supplier Payable', posting: 'Automatic' },
  { event: 'Customer Payment', debit: 'Cash / Bank', credit: 'Receivable', posting: 'Automatic' },
  { event: 'Supplier Payment', debit: 'Payable', credit: 'Cash / Bank', posting: 'Automatic' },
  { event: 'Refund', debit: 'Returns / Tax', credit: 'Cash / Receivable', posting: 'Controlled' },
];

export default function Finance() {
  const [sales, setSales] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    fetch(`${API}/pos/sales`).then((r) => r.json()).then(setSales);
    fetch(`${API}/accounts/summary`).then((r) => r.json()).then(setSummary);
  }, []);

  const today = new Date().toDateString();
  const cashToday = sales
    .filter((s) => new Date(s.createdAt).toDateString() === today)
    .reduce((sum, s) => sum + s.total, 0);

  return (
    <div>
      <div className="topbar">
        <h2>Finance Control</h2>
        <span className="date">System-controlled financial operations, reconciliations and approvals</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Cash Today</h3><p>${cashToday.toLocaleString()}</p></div>
          <div className="card"><h3>Card / Mobile</h3><p style={{ fontSize: 15, color: '#a39d8c' }}>Not yet tracked</p></div>
          <div className="card"><h3>Expenses</h3><p>${(summary.expense || 0).toLocaleString()}</p></div>
          <div className="card"><h3>Receivables</h3><p style={{ fontSize: 15, color: '#a39d8c' }}>Not yet tracked</p></div>
        </div>

        <div className="table-card">
          <h3 style={{ paddingTop: 16 }}>Automated Accounting Engine</h3>
          <table className="burgundy-table">
            <thead>
              <tr><th>Business Event</th><th>Debit</th><th>Credit</th><th>Posting</th></tr>
            </thead>
            <tbody>
              {POSTING_RULES.map((r) => (
                <tr key={r.event}>
                  <td><strong>{r.event}</strong></td>
                  <td>Dr {r.debit}</td>
                  <td>Cr {r.credit}</td>
                  <td>{r.posting}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="principle-box">
          <div className="principle-label">Automation Principle</div>
          <p className="principle-main">Users execute approved business events; the system generates the accounting entries automatically.</p>
          <p className="principle-sub">Manual journal entries, backdating, deletion and direct ledger manipulation are restricted by permission.</p>
        </div>
      </div>
    </div>
  );
}