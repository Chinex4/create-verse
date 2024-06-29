'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const schema = yup.object().shape({
	file: yup.mixed().required('Choose a file to upload'),
	price: yup
		.number()
		.positive('Price must be positive')
		.required('Price is required'),
	name: yup.string().required('Name is required'),
	description: yup.string(),
	royalties: yup
		.number()
		.min(10, 'Minimum is 10%')
		.max(50, 'Maximum is 50%')
		.required('Royalties are required'),
});

export default function Page() {
	const [errorMessage, setErrorMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMessage, setsuccessMessage] = useState('');
	const [filePreview, setfilePreview] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const router = useRouter();

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		const token = localStorage.getItem('token');

		const formData = new FormData();
		formData.append('file', data.file[0]);
		formData.append('price', data.price);
		formData.append('name', data.name);
		formData.append('description', data.description);
		formData.append('royalties', data.royalties);
		formData.append('token', token);

		for (let pair of formData.entries()) {
			console.log(pair[0] + ': ' + pair[1]); // Logging form data for debug
		}

		try {
			const response = await fetch('/api/create', {
				method: 'POST',
				body: formData,
			});
			const result = await response.json();
			if (response.ok) {
				toast.success('NFT created successfully!');
				setsuccessMessage('NFT created successfully!');
				reset();
				router.push('/dashboard/profile');
				router.refresh();
			} else {
				toast.error(result.error || 'NFT creation failed');
				setErrorMessage(result.error || 'NFT creation failed');
			}
		} catch (error) {
			toast.error(`An error occurred: ${error.message}`);
			setErrorMessage('NFT creation failed');
		} finally {
			setIsSubmitting(false);
		}
	};



	const handleChange = (e) => {
		const file = e.target.files[0];
		setValue('file', file);
		setfilePreview(URL.createObjectURL(file));
	};

	return (
		<div className='w-full lg:w-[35rem] mt-10 lg:mx-auto bg-white px-6 py-8 md:p-10 lg:p-16'>
			<h1 className='text-3xl md:text-4xl font-bold text-primary'>
				Create New NFT
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
				className='mt-8'
				onSubmit={handleSubmit(onSubmit)}>
				{/* FIle */}
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='file'>
						Upload File
					</label>
					<input
						id='file'
						name='file'
						type='file'
						{...register('file')}
						onChange={handleChange}
						className='file-input file-input-bordered w-full'
					/>
					{errors.file && (
						<p className='text-red-500 text-xs mt-2'>{errors.file.message}</p>
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
				{/* Name */}
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='name'>
						Name
					</label>
					<input
						id='name'
						name='name'
						type='text'
						placeholder='e. g. "Redeemable T-Shirt with logo"'
						{...register('name')}
						className='input input-bordered w-full'
					/>
					{errors.name && (
						<p className='text-red-500 text-xs mt-2'>{errors.name.message}</p>
					)}
				</div>
				{/* Description */}
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='description'>
						Description
					</label>
					<textarea
						id='description'
						{...register('description')}
						placeholder='e. g. "After purchasing you will be able to get the real T-shirt"'
						className='textarea textarea-bordered w-full'></textarea>
					{errors.description && (
						<p className='text-red-500 text-xs mt-2'>
							{errors.description.message}
						</p>
					)}
				</div>
				{/* Price */}
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='price'>
						Price (ETH)
					</label>
					<input
						id='price'
						name='price'
						type='number'
						step={0.01}
                        defaultValue={0.00}
						placeholder='Enter price'
						{...register('price')}
						className='input input-bordered w-full'
					/>
					{errors.price && (
						<p className='text-red-500 text-xs mt-2'>{errors.price.message}</p>
					)}
				</div>
				{/* Royalties */}
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='royalties'>
						Royalties (%)
					</label>
					<input
						id='royalties'
						name='royalties'
						type='number'
                        defaultValue={10}
                        step={5}
						{...register('royalties')}
						className='input input-bordered w-full'
					/>
					{errors.royalties && (
						<p className='text-red-500 text-xs mt-2'>
							{errors.royalties.message}
						</p>
					)}
				</div>
				{/* Button */}
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
						{isSubmitting ? 'Creating...' : 'Create NFT'}
					</button>
				</div>
			</form>
		</div>
	);
}
