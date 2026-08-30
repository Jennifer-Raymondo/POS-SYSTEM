import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const CATEGORIES = ['Fiction', 'Non-fiction', 'Business', 'Education', 'Children', 'History'];

export default function Bookshop() {
  const [books, setBooks] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  const load = () => fetch(`${API}/bookshop`).then((r) => r.json()).then(setBooks);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle(''); setAuthor(''); setPrice(''); setStock(''); setCategory('');
  };

  const saveBook = async () => {
    const payload = { title, author, price: Number(price), stock: Number(stock), category };
    if (editingId) {
      await fetch(`${API}/bookshop/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/bookshop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    resetForm();
    load();
  };

  const startEdit = (b: any) => {
    setEditingId(b.id);
    setTitle(b.title);
    setAuthor(b.author);
    setPrice(String(b.price));
    setStock(String(b.stock));
    setCategory(b.category);
  };

  const deleteBook = async (id: number) => {
    if (!confirm('Delete this book?')) return;
    await fetch(`${API}/bookshop/${id}`, { method: 'DELETE' });
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
          <button className="action" onClick={saveBook}>
            {editingId ? 'Update Book' : 'Add Book'}
          </button>
          {editingId && (
            <button className="action" style={{ background: '#999', marginLeft: 8 }} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>

        <div className="table-card">
          <table>
            <thead><tr><th>ID</th><th>Title</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.title}</td>
                  <td>{b.price}</td>
                  <td>{b.stock}</td>
                  <td>
                    <button className="action" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => startEdit(b)}>Edit</button>
                    <button className="action" style={{ padding: '4px 10px', fontSize: 12, background: '#a33', marginLeft: 6 }} onClick={() => deleteBook(b.id)}>Delete</button>
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