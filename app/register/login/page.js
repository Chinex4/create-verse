'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
});

export default function Page() {
	const [errorMessage, setErrorMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const router = useRouter();

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const result = await response.json();
			if (response.ok) {
				toast.success('Login successful!');
				localStorage.setItem('token', result.token);
				reset();
				router.push('/dashboard');
			} else {
				toast.error(result.error || 'Login failed');
				setErrorMessage(result.error || 'Login failed');
			}
		} catch (error) {
			toast.error('An error occurred');
			setErrorMessage('Login failed');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='w-full bg-white px-6 py-8 md:p-10 lg:p-16'>
			<h1 className='text-3xl md:text-4xl font-bold'>Login</h1>
			{errorMessage && (
				<div className='mt-4 mb-4 p-4 bg-red-100 border border-red-400 text-red-700'>
					{errorMessage}
				</div>
			)}
			<form
				method='POST'
				className='mt-8'
				onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='username'>
						Username
					</label>
					<input
						id='username'
						name='username'
						type='text'
						{...register('username')}
						className='input input-bordered w-full'
					/>
					{errors.username && (
						<p className='text-red-500 text-xs mt-2'>
							{errors.username.message}
						</p>
					)}
				</div>
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='password'>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						{...register('password')}
						className='input input-bordered w-full'
					/>
					{errors.password && (
						<p className='text-red-500 text-xs mt-2'>
							{errors.password.message}
						</p>
					)}
				</div>
				<div className='mb-4'>
					<button
						type='submit'
						disabled={isSubmitting}
						className={`btn bg-primary hover:bg-primary/70 text-white w-full ${
							isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
						}`}>
						{isSubmitting && (
							<span className='loading loading-dots loading-md'></span>
						)}
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</button>
				</div>
				<div className='text-center'>
					Don't have an account?{' '}
					<Link
						href='/register/signup'
						className='text-primary hover:text-primary/50 font-bold'>
						Sign Up
					</Link>
				</div>
				<div className='text-center mt-4'>
					<Link
						href='/register/forgotpassword'
						className='text-primary'>
						Forgot Password?
					</Link>
				</div>
			</form>
		</div>
	);
}
