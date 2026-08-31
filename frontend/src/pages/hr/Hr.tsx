import { useEffect, useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';
const DEPARTMENTS = ['Sales', 'Inventory', 'Delivery', 'Finance', 'Management'];
const ATTENDANCE = ['Present', 'Absent'];

export default function Hr() {
  const [staff, setStaff] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState('Present');
  const [leaveDays, setLeaveDays] = useState('');

  const load = () => fetch(`${API}/hr`).then((r) => r.json()).then(setStaff);
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setName(''); setDepartment(''); setRole(''); setPhone(''); setAttendance('Present'); setLeaveDays('');
    setShowForm(false);
  };

  const saveEmployee = async () => {
    if (!name.trim() || !department || !role.trim() || !phone.trim()) {
      alert('Please fill in all fields before saving.');
      return;
    }
    const payload = {
      name, department, role, phone, attendance,
      leaveDays: Number(leaveDays) || 0,
      status: 'Active',
    };
    if (editingId) {
      await fetch(`${API}/hr/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/hr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    resetForm();
    load();
  };

  const startEdit = (s: any) => {
    setEditingId(s.id);
    setName(s.name);
    setDepartment(s.department || '');
    setRole(s.role);
    setPhone(s.phone);
    setAttendance(s.attendance || 'Present');
    setLeaveDays(String(s.leaveDays || 0));
    setShowForm(true);
  };

  const deleteEmployee = async (id: number) => {
    if (!confirm('Remove this employee?')) return;
    await fetch(`${API}/hr/${id}`, { method: 'DELETE' });
    load();
  };

  const presentToday = staff.filter((s) => s.attendance === 'Present').length;
  const onLeave = staff.filter((s) => (s.leaveDays || 0) > 0).length;

  return (
    <div>
      <div className="topbar">
        <h2>HR &amp; Payroll</h2>
        <span className="date">Employee records, attendance, leave, payroll and workforce controls</span>
      </div>
      <div className="page-body">
        <div className="cards">
          <div className="card"><h3>Employees</h3><p>{staff.length}</p></div>
          <div className="card"><h3>Present Today</h3><p>{presentToday}</p></div>
          <div className="card"><h3>On Leave</h3><p>{onLeave}</p></div>
          <div className="card"><h3>Payroll Due</h3><p style={{ fontSize: 15, color: '#a39d8c' }}>Not yet tracked</p></div>
        </div>

        <div className="table-card">
          <h3 style={{ paddingTop: 16 }}>Workforce Overview</h3>
          <table className="burgundy-table">
            <thead>
              <tr>
                <th>Employee</th><th>Department</th><th>Role</th><th>Attendance</th><th>Leave</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.length > 0 ? staff.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.department}</td>
                  <td>{s.role}</td>
                  <td>
                    <span className={`status-badge ${s.attendance === 'Present' ? 'healthy' : 'low'}`}>{s.attendance}</span>
                  </td>
                  <td>{s.leaveDays || 0} days</td>
                  <td>{s.status}</td>
                  <td>
                    <button className="action" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => startEdit(s)}>Edit</button>
                    <button className="action" style={{ padding: '4px 10px', fontSize: 12, background: '#a33', marginLeft: 6 }} onClick={() => deleteEmployee(s.id)}>Delete</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} style={{ color: '#a39d8c' }}>No employees yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="form-card">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <label>Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} />
            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label>Attendance</label>
            <select value={attendance} onChange={(e) => setAttendance(e.target.value)}>
              {ATTENDANCE.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            <label>Leave Days</label>
            <input value={leaveDays} onChange={(e) => setLeaveDays(e.target.value)} />
            <button className="action" onClick={saveEmployee}>{editingId ? 'Update Employee' : 'Save Employee'}</button>
            <button className="action" style={{ background: '#999', marginLeft: 8 }} onClick={resetForm}>Cancel</button>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <button className="action" onClick={() => { if (showForm) resetForm(); else setShowForm(true); }}>
            {showForm ? 'Close Form' : 'Employee Directory'}
          </button>
          <button className="action" style={{ background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={() => alert('Coming soon')}>
            Attendance
          </button>
          <button className="action" style={{ background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={() => alert('Coming soon')}>
            Leave
          </button>
          <button className="action" style={{ background: 'white', color: '#6d1130', border: '1.5px solid #6d1130' }} onClick={() => alert('Coming soon')}>
            Payroll
          </button>
        </div>
      </div>
    </div>
  );
}