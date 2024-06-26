'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

const schema = yup.object().shape({
	walletAddress: yup
		.string()
		.matches(ethAddressRegex, 'Invalid ETH wallet address')
		.required('Please provide your ETH Wallet Address'),
});

export default function Page() {
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

	const onSubmit = async (data) => {
		setIsSubmitting(true);

		const token = localStorage.getItem('token');
		// console.log(token)

		try {
			const response = await fetch('/api/connect', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ walletAddress: data.walletAddress, token }),
			});
			const result = await response.json();
			if (response.ok) {
				toast.success('Wallet connected successfully!');
				setsuccessMessage('Wallet connected successfully!');
				reset();
				router.push('/dashboard');
				router.refresh();
			} else {
				toast.error(result.error || 'Wallet connection failed');
				setErrorMessage(result.error || 'Wallet connection failed');
			}
		} catch (error) {
			toast.error('An error occurred');
			setErrorMessage('Wallet connection failed');
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<>
			<section className='my-[8rem] md:mb-[15rem] px-6 lg:px-[4rem] mt-[7.5rem] space-y-2 w-full md:w-[40rem] lg:w-[50rem] mx-auto'>
				<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary'>
					Connect Wallet
				</h1>
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
					className='mt-16'
					onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-4'>
						<label
							className='block text-sm font-bold mb-2'
							htmlFor='username'>
							Enter your ETH Wallet Address
						</label>
						<input
							name='walletAddress'
							type='text'
							{...register('walletAddress')}
							className='input input-bordered w-full'
						/>
						{errors.walletAddress && (
							<p className='text-red-500 text-xs mt-2'>
								{errors.walletAddress.message}
							</p>
						)}
					</div>
					<div className='mb-4'>
						<button
							type='submit'
							disabled={isSubmitting}
							className={`btn bg-primary hover:bg-primary/70 text-white w-full md:w-[200px] ${
								isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
							}`}>
							{isSubmitting && (
								<span className='loading loading-dots loading-md'></span>
							)}
							{isSubmitting ? 'Connecting...' : 'Connect'}
						</button>
					</div>
				</form>
				<p className='mt-[8rem] text-info'>
					Please Provide a valid ETH wallet as this where your funds will be
					sent
				</p>
			</section>
		</>
	);
}
