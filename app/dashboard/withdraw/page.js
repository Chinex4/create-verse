'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
	amount: yup.number().required('Amount is required.'),
	address: yup.string().required('Wallet address is required.'),
});

export default function WithdrawPage() {
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [user, setUser] = useState(null);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		const token = localStorage.getItem('token');
		console.log(data);

		const formData = new FormData();
		formData.append('amount', data.amount);
		formData.append('address', data.address);
		formData.append('token', token);

		try {
			const response = await fetch('/api/withdraw', {
				method: 'POST',
				body: formData,
			});

			const result = await response.json();
			if (response.ok) {
				toast.error('Withdraw Failed');
				setErrorMessage('An error occurred please contact ');
				reset();
				// router.push('/dashboard/profile');
				// router.refresh();
			} else {
				toast.error(result.error || 'Withdraw failed');
				setErrorMessage(result.error || 'An error occurred please contact ');
			}
		} catch (error) {
			toast.error(`An error occurred: ${error.message}`);
			setErrorMessage('An error occurred please contact ');
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (!token) {
			router.push('/register/login');
		} else {
			fetch('/api/user', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						toast.error(data.error);
						router.push('/register/login');
					} else {
						setUser(data);
					}
				})
				.catch(() => {
					toast.error('Failed to fetch user data');
					router.push('/register/login');
				});
		}
	}, [router]);

	if (!user) {
		return (
			<div className='grid w-full min-h-screen place-items-center'>
				<span className='loading loading-dots loading-lg'></span>
			</div>
		);
	}

	return (
		<section className='w-full lg:w-[35rem] mt-20 lg:mx-auto bg-white px-6 py-8 md:p-10 lg:p-16'>
			<h1 className='text-3xl md:text-4xl font-bold text-primary'>Withdraw</h1>
			{errorMessage && (
				<div className='p-4 mt-4 mb-4 text-red-700 bg-red-100 border border-red-400'>
					{errorMessage}
					<a
						className='link text-primary hover:text-primary/50'
						href='mailto:createverse@gmail.com'>
						Support
					</a>
				</div>
			)}
			{successMessage && (
				<div className='p-4 mt-4 mb-4 text-green-700 bg-green-100 border border-green-400'>
					{successMessage}
					<a
						className='link text-primary hover:text-primary/50'
						href='mailto:createverse@gmail.com'>
						Support
					</a>
				</div>
			)}

			<p className='mt-8 text-sm'>
				Please specify the amount to be withdrawn and the wallet address where
				your withdrawn tokens will be sent.
			</p>

			<form
				method='POST'
				className='mt-8 space-y-8'
				onSubmit={handleSubmit(onSubmit)}>
				{/* Amount */}
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold'
						for='amountToWithdraw'>
						Amount
					</label>
					<input
						type='number'
						id='amount'
						name='amount'
						{...register('amount')}
						className='w-full input input-bordered'
						placeholder='0.00 ETH'
					/>
					{errors.amount && (
						<p className='mt-2 text-xs text-red-500'>{errors.amount.message}</p>
					)}
				</div>
				<div className='mb-4'>
					<label
						className='block mb-2 text-sm font-bold'
						for='amountToWithdraw'>
						Wallet Address
					</label>
					<input
						type='text'
						id='address'
						name='address'
						{...register('address')}
						className='w-full input input-bordered'
						placeholder='Paste your wallet address here.'
					/>
					{errors.address && (
						<p className='mt-2 text-xs text-red-500'>
							{errors.address.message}
						</p>
					)}
				</div>
				{/* Withdraw Button */}
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
						{isSubmitting ? 'Confirming...' : 'Withdraw'}
					</button>
				</div>
			</form>
		</section>
	);
}
