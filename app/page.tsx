'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

 // const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
 // console.log("🚀 Fetching:", `${API_URL}/api/login`);
    const API_URL = 'https://stock-well-ordering-backend.onrender.com';
    const res = await fetch(`${API_URL}/api/login`);

try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log('✅ Server response:', data);

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Continue with login success flow...
  } catch (error) {
    console.error('❌ Login error:', error);
  }
};
  return (
    <div className="background">
      <div className="login-box">
        <div className="avatar">
  <img src="/logos/stalogo.PNG" alt="Logo" className="logo" />
</div>
        <h2>Sign in</h2>
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
//NEXT_PUBLIC_API_URL=https://stock-well-ordering.onrender.com
//"dev": "next dev",