'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';

const schema = yup.object().shape({
	file: yup.mixed().required('Choose an Image to upload'),
	// confirmNewPassword: yup
	// 	.string()
	// 	.oneOf([yup.ref('password')], 'Passwords must match'),
});

export default function DepositPage() {
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [user, setUser] = useState(null);
	const [filePreview, setFilePreview] = useState(null);
    const [copied, setCopied] = useState(false)
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
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
		formData.append('file', data.file);
		formData.append('token', token);

		try {
			const response = await fetch('/api/deposit', {
				method: 'POST',
				body: formData,
			});

			const result = await response.json();
			if (response.ok) {
				toast.error('An error occurred please contact ');
				setErrorMessage('An error occurred please contact ');
				reset();
				router.push('/dashboard/profile');
				router.refresh();
			} else {
				toast.error(result.error || 'Deposit failed');
				setErrorMessage(result.error || 'An error occurred please contact ');
			}
		} catch (error) {
			toast.error(`An error occurred: ${error.message}`);
			setErrorMessage('An error occurred please contact ');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		setValue('file', file);
		setFilePreview(URL.createObjectURL(file));
	};

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(user.walletAddress)
			.then(() => {
				setCopied((prev) => !prev);
			})
			.catch((error) => {
				console.error('Failed to copy text: ', error);
			});
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
		<section className='w-full lg:w-[55rem] mt-10 lg:mx-auto bg-white px-6 py-8 md:p-10 lg:p-16'>
			<h1 className='text-3xl font-bold md:text-4xl'>Deposit</h1>
			{errorMessage && (
				<div className='p-4 mt-4 mb-4 text-red-700 bg-red-100 border border-red-400'>
					{errorMessage}
					<a className='link text-primary hover:text-primary/50' href='mailto:createverse@gmail.com'>Support</a>
				</div>
			)}
			{successMessage && (
				<div className='p-4 mt-4 mb-4 text-green-700 bg-green-100 border border-green-400'>
					{successMessage}
					<a className='link text-primary hover:text-primary/50' href='mailto:createverse@gmail.com'>Support</a>
				</div>
			)}
			<div className='flex items-center w-full p-5 space-x-4 rounded-xl text-primary'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'
					className='w-20 h-20'>
					<path
						fillRule='evenodd'
						d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
						clip-rule='evenodd'
					/>
				</svg>
				<p className='text-lg'>
					Please the only accepted digital currency is Ethereum(ETH),
					CREATEVERSE won't be liable for any loss of funds. Thank you!
				</p>
			</div>
			<div className='w-full p-6 space-y-8 rounded-xl'>
				<p className='text-2xl font-bold text-gray-500'>
					DEPOSIT AND SUBMIT PROOF TO TOP UP YOUR BALANCE
				</p>

				{/* <div className='relative text-left'>
					<p className=''>Select Crypto Wallet</p>
					<select
						className='w-full px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none'
						name='selectCurrency'
						id='selectCurrency'>
						<option value='1'>Ethereum</option>
					</select>
				</div> */}

				<div className='space-y-4'>
					<div className='flex flex-col items-center justify-center w-full lg:flex-row lg:space-x-4'>
						<div className='relative'>
							<input
								readonly
								type='text'
								value={user.walletAddress ?? 'Please connect your wallet'}
								className='w-48 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-primary'
							/>
							<button
								id='copyButton'
								className='px-3 py-1 ml-2 text-white rounded cursor-pointer bg-primary'
								onClick={copyToClipboard}
								disabled={copied}>
								{!copied ? 'Copy' : 'Copied'}
							</button>
						</div>
					</div>
					<p className='text-sm text-warning'>
						Copy this wallet address and proceed to payment. Network: Ethereum{' '}
						<br />
						NOTE: Please the only accepted digital currency is Ethereum(ETH),
						<span className='font-semibold'>CREATEVERSE</span> won't be liable
						for any loss of funds
					</p>
				</div>

				<form
					method='POST'
					className='mt-8 space-y-8'
					onSubmit={handleSubmit(onSubmit)}>
					{/* Amount */}
					<div className='mb-4'>
						<label
							className='block mb-2 text-sm font-bold'
							for='amountToDeposit'>
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
						{errors.file && (
							<p className='mt-2 text-xs text-red-500'>{errors.file.message}</p>
						)}
					</div>
					{/* Proof of payment Upload */}
					<div className='mb-4'>
						<label
							className='block mb-2 text-sm font-bold'
							htmlFor='file'>
							Upload Proof of Payment
						</label>
						<input
							id='file'
							name='file'
							type='file'
							// {...register('file')}
							onChange={handleChange}
							className='w-full file-input file-input-bordered'
						/>
						{errors.file && (
							<p className='mt-2 text-xs text-red-500'>{errors.file.message}</p>
						)}
						{filePreview && (
							<Image
								src={filePreview}
								width={300}
								height={300}
								alt='filePreview'
								className='mt-4'
								priority
							/>
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
							{isSubmitting ? 'Confirming...' : 'Done'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
