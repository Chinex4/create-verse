'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const schema = yup.object().shape({
	file: yup.mixed().required('Choose an Image to upload'),
	// confirmNewPassword: yup
	// 	.string()
	// 	.oneOf([yup.ref('password')], 'Passwords must match'),
});

export default function Page() {
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [user, setUser] = useState(null);
	const [filePreview, setFilePreview] = useState(null);

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
		console.log(data);

		const formData = new FormData();
		formData.append('file', data.file);
		formData.append('token', token);

		try {
			const response = await fetch('/api/updateprofile', {
				method: 'POST',
				body: formData,
			});

			const result = await response.json();
			if (response.ok) {
				toast.success('Profile Updated successfully!');
				setSuccessMessage('Profile Updated successfully!');
				reset();
				router.push('/dashboard/profile');
				router.refresh();
			} else {
				toast.error(result.error || 'Profile Update failed');
				setErrorMessage(result.error || 'Profile Update failed');
			}
		} catch (error) {
			toast.error(`An error occurred: ${error.message}`);
			setErrorMessage('Profile Update failed');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		setValue('file', file);
		setFilePreview(URL.createObjectURL(file));
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
				<div className='w-full min-h-screen grid place-items-center'>
					<span className='loading loading-dots loading-lg'></span>
				</div>
			);
		}

	return (
		<div className='w-full lg:w-[35rem] mt-10 lg:mx-auto bg-white px-6 py-8 md:p-10 lg:p-16'>
			<h1 className='text-3xl md:text-4xl font-bold'>Update Profile</h1>
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
				{/* File */}
				<div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='file'>
						Upload Profile Picture
					</label>
					<input
						id='file'
						name='file'
						type='file'
						// {...register('file')}
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
						className='input input-bordered w-full'
						value={user.username}
						disabled
					/>
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
						className='input input-bordered w-full'
						value={user.email}
						disabled
					/>
				</div>
				{/* <div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='password'>
						New Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						{...register('newPassword')}
						className='input input-bordered w-full'
						defaultValue={''}
					/>
					{errors.password && (
						<p className='text-red-500 text-xs mt-2'>
							{errors.newPassword.message}
						</p>
					)}
				</div> */}
				{/* <div className='mb-4'>
					<label
						className='block text-sm font-bold mb-2'
						htmlFor='confirmNewPassword'>
						Confirm New Password
					</label>
					<input
						id='confirmNewPassword'
						name='confirmNewPassword'
						type='password'
						{...register('confirmNewPassword')}
						className='input input-bordered w-full'
					/>
					{errors.confirmNewPassword && (
						<p className='text-red-500 text-xs mt-2'>
							{errors.confirmNewPassword.message}
						</p>
					)}
				</div> */}
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
						{isSubmitting ? 'Updating...' : 'Update Profile'}
					</button>
				</div>
			</form>
		</div>
	);
}
