'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';


export default function Layout({ children }) {
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
		return (
			<div className='w-full min-h-screen grid place-items-center'>
				<span className='loading loading-dots loading-lg'></span>
			</div>
		);
	}
	return (
		<div className='w-full bg-white'>
			<DashboardHeader user={user} />
                {children}
			<DashboardFooter />
		</div>
	);
}
