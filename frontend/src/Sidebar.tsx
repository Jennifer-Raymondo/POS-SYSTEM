const ITEMS = [
  { key: 'dashboard', label: '🏠 Dashboard' },
  { key: 'bookshop', label: '📚 Bookshop' },
  { key: 'pos', label: '🧾 POS' },
  { key: 'accounts', label: '💰 Accounts' },
  { key: 'hr', label: '👥 HR' },
  { key: 'settings', label: '⚙️ Settings' },
  { key: 'client-portal', label: '👤 Client Portal' },
  { key: 'client-orders', label: '🛒 Client Orders' },
];

export default function Sidebar({ active, setActive }: { active: string; setActive: (k: string) => void }) {
  return (
    <div className="sidebar">
    <h2>POS SYSTEM</h2>
<p className="tagline">Bookshop Edition</p>
      {ITEMS.map((item) => (
        <button
          key={item.key}
          className={item.key === active ? 'active' : ''}
          onClick={() => setActive(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}