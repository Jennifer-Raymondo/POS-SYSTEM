import { useState } from 'react';

const API = 'http://localhost:3000';

export default function ClientPortal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const register = async () => {
    const res = await fetch(`${API}/clients/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setMessage(`Registered: ${data.name} (id: ${data.id})`);
  };

  return (
    <div>
      <div className="topbar">
        <h2>Client Portal</h2>
        <span className="date">Customer registration</span>
      </div>
      <div className="page-body">
        <div className="form-card">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="action" onClick={register}>Register</button>
          {message && <p style={{ marginTop: 12, color: '#21313f' }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}