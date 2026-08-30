import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function Accounts() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});
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
    setAmount(''); setNote('');
    load();
  };

  return (
    <div>
      <div className="topbar">
        <h2>Accounts</h2>
        <span className="date">Profit: {summary.profit || 0}</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Income</h3><p>{summary.income || 0}</p></div>
          <div className="card"><h3>Expense</h3><p>{summary.expense || 0}</p></div>
          <div className="card"><h3>Profit</h3><p>{summary.profit || 0}</p></div>
        </div>

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

        <div className="table-card">
          <table>
            <thead><tr><th>Type</th><th>Amount</th><th>Note</th></tr></thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}><td>{t.type}</td><td>{t.amount}</td><td>{t.note}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}