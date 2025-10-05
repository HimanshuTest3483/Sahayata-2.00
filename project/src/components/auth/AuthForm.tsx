import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormData } from '../../types';
// switched to API-based auth

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    role: 'caretaker'
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldownActive) {
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password, fullName: '', role: formData.role })
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || 'Authentication failed');
      }
      const data = await res.json();
      if (data.token) localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className={`border-l-4 p-4 ${cooldownActive ? 'bg-yellow-50 border-yellow-500' : 'bg-red-50 border-red-500'}`}>
          <p className={cooldownActive ? 'text-yellow-700' : 'text-red-700'}>
            {error}
            {cooldownActive && ` (${cooldownSeconds}s)`}
          </p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          disabled={cooldownActive}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          disabled={cooldownActive}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      {!isLogin && (
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            disabled={cooldownActive}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'caretaker' | 'patient' })}
          >
            <option value="caretaker">Caretaker</option>
            <option value="patient">Patient</option>
          </select>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading || cooldownActive}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : cooldownActive ? `Wait ${cooldownSeconds}s` : (isLogin ? 'Sign in' : 'Sign up')}
        </button>
      </div>

      <div className="mt-6">
        <button
          type="button"
          disabled={cooldownActive}
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center text-sm text-rose-600 hover:text-rose-500"
        >
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;