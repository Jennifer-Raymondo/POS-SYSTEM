import { useEffect, useState } from 'react';

const API = 'http://localhost:3000';
const CATEGORIES = ['Fiction', 'Non-fiction', 'Business', 'Education', 'Children', 'History'];

export default function Bookshop() {
  const [books, setBooks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  const load = () => fetch(`${API}/bookshop`).then((r) => r.json()).then(setBooks);
  useEffect(() => { load(); }, []);

  const addBook = async () => {
    await fetch(`${API}/bookshop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, price: Number(price), stock: Number(stock), category }),
    });
    setTitle(''); setAuthor(''); setPrice(''); setStock(''); setCategory('');
    load();
  };

  return (
    <div>
      <div className="topbar">
        <h2>Bookshop</h2>
        <span className="date">{books.length} books in catalog</span>
      </div>
      <div className="page-body">
        <div className="form-card">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
          <label>Price</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
          <label>Stock</label>
          <input value={stock} onChange={(e) => setStock(e.target.value)} />
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button className="action" onClick={addBook}>Add Book</button>
        </div>

        <div className="table-card">
          <table>
            <thead><tr><th>ID</th><th>Title</th><th>Price</th><th>Stock</th></tr></thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id}><td>{b.id}</td><td>{b.title}</td><td>{b.price}</td><td>{b.stock}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}