"use client";

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      router.push('/');
    } else {
      setError(res.error || 'Login failed. Incorrect Email or Password');
    }

    setLoading(false);
  };

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-4 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Login</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            type='email' id='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              type={showPassword ? 'text' : 'password'}
              required 
              value={password} 
              placeholder='Password'
            />
            <label className="flex flex-col items-center gap-2 mt-2 space-x-2">
              <input 
                type="checkbox" 
                checked={showPassword} 
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`font-bold px-6 py-2 rounded-md cursor-pointer bg-green-600 text-white ${loading ? 'bg-gray-400' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <div className='bg-red-400 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}

          <Link className='text-sm mt-3 text-right' href={'/register'}>
            Don't have an account? <span className='underline font-bold ml-2'>Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

