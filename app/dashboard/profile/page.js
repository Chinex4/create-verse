'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import userImg from '@/public/user.png';
import Link from 'next/link';

export default function Page() {
	const [user, setUser] = useState(null);
	const [nfts, setNfts] = useState([]);
	const [loadingNfts, setloadingNfts] = useState(false);
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

			try {
				setloadingNfts(true);
				fetch('/api/user/nfts', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.error) {
							toast.error(`${data.error}: ${data.details}`);
						} else {
							setNfts(data);
						}
					})
					.catch((err) => {
						toast.error(`Failed to fetch NFTs: ${err.message}`);
					});
			} catch (error) {
				toast.error(`Failed to fetch NFTs: ${error.message}`);
			} finally {
				setloadingNfts(false);
			}
		}
	}, [router]);

	if (!user) {
		return (
			<div className='w-full min-h-screen grid place-items-center'>
				<span className='loading loading-dots text-secondary w-[4rem]'></span>
			</div>
		);
	}
	return (
		<div className='mb-[15rem] px-6 lg:px-[20rem] mt-[6rem]'>
			<section className=' space-y-4'>
				<div className={`w-[200px] rounded-full mx-auto`}>
					<Image
						width={200}
						height={200}
						src={user.profilePicture || userImg}
						alt='profilepic'
						priority
						className='rounded-full'
					/>
				</div>
				<div className='text-center space-y-2'>
					<h2 className='text-2xl font-bold'>@{user.username}</h2>
					{user.walletAddress && (
						<p className='text-xs'>
							Wallet Address:{' '}
							<span className='font-light font-mono overflow-hidden'>
								{user.walletAddress}
							</span>
						</p>
					)}
				</div>
			</section>

			<section className='flex items-center my-10 flex-col gap-4'>
				<div className='space-y-2'>
					<h2 className='font-semibold text-lg lg:text-xl'>Balance:</h2>
					<p className='font-light'>0.0000ETH</p>
				</div>

				<div>
					<Link
						href={'/dashboard/deposit'}
						Deposit
						className='btn bg-primary hover:bg-primary/70 text-white px-10 py-3'>
						Deposit
					</Link>
					<Link
						href={'/dashboard/withdraw'}
						Withdraw
						className='btn bg-primary hover:bg-primary/70 text-white px-10 py-3'>
						Withdraw
					</Link>
				</div>
			</section>

			<section className='mb-10'>
				<h1 className='text-3xl font-bold'>Your NFTs</h1>
				{loadingNfts && (
					<div className='flex w-52 flex-col gap-4'>
						<div className='skeleton h-48 w-full'></div>
						<div className='skeleton h-4 w-28'></div>
						<div className='skeleton h-4 w-full'></div>
						<div className='skeleton h-4 w-full'></div>
					</div>
				)}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
					{nfts.length > 0 ? (
						nfts.map((nft) => (
							<div
								key={nft.id}
								className='border p-4 rounded-lg'>
								<Image
									src={`${nft.fileUrl}`}
									alt={nft.name}
									className='w-full h-48 object-cover rounded-md mb-4'
									priority
									width={'99'}
									height={48}
								/>
								<h2 className='text-lg font-semibold'>{nft.name}</h2>
								{nft.description && (
									<p className='text-sm text-gray-500'>{nft.description}</p>
								)}
								<div className='flex justify-between mt-2'>
									<span className='text-sm font-medium'>
										Price: {nft.price} ETH
									</span>
									<span className='text-sm font-medium'>
										Royalties: {nft.royalties}%
									</span>
								</div>
							</div>
						))
					) : (
						<p className='text-gray-600'>No NFTs found</p>
					)}
				</div>
			</section>
		</div>
	);
}
