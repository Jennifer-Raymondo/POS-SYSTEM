import { useEffect, useState } from 'react';

const API = 'http://localhost:3000';

export default function Dashboard() {
  const [books, setBooks] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    fetch(`${API}/bookshop`).then((r) => r.json()).then(setBooks);
    fetch(`${API}/pos/sales`).then((r) => r.json()).then(setSales);
    fetch(`${API}/orders`).then((r) => r.json()).then(setOrders);
    fetch(`${API}/hr`).then((r) => r.json()).then(setStaff);
    fetch(`${API}/accounts/summary`).then((r) => r.json()).then(setSummary);
  }, []);

  const today = new Date().toDateString();
  const todaySales = sales.filter((s) => new Date(s.createdAt).toDateString() === today);
  const todayTotal = todaySales.reduce((sum, s) => sum + s.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending');

    return (
    <div>
      <div className="topbar">
        <h2>Dashboard</h2>
        <span className="date">{new Date().toDateString()}</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Today's Sales</h3><p>{todayTotal}</p></div>
          <div className="card"><h3>Total Books</h3><p>{books.length}</p></div>
          <div className="card"><h3>Pending Orders</h3><p>{pendingOrders.length}</p></div>
          <div className="card"><h3>Employees</h3><p>{staff.length}</p></div>
          <div className="card"><h3>Expenses</h3><p>{summary.expense || 0}</p></div>
        </div>

        <div className="panel">
          <h3>Recent Sales</h3>
          <table>
            <thead><tr><th>Sale ID</th><th>Total</th><th>Date</th></tr></thead>
            <tbody>
              {sales.slice(-5).reverse().map((s) => (
                <tr key={s.id}><td>#{s.id}</td><td>{s.total}</td><td>{new Date(s.createdAt).toLocaleString()}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}