'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Dashboard() {
	const [user, setUser] = useState(null);
	const router = useRouter();

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
		return <div>Loading...</div>;
	}

	return (
		<div className='w-full bg-white px-6 py-8 md:p-10 lg:p-16'>
			<h1 className='text-3xl md:text-4xl font-bold'>Dashboard</h1>
			<div className='mt-8'>
				<p className='text-lg'>
					<strong>Username:</strong> {user.username}
				</p>
				<p className='text-lg'>
					<strong>First Name:</strong> {user.firstName}
				</p>
				<p className='text-lg'>
					<strong>Last Name:</strong> {user.lastName}
				</p>
			</div>
		</div>
	);
}
