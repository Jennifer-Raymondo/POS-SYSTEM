import { useEffect, useState } from 'react';

const API = 'http://localhost:3000';

export default function ClientOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [clientId, setClientId] = useState('');
  const [bookId, setBookId] = useState('');
  const [quantity, setQuantity] = useState('');

  const load = () => fetch(`${API}/orders`).then((r) => r.json()).then(setOrders);
  useEffect(() => { load(); }, []);

  const placeOrder = async () => {
    await fetch(`${API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: Number(clientId), items: [{ bookId: Number(bookId), quantity: Number(quantity) }] }),
    });
    setClientId(''); setBookId(''); setQuantity('');
    load();
  };

  return (
    <div>
      <div className="topbar">
        <h2>Client Orders</h2>
        <span className="date">{orders.length} orders</span>
      </div>
      <div className="page-body">
        <div className="form-card">
          <label>Client ID</label>
          <input value={clientId} onChange={(e) => setClientId(e.target.value)} />
          <label>Book ID</label>
          <input value={bookId} onChange={(e) => setBookId(e.target.value)} />
          <label>Quantity</label>
          <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <button className="action" onClick={placeOrder}>Place Order</button>
        </div>

        <div className="table-card">
          <table>
            <thead><tr><th>ID</th><th>Client</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}><td>#{o.id}</td><td>{o.clientId}</td><td>{o.status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}