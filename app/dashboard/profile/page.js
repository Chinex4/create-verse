'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import userImg from '@/public/user.png'

export default function Page() {
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
		<div className='mb-[15rem] px-6 lg:px-[20rem] mt-[6rem]'>
			<section className=' space-y-4'>
				<div className='w-[200px] rounded-full bg-gray-400 mx-auto'>
					<Image
						width={200}
						height={200}
						src={userImg}
						alt='profilepic'
						priority
					/>
				</div>
				<div className='text-center space-y-2'>
					<h2 className='text-2xl font-bold'>
						{user.firstName} {user.lastName}
					</h2>
					<p>@{user.username}</p>
				</div>
			</section>

            <section className='flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-20 mt-6'>
                <div className='space-y-2'>
                    <h2 className='font-semibold text-lg lg:text-xl'>
                        Balance:
                    </h2>
                    <p className='font-light'>
                        0.0000ETH
                    </p>
                </div>
                <div className='space-y-2'>
                    <h2 className='font-semibold text-lg lg:text-xl'>
                        Balance:
                    </h2>
                    <p className='font-light'>
                        0.0000ETH
                    </p>
                </div>
                <div className='space-y-2'>
                    <h2 className='font-semibold text-lg lg:text-xl'>
                        Balance:
                    </h2>
                    <p className='font-light'>
                        0.0000ETH
                    </p>
                </div>
            </section>
		</div>
	);
}
