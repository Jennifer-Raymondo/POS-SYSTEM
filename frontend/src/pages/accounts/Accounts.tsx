import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function Accounts() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const load = () => {
    fetch(`${API}/accounts`).then((r) => r.json()).then(setTransactions);
    fetch(`${API}/accounts/summary`).then((r) => r.json()).then(setSummary);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!amount || Number(amount) <= 0 || !note.trim()) {
      alert('Please fill in a valid amount and a note before adding.');
      return;
    }
    await fetch(`${API}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, amount: Number(amount), note }),
    });
    setAmount(''); setNote(''); setShowForm(false);
    load();
  };

  const cashAndBank = (summary.income || 0) - (summary.expense || 0);

  return (
    <div>
      <div className="topbar">
        <h2>Accounts</h2>
        <span className="date">Financial overview</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Cash &amp; Bank</h3><p>${cashAndBank.toLocaleString()}</p></div>
          <div className="card"><h3>Payables</h3><p style={{ fontSize: 15, color: '#a39d8c' }}>Not yet tracked</p></div>
          <div className="card"><h3>Receivables</h3><p style={{ fontSize: 15, color: '#a39d8c' }}>Not yet tracked</p></div>
          <div className="card"><h3>Net Position</h3><p>${(summary.profit || 0).toLocaleString()}</p></div>
        </div>

        <div className="products-actionbar">
          <button className="action" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : '+ Add Transaction'}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <label>Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label>Note</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} />
            <button className="action" onClick={add}>Add Transaction</button>
          </div>
        )}

        <div className="table-card">
          <h3 style={{ paddingTop: 16 }}>General Ledger Activity</h3>
          <table className="burgundy-table">
            <thead>
              <tr>
                <th>Date</th><th>Reference</th><th>Account</th><th>Debit</th><th>Credit</th><th>Source</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}</td>
                  <td>TX-{10000 + t.id}</td>
                  <td>{t.note || (t.type === 'income' ? 'Sales' : 'Expense')}</td>
                  <td>{t.type === 'expense' ? `$${t.amount.toLocaleString()}` : '—'}</td>
                  <td>{t.type === 'income' ? `$${t.amount.toLocaleString()}` : '—'}</td>
                  <td>Manual</td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ color: '#a39d8c' }}>No ledger activity yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="action" onClick={() => alert('Chart of Accounts coming soon')}>View Chart of Accounts</button>
          <button className="action" style={{ background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={() => alert('Period Close coming soon')}>
            Period Close
          </button>
        </div>
      </div>
    </div>
  );
}