'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
	username: yup.string().required('Username is required'),
	firstName: yup.string().required('First Name is required'),
	lastName: yup.string().required('Last Name is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required'),
});

export default function Page() {
	const [successMessage, setSuccessMessage] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			const response = await fetch('api/register', {
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
			} else {
				toast.error('User creation failed');
			}
		} catch (error) {
			toast.error('An error occurred');
		}
	};

	return (
		<div className='w-full bg-white px-6 py-8 md:p-10 lg:p-16'>
			<h1 className='text-3xl md:text-4xl font-bold'>Sign Up</h1>
			{successMessage && (
				<div className='mb-4 p-4 bg-green-100 border border-green-400 text-green-700'>
					{successMessage}
				</div>
			)}
			<form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
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
						className='btn bg-primary hover:bg-primary/70 text-white w-full'>
						Submit
					</button>
				</div>
				<div className='text-center'>
					<Link
						href='/register/login'
						className='text-primary'>
						Already have an account? Log in
					</Link>
				</div>
			</form>
		</div>
	);
}
