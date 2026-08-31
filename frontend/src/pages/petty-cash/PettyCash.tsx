import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function PettyCash() {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [fundBalance, setFundBalance] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');
  const [requestedBy, setRequestedBy] = useState('');

  const load = () => {
    fetch(`${API}/petty-cash`).then((r) => r.json()).then(setVouchers);
    fetch(`${API}/petty-cash/fund`).then((r) => r.json()).then((d) => setFundBalance(d.balance));
  };
  useEffect(() => { load(); }, []);

  const today = new Date().toDateString();
  const pending = vouchers.filter((v) => v.status === 'Pending').reduce((sum, v) => sum + v.amount, 0);
  const todaySpend = vouchers
    .filter((v) => new Date(v.date).toDateString() === today && v.status !== 'Pending')
    .reduce((sum, v) => sum + v.amount, 0);
  const available = fundBalance - vouchers.reduce((sum, v) => sum + v.amount, 0);

  const resetForm = () => {
    setPurpose(''); setAmount(''); setRequestedBy('');
    setShowForm(false);
  };

  const saveVoucher = async () => {
    if (!purpose.trim() || !amount || !requestedBy.trim()) {
      alert('Please fill in all fields before saving.');
      return;
    }
    await fetch(`${API}/petty-cash`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: new Date().toISOString(),
        purpose,
        amount: Number(amount),
        requestedBy,
      }),
    });
    resetForm();
    load();
  };

  const replenishFund = async () => {
    const amt = prompt('Enter amount to replenish the fund:');
    if (!amt || Number(amt) <= 0) return;
    await fetch(`${API}/petty-cash/replenish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Number(amt) }),
    });
    load();
  };

  return (
    <div>
      <div className="topbar">
        <h2>Petty Cash</h2>
        <span className="date">Fund register and vouchers</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Fund Balance</h3><p>${fundBalance.toLocaleString()}</p></div>
          <div className="card"><h3>Available</h3><p>${available.toLocaleString()}</p></div>
          <div className="card"><h3>Pending</h3><p>${pending.toLocaleString()}</p></div>
          <div className="card"><h3>Today Spend</h3><p>${todaySpend.toLocaleString()}</p></div>
        </div>

        <div className="table-card">
          <h3 style={{ paddingTop: 16 }}>Petty Cash Register</h3>
          <table className="burgundy-table">
            <thead>
              <tr><th>Voucher</th><th>Date</th><th>Purpose</th><th>Amount</th><th>Requested By</th><th>Status</th></tr>
            </thead>
            <tbody>
              {vouchers.length > 0 ? vouchers.map((v) => (
                <tr key={v.id}>
                  <td>{v.voucherNo}</td>
                  <td>{new Date(v.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}</td>
                  <td>{v.purpose}</td>
                  <td>${v.amount}</td>
                  <td>{v.requestedBy}</td>
                  <td>
                    <span className={`status-badge ${v.status === 'Pending' ? 'low' : 'healthy'}`}>{v.status}</span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ color: '#a39d8c' }}>No vouchers yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="form-card">
            <label>Purpose</label>
            <input value={purpose} onChange={(e) => setPurpose(e.target.value)} />
            <label>Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label>Requested By</label>
            <input value={requestedBy} onChange={(e) => setRequestedBy(e.target.value)} />
            <button className="action" onClick={saveVoucher}>Save Voucher</button>
            <button className="action" style={{ background: '#999', marginLeft: 8 }} onClick={resetForm}>Cancel</button>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="action" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : 'New Voucher'}
          </button>
          <button className="action" style={{ background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={replenishFund}>
            Replenish Fund
          </button>
        </div>

        <div className="principle-box" style={{ marginTop: 24 }}>
          <div className="principle-label">Control</div>
          <p className="principle-main">
            Every petty-cash payment requires a voucher, category, claimant, approval threshold and automatic ledger posting.
          </p>
        </div>
      </div>
    </div>
  );
}