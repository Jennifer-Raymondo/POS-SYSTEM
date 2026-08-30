import { useState } from 'react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) onLogin();
    else alert('Please enter username and password');
  };

  return (
    <div className="fb-login-screen">
      <div className="fb-brand-header">
        <h1>CHECKOUTZ</h1>
        <p>Enterprise POS &amp; Business Management Platform</p>
        <div className="cats">Retail • Wholesale • Distribution • Multi-Branch • Client Portal</div>
      </div>

      <div className="fb-login-box">
        <h2>Welcome back</h2>
        <p className="sub">Sign in to your Checkoutz workspace</p>
        <div className="fb-form">
          <label>Email or username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="fb-login-btn" onClick={handleLogin}>Sign In</button>
          <a className="fb-forgot" href="#">Forgot password?</a>
          <button className="fb-secondary-btn" onClick={() => alert('Coming soon')}>
            Quick PIN / Cashier Login
          </button>
        </div>
      </div>

      <div className="fb-page-footer">Owned &amp; developed by CoreLogic IT Firm</div>
    </div>
  );
}