'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required'),
});

export default function CreatePasswordPage() {
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setsuccessMessage] = useState('');
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

	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get('token');
		if (!token) {
			router.push('/register/login');
		}
	}, [router]);

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		const token = new URLSearchParams(window.location.search).get('token');

		if (!token) {
			toast.error('Invalid or expired token');
			router.push('/register/login');
			return;
		}

		try {
			const response = await fetch('/api/createpassword', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password: data.password, token }),
			});
			const result = await response.json();
			if (response.ok) {
				toast.success('Password reset successful!');
				setsuccessMessage("Password reset successful. You can now log in.")
				setTimeout(() => {
					router.push('/register/login');
				}, 1500);
			} else {
				toast.error(result.error || 'Password reset failed');
				setErrorMessage(result.error || 'Password reset failed');
			}
		} catch (error) {
			toast.error('An error occurred');
			setErrorMessage('Password reset failed');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='w-full bg-white px-6 py-8 md:p-10 lg:p-16'>
			<h1 className='text-2xl md:text-4xl font-bold'>Create New Password</h1>
			{errorMessage && (
				<div className='mt-4 mb-4 p-4 bg-red-100 border border-red-400 text-red-700'>
					{errorMessage}
				</div>
			)}
			{successMessage && (
				<div className='mt-4 mb-4 p-4 bg-green-100 border border-green-400 text-green-700'>
					{successMessage}
				</div>
			)}
			<form
				method='POST'
				className='mt-8'
				onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='password'>
						New Password
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
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='confirmPassword'>
						Confirm New Password
					</label>
					<input
						id='confirmPassword'
						name='confirmPassword'
						type='password'
						{...register('confirmPassword')}
						className='input input-bordered w-full'
					/>
					{errors.confirmPassword && (
						<p className='text-red-500 text-xs mt-2'>
							{errors.confirmPassword.message}
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
			</form>
		</div>
	);
}
