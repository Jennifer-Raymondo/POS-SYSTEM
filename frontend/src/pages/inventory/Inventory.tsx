import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const REORDER_LEVEL = 10;

export default function Inventory() {
  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const load = () => fetch(`${API}/bookshop`).then((r) => r.json()).then(setBooks);
  useEffect(() => { load(); }, []);

  const filtered = books.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.sku?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="topbar">
        <h2>Inventory</h2>
        <span className="date">{books.length} products tracked</span>
      </div>
      <div className="page-body">
        <div className="products-actionbar">
          <button className="action" onClick={() => alert('Stock adjustment coming soon')}>
            + Stock Adjustment
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

        <div className="table-card">
          <table className="burgundy-table">
            <thead>
              <tr>
                <th>Product</th><th>Main</th><th>Warehouse</th><th>Reserved</th><th>Reorder</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const isLow = b.stock < REORDER_LEVEL;
                return (
                  <tr key={b.id}>
                    <td>{b.title}</td>
                    <td>{b.stock}</td>
                    <td style={{ color: '#a39d8c' }}>Not tracked</td>
                    <td style={{ color: '#a39d8c' }}>Not tracked</td>
                    <td>{REORDER_LEVEL}</td>
                    <td>
                      <span className={isLow ? 'status-badge low' : 'status-badge healthy'}>
                        {isLow ? 'Low Stock' : 'Healthy'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}