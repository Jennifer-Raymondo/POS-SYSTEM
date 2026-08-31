import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const TAX_RATE = 0.05;

export default function Pos() {
  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{ bookId: number; title: string; price: number; qty: number }[]>([]);

  const loadBooks = () => fetch(`${API}/bookshop`).then((r) => r.json()).then(setBooks);
  useEffect(() => { loadBooks(); }, []);

  const filteredBooks = search
    ? books.filter((b) => b.title?.toLowerCase().includes(search.toLowerCase()) || b.sku?.toLowerCase().includes(search.toLowerCase()))
    : [];

  const addToCart = (book: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.bookId === book.id);
      if (existing) {
        return prev.map((i) => (i.bookId === book.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { bookId: book.id, title: book.title, price: book.price, qty: 1 }];
    });
    setSearch('');
  };

  const updateQty = (bookId: number, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.bookId !== bookId));
    } else {
      setCart((prev) => prev.map((i) => (i.bookId === bookId ? { ...i, qty } : i)));
    }
  };

  const clearCart = () => setCart([]);
  const holdSale = () => {
    if (cart.length === 0) return alert('Cart is empty');
    alert('Sale held (feature stub — not yet saved for later recall)');
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const checkout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    await fetch(`${API}/pos/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.map((i) => ({ bookId: i.bookId, quantity: i.qty })) }),
    });
    clearCart();
    loadBooks();
    alert('Sale completed');
  };

  return (
    <div>
      <div className="topbar">
        <h2>POS</h2>
        <span className="date">Cashier: Admin</span>
      </div>
      <div className="page-body">
        <div className="pos-layout">
          <div className="pos-main panel">
            <h3>New Sale</h3>
            <input
              className="pos-search"
              placeholder="Scan barcode or search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <div className="pos-search-results">
                {filteredBooks.length > 0 ? filteredBooks.map((b) => (
                  <div key={b.id} className="pos-search-item" onClick={() => addToCart(b)}>
                    <span>{b.title}</span>
                    <span>${b.price} · stock {b.stock}</span>
                  </div>
                )) : (
                  <div className="pos-search-item" style={{ color: '#a39d8c' }}>No matching products</div>
                )}
              </div>
            )}

            <table className="burgundy-table">
              <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
              <tbody>
                {cart.length > 0 ? cart.map((i) => (
                  <tr key={i.bookId}>
                    <td>{i.title}</td>
                    <td>
                      <div className="qty-controls">
                        <button onClick={() => updateQty(i.bookId, i.qty - 1)}>−</button>
                        <span>{i.qty}</span>
                        <button onClick={() => updateQty(i.bookId, i.qty + 1)}>+</button>
                      </div>
                    </td>
                    <td>${i.price}</td>
                    <td>${(i.price * i.qty).toFixed(2)}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} style={{ color: '#a39d8c' }}>Cart is empty — search above to add items</td></tr>
                )}
              </tbody>
            </table>

            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button className="action" style={{ background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={holdSale}>Hold</button>
              <button className="action" style={{ background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={() => alert('Discounts coming soon')}>Discount</button>
              <button className="action" style={{ background: 'white', color: '#a33', border: '1.5px solid #a33' }} onClick={clearCart}>Clear</button>
            </div>
          </div>

          <div className="pos-side panel">
            <h3>Cart Summary</h3>
            <div className="account-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <div className="account-row"><span>Discount</span><strong style={{ color: '#a39d8c' }}>Not applied</strong></div>
            <div className="account-row"><span>Tax (5%)</span><strong>${tax.toFixed(2)}</strong></div>
            <div className="account-row" style={{ fontWeight: 800, fontSize: 16 }}><span>TOTAL</span><strong>${total.toFixed(2)}</strong></div>

            <button className="action" style={{ width: '100%', marginTop: 16 }} onClick={checkout}>Payment</button>
            <button className="action" style={{ width: '100%', marginTop: 8, background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={() => alert('Split payment coming soon')}>
              Split Payment
            </button>

            <p style={{ marginTop: 20, fontSize: 12.5, color: '#a39d8c' }}>Cashier: Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}