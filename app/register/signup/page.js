'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
	username: yup
		.string()
		.matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric')
		.required('Username is required'),
	firstName: yup.string().required('First Name is required'),
	lastName: yup.string().required('Last Name is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[0-9]/, 'Password must contain at least a number')
		.matches(/[!@#$%^&*()<>?":{}|<>]/, 'Password must contain at least one special character')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Please confirm your password'),
});

export default function Page() {
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: yupResolver(schema),
	});

	const router = useRouter()

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const result = await response.json();
			if (response.ok) {
				toast.success('User created successfully!');
				setSuccessMessage('User created successfully!');
				reset();
				setTimeout(() => {
					router.push("/register/login")
				}, 2000)
			} else {
				toast.error(result.error || 'User creation failed');
				setErrorMessage(result.error || 'User creation failed');
			}
		} catch (error) {
			toast.error('An error occurred');
			setErrorMessage(result.error || 'User creation failed');
		} finally {
			setIsSubmitting(false); // Stop loading indicator
		}
	};

	return (
		<div className='w-full bg-white px-6 py-8 md:p-10 lg:p-16'>
			<h1 className='text-3xl md:text-4xl font-bold'>Sign-Up</h1>
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
						htmlFor='firstName'>
						First Name
					</label>
					<input
						id='firstName'
						name='firstName'
						type='text'
						{...register('firstName')}
						className='input input-bordered w-full'
					/>
					{errors.firstName && (
						<p className='text-red-500 text-xs mt-2'>
							{errors.firstName.message}
						</p>
					)}
				</div>
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='lastName'>
						Last Name
					</label>
					<input
						id='lastName'
						name='lastName'
						type='text'
						{...register('lastName')}
						className='input input-bordered w-full'
					/>
					{errors.lastName && (
						<p className='text-red-500 text-xs mt-2'>
							{errors.lastName.message}
						</p>
					)}
				</div>
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='email'>
						Email
					</label>
					<input
						id='email'
						name='email'
						type='email'
						{...register('email')}
						className='input input-bordered w-full'
					/>
					{errors.email && (
						<p className='text-red-500 text-xs mt-2'>{errors.email.message}</p>
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
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='confirmPassword'>
						Confirm Password
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
						disabled={isSubmitting} // Disable button while submitting
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
					Already have an account? {' '}
					<Link
						href='/register/login'
						className='text-primary hover:text-primary/50 font-bold'>
						Log in
					</Link>
				</div>
			</form>
		</div>
	);
}
