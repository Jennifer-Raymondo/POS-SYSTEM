import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const ROLES = ['Super Admin', 'Sales Manager', 'Cashier', 'Inventory', 'Accountant', 'HR'];
const BRANCHES = ['HQ', 'Main Store', 'Warehouse'];

export default function UsersRoles() {
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [branch, setBranch] = useState('');

  const load = () => fetch(`${API}/auth/users`).then((r) => r.json()).then(setUsers);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setUsername(''); setPassword(''); setRole(''); setBranch('');
    setShowForm(false);
  };

  const saveUser = async () => {
    if (!username.trim() || !password.trim() || !role || !branch) {
      alert('Please fill in all fields before saving.');
      return;
    }
    await fetch(`${API}/auth/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role, branch, status: 'Active' }),
    });
    resetForm();
    load();
  };

  const deleteUser = async (id: number) => {
    if (!confirm('Remove this user?')) return;
    await fetch(`${API}/auth/users/${id}`, { method: 'DELETE' });
    load();
  };

  const filtered = users.filter((u) =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="topbar">
        <h2>Users &amp; Roles</h2>
        <span className="date">{users.length} user accounts</span>
      </div>
      <div className="page-body">
        <div className="products-actionbar">
          <button className="action" onClick={() => { if (showForm) resetForm(); else setShowForm(true); }}>
            {showForm ? 'Close Form' : '+ Add User'}
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
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select role</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <label>Branch</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option value="">Select branch</option>
              {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <button className="action" onClick={saveUser}>Save User</button>
            <button className="action" style={{ background: '#999', marginLeft: 8 }} onClick={resetForm}>Cancel</button>
          </div>
        )}

        <div className="table-card">
          <table className="burgundy-table">
            <thead>
              <tr>
                <th>User</th><th>Role</th><th>Branch</th><th>Last Login</th><th>Status</th><th>2FA</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>{u.branch}</td>
                  <td style={{ color: '#a39d8c' }}>Not tracked</td>
                  <td>
                    <span className="status-badge healthy">{u.status}</span>
                  </td>
                  <td style={{ color: '#a39d8c' }}>Off</td>
                  <td>
                    <button className="action" style={{ padding: '4px 10px', fontSize: 12, background: '#a33' }} onClick={() => deleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} style={{ color: '#a39d8c' }}>No users yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}