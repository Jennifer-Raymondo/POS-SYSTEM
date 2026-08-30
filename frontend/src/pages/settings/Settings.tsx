import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function Settings() {
  const [businessName, setBusinessName] = useState('');
  const [currency, setCurrency] = useState('');
  const [taxRate, setTaxRate] = useState('');

  useEffect(() => {
    fetch(`${API}/settings`).then((r) => r.json()).then((s) => {
      setBusinessName(s.businessName);
      setCurrency(s.currency);
      setTaxRate(String(s.taxRate));
    });
  }, []);

  const save = async () => {
    await fetch(`${API}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, currency, taxRate: Number(taxRate) }),
    });
    alert('Settings saved');
  };

  return (
    <div>
      <div className="topbar">
        <h2>System Settings</h2>
        <span className="date">Business configuration</span>
      </div>
      <div className="page-body">
        <div className="form-card">
          <label>Business Name</label>
          <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
          <label>Currency</label>
          <input value={currency} onChange={(e) => setCurrency(e.target.value)} />
          <label>Tax Rate (%)</label>
          <input value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
          <button className="action" onClick={save}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}