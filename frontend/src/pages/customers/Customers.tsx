import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const TYPES = ['Retail', 'Wholesale'];

export default function Customers() {
  const [clients, setClients] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');

  const load = () => fetch(`${API}/clients`).then((r) => r.json()).then(setClients);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setName(''); setEmail(''); setPhone(''); setType('');
    setShowForm(false);
  };

  const saveCustomer = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !type) {
      alert('Please fill in all fields before saving.');
      return;
    }
    if (editingId) {
      await fetch(`${API}/clients/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, type }),
      });
    } else {
      await fetch(`${API}/clients/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, type, password: 'temp123' }),
      });
    }
    resetForm();
    load();
  };

  const startEdit = (c: any) => {
    setEditingId(c.id);
    setName(c.name);
    setEmail(c.email);
    setPhone(c.phone || '');
    setType(c.type || '');
    setShowForm(true);
  };

  const deleteCustomer = async (id: number) => {
    if (!confirm('Delete this customer?')) return;
    await fetch(`${API}/clients/${id}`, { method: 'DELETE' });
    load();
  };

  const filtered = clients.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="topbar">
        <h2>Customers</h2>
        <span className="date">{clients.length} customers</span>
      </div>
      <div className="page-body">
        <div className="products-actionbar">
          <button className="action" onClick={() => { if (showForm) resetForm(); else setShowForm(true); }}>
            {showForm ? 'Close Form' : '+ Add Customer'}
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
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select type</option>
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button className="action" onClick={saveCustomer}>
              {editingId ? 'Update Customer' : 'Save Customer'}
            </button>
            <button className="action" style={{ background: '#999', marginLeft: 8 }} onClick={resetForm}>
              Cancel
            </button>
          </div>
        )}

        <div className="table-card">
          <table className="burgundy-table">
            <thead>
              <tr>
                <th>Customer</th><th>Type</th><th>Phone</th><th>Credit Limit</th><th>Balance</th><th>Loyalty</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.type || '—'}</td>
                  <td>{c.phone || '—'}</td>
                  <td style={{ color: '#a39d8c' }}>Not tracked</td>
                  <td style={{ color: '#a39d8c' }}>Not tracked</td>
                  <td style={{ color: '#a39d8c' }}>Not tracked</td>
                  <td>
                    <button className="action" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => startEdit(c)}>Edit</button>
                    <button className="action" style={{ padding: '4px 10px', fontSize: 12, background: '#a33', marginLeft: 6 }} onClick={() => deleteCustomer(c.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}