import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function ClientPortal() {
  const [clients, setClients] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API}/clients`).then((r) => r.json()).then(setClients);
    fetch(`${API}/orders`).then((r) => r.json()).then(setOrders);
  }, []);

  const openOrders = orders.filter((o) => o.status === 'pending');

  const ACTIONS = [
    'Browse catalogue & price list',
    'Create / reorder purchases',
    'Track order & delivery',
    'View invoices & receipts',
    'Track credit & payments',
    'Support requests',
  ];

  return (
    <div>
      <div className="topbar">
        <h2>Client Portal</h2>
        <span className="date">Customer self-service overview</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Registered Customers</h3><p>{clients.length}</p></div>
          <div className="card"><h3>Open Orders</h3><p>{openOrders.length}</p></div>
          <div className="card"><h3>Credit Balance</h3><p style={{ fontSize: 15, color: '#a39d8c' }}>Not yet tracked</p></div>
          <div className="card"><h3>Portal Sales</h3><p style={{ fontSize: 15, color: '#a39d8c' }}>Not yet tracked</p></div>
        </div>

        <div className="dashboard-row">
          <div className="panel">
            <h3>Customer Account</h3>
            <div className="account-row"><span>Profile</span><strong style={{ color: '#a39d8c' }}>Not yet tracked</strong></div>
            <div className="account-row"><span>Saved addresses</span><strong style={{ color: '#a39d8c' }}>Not yet tracked</strong></div>
            <div className="account-row"><span>Credit limit</span><strong style={{ color: '#a39d8c' }}>Not yet tracked</strong></div>
            <div className="account-row"><span>Available credit</span><strong style={{ color: '#a39d8c' }}>Not yet tracked</strong></div>
            <div className="account-row"><span>Loyalty points</span><strong style={{ color: '#a39d8c' }}>Not yet tracked</strong></div>
          </div>

          <div className="panel">
            <h3>Self-Service Actions</h3>
            <div className="pill-list">
              {ACTIONS.map((a) => (
                <button key={a} className="pill-btn" onClick={() => alert('Coming soon')}>{a}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="action" onClick={() => alert('Portal login coming soon')}>Open Portal</button>
          <button className="action" style={{ background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={() => alert('Portal settings coming soon')}>
            Portal Settings
          </button>
        </div>
      </div>
    </div>
  );
}