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
      <div className="fb-login-box">
        <h1 className="fb-logo">POS SYSTEM</h1>
        <p className="fb-tagline">Manage your bookshop, faster and easier.</p>
        <div className="fb-form">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="fb-login-btn" onClick={handleLogin}>Log In</button>
          <a className="fb-forgot" href="#">Forgotten password?</a>
          <hr className="fb-divider" />
          <button className="fb-create-btn" onClick={() => alert('Contact your admin to create an account')}>
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}