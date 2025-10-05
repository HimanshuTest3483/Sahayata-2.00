import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // TODO: Implement password reset functionality
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <Mail className="mx-auto h-12 w-12 text-rose-600" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Check your email</h3>
        <p className="mt-1 text-sm text-gray-500">
          We've sent password reset instructions to {email}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500"
          />
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
      >
        Send reset instructions
      </button>
    </form>
  );
};

export default ForgotPasswordForm;