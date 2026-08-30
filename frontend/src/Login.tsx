import { useState } from 'react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) onLogin();
    else alert('Enter email and password');
  };

  return (
    <div className="login-screen">
      <div className="login-box">
       <h1>POS System</h1>
<p className="sub">Bookshop Management</p>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="action" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}