'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#121212] p-8 rounded-xl shadow-xl w-full max-w-md border border-cyan-600"
      >
        <h2 className="text-2xl font-semibold text-cyan-400 mb-6 text-center">
          Admin Login
        </h2>

        <input
          className="w-full mb-4 px-4 py-2 rounded-md bg-transparent border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full mb-6 px-4 py-2 rounded-md bg-transparent border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 rounded-md transition shadow-md hover:shadow-cyan-500/40"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
