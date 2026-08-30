import { useEffect, useState } from 'react';

const API = 'http://localhost:3000';

export default function Pos() {
  const [books, setBooks] = useState<any[]>([]);
  const [bookId, setBookId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sales, setSales] = useState<any[]>([]);

  const loadBooks = () => fetch(`${API}/bookshop`).then((r) => r.json()).then(setBooks);
  const loadSales = () => fetch(`${API}/pos/sales`).then((r) => r.json()).then(setSales);
  useEffect(() => { loadBooks(); loadSales(); }, []);

  const checkout = async () => {
    await fetch(`${API}/pos/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ bookId: Number(bookId), quantity: Number(quantity) }] }),
    });
    setBookId(''); setQuantity('');
    loadBooks(); loadSales();
  };

  return (
    <div>
      <div className="topbar">
        <h2>POS — Checkout</h2>
        <span className="date">{sales.length} sales recorded</span>
      </div>
      <div className="page-body">
        <div className="form-card">
          <label>Book</label>
          <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
            <option value="">Select a book</option>
            {books.map((b) => (
              <option key={b.id} value={b.id}>{b.title} (stock: {b.stock})</option>
            ))}
          </select>
          <label>Quantity</label>
          <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <button className="action" onClick={checkout}>Complete Sale</button>
        </div>

        <div className="table-card">
          <h3 style={{ paddingTop: 16 }}>Sales History</h3>
          <table>
            <thead><tr><th>ID</th><th>Total</th><th>Date</th></tr></thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id}><td>#{s.id}</td><td>{s.total}</td><td>{new Date(s.createdAt).toLocaleString()}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}