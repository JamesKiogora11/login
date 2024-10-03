"use client";

import {React, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    if (!name || !email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const resUserExists = await fetch('/api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        setLoading(false);
        return;
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setSuccess("Registration successful! Please log in.");
        router.push('/');
      } else {
        const { message } = await res.json();
        setError(message || "User registration failed");
      }
    } catch (error) {
      console.error("User registration failed: ", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-4 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Register</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input 
            onChange={(e) => setName(e.target.value)}
            type='text' 
            required  
            value={name} 
            placeholder='Full Name'
          />

          <input 
            onChange={(e) => setEmail(e.target.value)} 
            type='email' id='email'
            required 
            value={email} 
            placeholder='Email'
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
            disabled={loading}
            type='submit' 
            className={`font-bold px-6 py-2 rounded-md cursor-pointer text-white ${loading ? 'bg-gray-400' : 'bg-green-600'}`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <div className='bg-red-400 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}

          {success && (
            <div className='bg-green-400 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
              {success}
            </div>
          )}

          <Link className='text-sm mt-3 text-right' href={'/account'}>
            Already have an account? <span className='underline font-bold ml-2'>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
