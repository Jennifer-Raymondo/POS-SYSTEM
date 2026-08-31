import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function Purchases() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [supplier, setSupplier] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState('');
  const [value, setValue] = useState('');

  const load = () => fetch(`${API}/purchases`).then((r) => r.json()).then(setPurchases);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setSupplier(''); setDate(''); setItems(''); setValue('');
    setShowForm(false);
  };

  const savePurchase = async () => {
    if (!supplier.trim() || !date || !items || !value) {
      alert('Please fill in all fields before saving.');
      return;
    }
    await fetch(`${API}/purchases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supplier, date, items: Number(items), value: Number(value) }),
    });
    resetForm();
    load();
  };

  const filtered = purchases.filter((p) =>
    p.supplier?.toLowerCase().includes(search.toLowerCase()) ||
    p.poNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="topbar">
        <h2>Purchasing</h2>
        <span className="date">Purchase orders, receiving and supplier invoices</span>
      </div>
      <div className="page-body">
        <div className="products-actionbar">
          <button className="action" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : '+ Purchase Order'}
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
            <label>Supplier</label>
            <input value={supplier} onChange={(e) => setSupplier(e.target.value)} />
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <label>Items (quantity)</label>
            <input value={items} onChange={(e) => setItems(e.target.value)} />
            <label>Value</label>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <button className="action" onClick={savePurchase}>Save Purchase Order</button>
            <button className="action" style={{ background: '#999', marginLeft: 8 }} onClick={resetForm}>Cancel</button>
          </div>
        )}

        <div className="table-card">
          <table className="burgundy-table">
            <thead>
              <tr>
                <th>PO</th><th>Supplier</th><th>Date</th><th>Items</th><th>Value</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.poNumber}</td>
                  <td>{p.supplier}</td>
                  <td>{p.date}</td>
                  <td>{p.items}</td>
                  <td>${p.value?.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${p.status === 'Received' ? 'healthy' : 'low'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ color: '#a39d8c' }}>No purchase orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}