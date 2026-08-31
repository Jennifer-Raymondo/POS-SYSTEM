import { useState } from 'react';

const API = 'https://pos-system-backend-vg4w.onrender.com';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        onLogin();
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setLoading(false);
      setError('Could not reach the server. Please try again.');
    }
  };

  return (
    <div className="fb-login-screen">
      <div className="fb-brand-header">
        <h1>POS SYSTEM</h1>
        <p>Enterprise POS &amp; Business Management Platform</p>
        <div className="cats">Retail • Wholesale • Distribution • Multi-Branch • Client Portal</div>
      </div>

      <div className="fb-login-box">
        <h2>Welcome back</h2>
        <p className="sub">Sign in to your workspace</p>
        <div className="fb-form">
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p style={{ color: '#d93025', fontSize: 13, marginTop: -8, marginBottom: 14 }}>{error}</p>}
          <button className="fb-login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <a className="fb-forgot" href="#">Forgot password?</a>
        </div>
      </div>

      <div className="fb-page-footer">Owned &amp; developed by CoreLogic IT Firm</div>
    </div>
  );
}