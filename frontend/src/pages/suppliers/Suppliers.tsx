import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const TERMS = ['15 Days', '30 Days', '45 Days', '60 Days'];
const RATINGS = ['A', 'A-', 'B+', 'B', 'B-', 'C'];

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [terms, setTerms] = useState('');
  const [balance, setBalance] = useState('');
  const [rating, setRating] = useState('');

  const load = () => fetch(`${API}/suppliers`).then((r) => r.json()).then(setSuppliers);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setName(''); setContact(''); setTerms(''); setBalance(''); setRating('');
    setShowForm(false);
  };

  const saveSupplier = async () => {
    if (!name.trim() || !contact.trim() || !terms || !balance || !rating) {
      alert('Please fill in all fields before saving.');
      return;
    }
    const payload = {
      name, contact, terms,
      balance: Number(balance),
      rating,
      lastPurchase: new Date().toISOString(),
    };
    if (editingId) {
      await fetch(`${API}/suppliers/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/suppliers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    resetForm();
    load();
  };

  const startEdit = (s: any) => {
    setEditingId(s.id);
    setName(s.name);
    setContact(s.contact);
    setTerms(s.terms);
    setBalance(String(s.balance));
    setRating(s.rating);
    setShowForm(true);
  };

  const deleteSupplier = async (id: number) => {
    if (!confirm('Delete this supplier?')) return;
    await fetch(`${API}/suppliers/${id}`, { method: 'DELETE' });
    load();
  };

  const filtered = suppliers.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.contact?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="topbar">
        <h2>Suppliers</h2>
        <span className="date">{suppliers.length} suppliers</span>
      </div>
      <div className="page-body">
        <div className="products-actionbar">
          <button className="action" onClick={() => { if (showForm) resetForm(); else setShowForm(true); }}>
            {showForm ? 'Close Form' : '+ Add Supplier'}
          </button>
          <input
            className="products-search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="filter-pill" onClick={() => alert('Filters coming soon')}>Filters</button>
          <button className="export-link" onClick={() => alert('Export coming soon')}>Export</button>
        </div>

        {showForm && (
          <div className="form-card">
            <label>Supplier Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>Contact</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} />
            <label>Terms</label>
            <select value={terms} onChange={(e) => setTerms(e.target.value)}>
              <option value="">Select terms</option>
              {TERMS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <label>Balance</label>
            <input value={balance} onChange={(e) => setBalance(e.target.value)} />
            <label>Rating</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="">Select rating</option>
              {RATINGS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button className="action" onClick={saveSupplier}>
              {editingId ? 'Update Supplier' : 'Save Supplier'}
            </button>
            <button className="action" style={{ background: '#999', marginLeft: 8 }} onClick={resetForm}>Cancel</button>
          </div>
        )}

        <div className="table-card">
          <table className="burgundy-table">
            <thead>
              <tr>
                <th>Supplier</th><th>Contact</th><th>Terms</th><th>Balance</th><th>Last Purchase</th><th>Rating</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.contact}</td>
                  <td>{s.terms}</td>
                  <td>${s.balance?.toLocaleString()}</td>
                  <td>{new Date(s.lastPurchase).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}</td>
                  <td>{s.rating}</td>
                  <td>
                    <button className="action" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => startEdit(s)}>Edit</button>
                    <button className="action" style={{ padding: '4px 10px', fontSize: 12, background: '#a33', marginLeft: 6 }} onClick={() => deleteSupplier(s.id)}>Delete</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} style={{ color: '#a39d8c' }}>No suppliers yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}