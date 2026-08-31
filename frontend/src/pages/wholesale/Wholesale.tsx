import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const STAGES = ['Quotation', 'Confirmed', 'Picking', 'Delivered', 'Invoiced'];

export default function Wholesale() {
  const [orders, setOrders] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState('');
  const [value, setValue] = useState('');
  const [stage, setStage] = useState('');
  const [rep, setRep] = useState('');

  const load = () => fetch(`${API}/wholesale`).then((r) => r.json()).then(setOrders);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setCustomer(''); setValue(''); setStage(''); setRep('');
    setShowForm(false);
  };

  const saveOrder = async () => {
    if (!customer.trim() || !value || !stage || !rep.trim()) {
      alert('Please fill in all fields before saving.');
      return;
    }
    await fetch(`${API}/wholesale`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer, value: Number(value), stage, rep }),
    });
    resetForm();
    load();
  };

  const openQuotations = orders.filter((o) => o.stage === 'Quotation').length;
  const totalOrders = orders.length;
  const outstanding = orders
    .filter((o) => o.stage !== 'Invoiced')
    .reduce((sum, o) => sum + o.value, 0);
  const thisMonth = orders
    .filter((o) => new Date(o.createdAt).getMonth() === new Date().getMonth())
    .reduce((sum, o) => sum + o.value, 0);

  return (
    <div>
      <div className="topbar">
        <h2>Wholesale</h2>
        <span className="date">B2B accounts and order pipeline</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Open Quotations</h3><p>{openQuotations}</p></div>
          <div className="card"><h3>B2B Orders</h3><p>{totalOrders}</p></div>
          <div className="card"><h3>Outstanding</h3><p>${outstanding.toLocaleString()}</p></div>
          <div className="card"><h3>This Month</h3><p>${thisMonth.toLocaleString()}</p></div>
        </div>

        <div className="table-card">
          <h3 style={{ paddingTop: 16 }}>B2B Order Pipeline</h3>
          <table className="burgundy-table">
            <thead>
              <tr><th>Order</th><th>Customer</th><th>Value</th><th>Stage</th><th>Rep</th></tr>
            </thead>
            <tbody>
              {orders.length > 0 ? orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.orderNo}</td>
                  <td>{o.customer}</td>
                  <td>${o.value.toLocaleString()}</td>
                  <td>{o.stage}</td>
                  <td>{o.rep}</td>
                </tr>
              )) : (
                <tr><td colSpan={5} style={{ color: '#a39d8c' }}>No wholesale orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="form-card">
            <label>Customer</label>
            <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
            <label>Value</label>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <label>Stage</label>
            <select value={stage} onChange={(e) => setStage(e.target.value)}>
              <option value="">Select stage</option>
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <label>Rep</label>
            <input value={rep} onChange={(e) => setRep(e.target.value)} />
            <button className="action" onClick={saveOrder}>Save Quotation</button>
            <button className="action" style={{ background: '#999', marginLeft: 8 }} onClick={resetForm}>Cancel</button>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="action" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : 'New Quotation'}
          </button>
          <button className="action" style={{ background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={() => alert('Coming soon')}>
            Price Books
          </button>
        </div>
      </div>
    </div>
  );
}