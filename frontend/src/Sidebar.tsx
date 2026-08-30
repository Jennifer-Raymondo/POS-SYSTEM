const WORKING = ['dashboard', 'bookshop', 'pos', 'accounts', 'hr', 'settings', 'client-portal', 'client-orders'];

const ITEMS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'pos', label: 'POS' },
  { key: 'bookshop', label: 'Products' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'purchases', label: 'Purchases' },
  { key: 'suppliers', label: 'Suppliers' },
  { key: 'client-orders', label: 'Customers' },
  { key: 'wholesale', label: 'Wholesale' },
  { key: 'orders', label: 'Orders' },
  { key: 'deliveries', label: 'Deliveries' },
  { key: 'client-portal', label: 'Client Portal' },
  { key: 'accounts', label: 'Finance' },
  { key: 'accounts2', label: 'Accounts' },
  { key: 'petty-cash', label: 'Petty Cash' },
  { key: 'hr', label: 'HR & Payroll' },
  { key: 'reports', label: 'Reports' },
  { key: 'users-roles', label: 'Users & Roles' },
  { key: 'permissions', label: 'Permissions' },
  { key: 'settings', label: 'Settings' },
];

export default function Sidebar({ active, setActive }: { active: string; setActive: (k: string) => void }) {
  const handleClick = (key: string) => {
    if (WORKING.includes(key)) {
      setActive(key);
    } else {
      alert('This section is coming soon');
    }
  };

  return (
    <div className="sidebar">
      <h2>POS SYSTEM</h2>
      <p className="tagline">CoreLogic POS</p>
      <div className="sidebar-links">
        {ITEMS.map((item) => (
          <button
            key={item.key}
            className={item.key === active ? 'active' : ''}
            onClick={() => handleClick(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="sidebar-footer">CoreLogic IT Firm</div>
    </div>
  );
}