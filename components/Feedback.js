"use client";

import React, { useState } from 'react';

export default function Feedback() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setResponseMessage('');

        try {
            const res = await fetch("/api/feedback", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    message,
                }),
            });

            if (!res.ok) {
                throw new Error('An error occurred while submitting feedback');
            }

            const data = await res.json();
            setResponseMessage(data.msg);
            setFullname('');
            setEmail('');
            setMessage('');
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4 max-w-3xl mx-auto'>
            <h1 className='text-xl font-bold'>Feedback Page</h1>
            <p>Please fill in the form below</p>

            <form 
                onSubmit={handleSubmit}
                className='py-4 mt-4 border-t flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='fullname'>Full Name:</label>
                    <input 
                        onChange={e => setFullname(e.target.value)}
                        value={fullname} 
                        className='shadow-lg px-6 border-slate-300'
                        type='text' 
                        required 
                        id='fullname' 
                        placeholder='Full Name'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        onChange={e => setEmail(e.target.value)}
                        value={email} 
                        className='shadow-lg px-6 border-slate-300'
                        type='email' 
                        required 
                        id='email' 
                        placeholder='Email'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='message'>Your Feedback:</label>
                    <textarea 
                        onChange={e => setMessage(e.target.value)}
                        value={message} 
                        className='shadow-lg px-6 border-slate-300 h-32' 
                        id='message' 
                        required 
                        placeholder='Type your feedback here...'
                    />
                </div>

                <button 
                    className='bg-green-600 p-3 text-white rounded-md' 
                    type='submit'
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            {errorMessage && (
                <div className='bg-red-400 text-white px-5 py-2 mt-4 rounded-md'>
                    {errorMessage}
                </div>
            )}

            {responseMessage && (
                <div className='bg-green-400 text-white px-5 py-2 mt-4 rounded-md'>
                    {responseMessage}
                </div>
            )}
        </div>
    );
}
