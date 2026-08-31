import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function Orders() {
  const [rows, setRows] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/wholesale`).then((r) => r.json()),
      fetch(`${API}/orders`).then((r) => r.json()),
      fetch(`${API}/pos/sales`).then((r) => r.json()),
      fetch(`${API}/clients`).then((r) => r.json()),
    ]).then(([wholesale, clientOrders, posSales, clients]) => {
      const wholesaleRows = wholesale.map((w: any) => ({
        order: w.orderNo,
        customer: w.customer,
        channel: 'B2B',
        total: w.value,
        status: w.stage,
        payment: 'Not tracked',
        date: w.createdAt,
      }));

      const portalRows = clientOrders.map((o: any) => {
        const client = clients.find((c: any) => c.id === o.clientId);
        return {
          order: `PO-${20000 + o.id}`,
          customer: client?.name || `Client #${o.clientId}`,
          channel: 'Portal',
          total: null,
          status: o.status,
          payment: 'Not tracked',
          date: o.createdAt,
        };
      });

      const posRows = posSales.map((s: any) => ({
        order: `SO-${30000 + s.id}`,
        customer: 'Walk-in Customer',
        channel: 'POS',
        total: s.total,
        status: 'Completed',
        payment: 'Not tracked',
        date: s.createdAt,
      }));

      const combined = [...wholesaleRows, ...portalRows, ...posRows]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRows(combined);
      setLoading(false);
    });
  }, []);

  const filtered = rows.filter((r) =>
    r.order.toLowerCase().includes(search.toLowerCase()) ||
    r.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="topbar">
        <h2>Orders</h2>
        <span className="date">{rows.length} orders across all channels</span>
      </div>
      <div className="page-body">
        <div className="products-actionbar">
          <button className="action" onClick={() => alert('Use POS, Wholesale, or Client Portal to create a channel-specific order')}>
            + Create Order
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
                <th>Order</th><th>Customer</th><th>Channel</th><th>Total</th><th>Status</th><th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ color: '#a39d8c' }}>Loading orders...</td></tr>
              ) : filtered.length > 0 ? filtered.map((r, i) => (
                <tr key={i}>
                  <td>{r.order}</td>
                  <td>{r.customer}</td>
                  <td>{r.channel}</td>
                  <td>{r.total !== null ? `$${r.total.toLocaleString()}` : <span style={{ color: '#a39d8c' }}>Not tracked</span>}</td>
                  <td>{r.status}</td>
                  <td style={{ color: '#a39d8c' }}>{r.payment}</td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ color: '#a39d8c' }}>No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}