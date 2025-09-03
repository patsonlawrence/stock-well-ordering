'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || ''


  console.log("🚀 Fetching:", `${API_URL}/api/login`);
try {
    const res = await fetch(`/api/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),
})


    const data = await res.json();
    console.log('✅ Server response:', data);

    if (!res.ok) {
      setErrorMsg(data.message || 'Login failed');
        return;
    }
        router.replace('/procurementDash/');
    console.log('✅ Login successful, redirecting...');

    // Continue with login success flow...
  } catch (error) {
    console.error('❌ Login error:', error);
    setErrorMsg('Unexpected error occurred');
  }
};
  return (
    <div className="background">
      <div className="login-box">
        <div className="avatar">
  <img src="/logos/stalogo.PNG" alt="Logo" className="logo" />
</div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMsg && (
            <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
              {errorMsg}
            </div>
          )}
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          {/* 🔁 This button now triggers redirect */}
          <button type="submit">Login</button>
          <p>
            Don’t have an account? <a href="#">Register now</a>
          </p>
        </form>
      </div>
    </div>
  );
}

