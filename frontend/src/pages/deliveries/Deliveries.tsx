import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const STAGES = ['Confirmed', 'Picked', 'Dispatched', 'Out'];

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState('');
  const [driver, setDriver] = useState('');
  const [eta, setEta] = useState('');

  const load = () => fetch(`${API}/deliveries`).then((r) => r.json()).then(setDeliveries);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setCustomer(''); setDriver(''); setEta('');
    setShowForm(false);
  };

  const saveDelivery = async () => {
    if (!customer.trim() || !driver.trim() || !eta) {
      alert('Please fill in all fields before saving.');
      return;
    }
    await fetch(`${API}/deliveries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer, driver, eta, status: 'Preparing', proof: '—' }),
    });
    resetForm();
    load();
  };


  const todayCount = deliveries.length; // all entries count as "today" since there's no separate date field yet

  return (
    <div>
      <div className="topbar">
        <h2>Deliveries</h2>
        <span className="date">Delivery board and tracking</span>
      </div>
      <div className="page-body">
        <div className="products-actionbar">
          <button className="action" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : '+ New Delivery'}
          </button>
          <span className="filter-pill">Today: {todayCount}</span>
        </div>

        {showForm && (
          <div className="form-card">
            <label>Customer</label>
            <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
            <label>Driver</label>
            <input value={driver} onChange={(e) => setDriver(e.target.value)} />
            <label>ETA</label>
            <input type="time" value={eta} onChange={(e) => setEta(e.target.value)} />
            <button className="action" onClick={saveDelivery}>Save Delivery</button>
            <button className="action" style={{ background: '#999', marginLeft: 8 }} onClick={resetForm}>Cancel</button>
          </div>
        )}

        <div className="table-card">
          <h3 style={{ paddingTop: 16 }}>Delivery Board</h3>
          <table className="burgundy-table">
            <thead>
              <tr><th>Delivery</th><th>Customer</th><th>Driver</th><th>ETA</th><th>Status</th><th>Proof</th></tr>
            </thead>
            <tbody>
              {deliveries.length > 0 ? deliveries.map((d) => (
                <tr key={d.id}>
                  <td>{d.deliveryNo}</td>
                  <td>{d.customer}</td>
                  <td>{d.driver}</td>
                  <td>{d.eta}</td>
                  <td>
                    <span className={`status-badge ${d.status === 'Delivered' ? 'healthy' : 'low'}`}>{d.status}</span>
                  </td>
                  <td>{d.proof}</td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ color: '#a39d8c' }}>No deliveries yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="dashboard-row" style={{ marginTop: 24 }}>
          <div className="panel">
            <h3>Tracking Timeline</h3>
            <div className="timeline-track">
              {STAGES.map((s, i) => (
                <div key={s} className="timeline-step">
                  <div className="timeline-dot" />
                  {i < STAGES.length - 1 && <div className="timeline-line" />}
                </div>
              ))}
            </div>
            <div className="timeline-labels">
              {STAGES.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>

          <div className="panel">
            <h3>Delivery KPIs</h3>
            <div className="account-row"><span>On-time rate</span><strong style={{ color: '#a39d8c' }}>Pending</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}