import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function Hr() {
  const [staff, setStaff] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');

  const load = () => fetch(`${API}/hr`).then((r) => r.json()).then(setStaff);
  useEffect(() => { load(); }, []);

    const add = async () => {
    if (!name.trim() || !role.trim() || !phone.trim()) {
      alert('Please fill in Name, Role, and Phone.');
      return;
    }
    await fetch(`${API}/hr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, phone }),
    });
    setName(''); setRole(''); setPhone('');
    load();
  };

  return (
    <div>
      <div className="topbar">
        <h2>Human Resource</h2>
        <span className="date">{staff.length} employees</span>
      </div>
      <div className="page-body">
        <div className="form-card">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <label>Role</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} />
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button className="action" onClick={add}>Add Staff</button>
        </div>

        <div className="table-card">
          <table>
            <thead><tr><th>Name</th><th>Role</th><th>Phone</th></tr></thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id}><td>{s.name}</td><td>{s.role}</td><td>{s.phone}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}