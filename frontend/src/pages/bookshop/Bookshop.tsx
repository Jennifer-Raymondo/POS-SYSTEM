import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const CATEGORIES = ['Fiction', 'Non-fiction', 'Business', 'Education', 'Children', 'History'];

export default function Bookshop() {
  const [books, setBooks] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  const load = () => fetch(`${API}/bookshop`).then((r) => r.json()).then(setBooks);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle(''); setAuthor(''); setPrice(''); setWholesalePrice(''); setStock(''); setCategory('');
    setShowForm(false);
  };

  const saveBook = async () => {
    if (!title.trim() || !author.trim() || !price || !wholesalePrice || !stock || !category) {
      alert('Please fill in all fields before saving.');
      return;
    }
    const payload = {
      title, author,
      price: Number(price),
      wholesalePrice: Number(wholesalePrice),
      stock: Number(stock),
      category,
    };
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
    setWholesalePrice(String(b.wholesalePrice || ''));
    setStock(String(b.stock));
    setCategory(b.category);
    setShowForm(true);
  };

  const deleteBook = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`${API}/bookshop/${id}`, { method: 'DELETE' });
    load();
  };

  const filtered = books.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.sku?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="topbar">
        <h2>Products</h2>
        <span className="date">{books.length} products in catalog</span>
      </div>
      <div className="page-body">
        <div className="products-actionbar">
          <button className="action" onClick={() => { resetForm(); setShowForm(!showForm); }}>
            + Add Product
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
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Author</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            <label>Retail Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} />
            <label>Wholesale Price</label>
            <input value={wholesalePrice} onChange={(e) => setWholesalePrice(e.target.value)} />
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
              {editingId ? 'Update Product' : 'Save Product'}
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
                <th>SKU</th><th>Product</th><th>Category</th><th>Retail</th><th>Wholesale</th><th>Stock</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td>{b.sku}</td>
                  <td>{b.title}</td>
                  <td>{b.category}</td>
                  <td>${b.price}</td>
                  <td>${b.wholesalePrice}</td>
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