'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

// const schema = yup.object().shape({
// 	walletAddress: yup
// 		.string()
// 		.matches(ethAddressRegex, 'Invalid ETH wallet address')
// 		.required('Please provide your ETH Wallet Address'),
// });

export default function Page() {
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setsuccessMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	const onSubmit = async () => {
		setIsSubmitting(true);

		const token = localStorage.getItem('token');

		try {
			const response = await fetch('/api/connect', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			});
			const result = await response.json();
			if (response.ok) {
				toast.success('Wallet connected successfully!');
				setsuccessMessage('Wallet connected successfully!');
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
				<p className='mt-[8rem] text-info font-mono'>
					Please note, an ETH wallet address will be assigned to you.
				</p>
				<div className='mt-16 mb-4'>
					<button
						type='submit'
						disabled={isSubmitting}
						onClick={onSubmit}
						className={`btn bg-primary hover:bg-primary/70 text-white w-full ${
							isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
						}`}>
						{isSubmitting && (
							<span className='loading loading-dots loading-md'></span>
						)}
						{isSubmitting
							? 'Generating Wallet...'
							: 'Generate ETH Wallet Address'}
					</button>
				</div>
			</section>
		</>
	);
}
