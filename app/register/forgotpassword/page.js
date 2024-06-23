'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});

export default function ForgotPasswordPage() {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        try {
            const response = await fetch('/api/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                toast.success('Password reset link sent!');
				setSuccessMessage("Password reset link sent. Check your mail!")
                reset();
				setTimeout(() => {
					router.push("/register/login")
				}, 500)
            } else {
                toast.error(result.error || 'Failed to send reset link');
                setErrorMessage(result.error || 'Failed to send reset link');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred');
            setErrorMessage('Failed to send reset link');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
			<div className='w-full bg-white px-6 py-8 md:p-10 lg:p-16'>
				<h1 className='text-3xl md:text-4xl font-bold'>Forgot Password</h1>
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
				<p className='text-sm mt-4 text-info'>
					Please input the email you used in signing up for Create Verse, so
					that a password reset link can be sent to your email.
				</p>
				<form
					method='POST'
					className='mt-8'
					onSubmit={handleSubmit(onSubmit)}>
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
							<p className='text-red-500 text-xs mt-2'>
								{errors.email.message}
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

                    <div className='grid place-items-center'>
                        <Link href={"./login"} className='text-primary hover:text-primary/50'>Go back</Link>
                    </div>
				</form>
			</div>
		);
}
