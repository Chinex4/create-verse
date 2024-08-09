'use client';
import { useEffect, useState } from 'react';
import HomeCarousel from '../components/HomeCrousel';
import NFTCarousel from '../components/NFTCAROUSEL';
import ethCoin from '@/public/coins.png';

import { toast } from 'react-toastify';
import Image from 'next/image';

export default function Dashboard() {
	const [nfts, setNfts] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const fetchNFTs = async () => {
			setIsSubmitting(true);
			try {
				const response = await fetch('/api/nfts');

				// Log the status and response to debug
				// console.log('Response Status:', response.status);

				const data = await response.json();
				// console.log('Fetched Data:', data);

				if (!response.ok) {
					toast.error(data.error || 'Failed to Load Nfts.');
				} else {
					setNfts(data);
				}
			} catch (error) {
				toast.error(`An error occurred: ${error.message}`);
				console.error('Fetch error:', error);
			} finally {
				setIsSubmitting(false);
			}
		};

		fetchNFTs();
	}, []);

	// console.log(nfts);
	return (
		<>
			<section className='my-8 px-6 lg:px-[4rem] mt-[7.5rem]'>
				<div className='flex flex-col lg:flex-row-reverse space-y-6 lg:space-y-0 lg:items-center lg:justify-between'>
					<div>
						<HomeCarousel />
					</div>
					<div className='lg:basis-[40%] text-center lg:text-left space-y-4'>
						<h1 className='text-3xl lg:text-5xl text-primary font-bold'>
							Explore a vast array of NFTs from artists around the globe,
							discover a whole new way to own, trade and experience art.
						</h1>
					</div>
				</div>
			</section>

			{/* Latest Drops */}

			<section className='my-14 lg:my-[8rem] px-6 lg:px-[4rem]'>
				<h1 className='text-3xl lg:text-[3rem] font-bold text-primary text-center'>
					Latest Drops
				</h1>
				{/* <NFTCarousel isLoggedIn={true} /> */}

				<ul className='mt-10 carousel w-full carousel-center p-4 lg:py-8 lg:px-4 space-x-4 bg-base-200 rounded-box'>
					{nfts.map(({ id, fileUrl, name, price, owner }) => {
						return (
							<div key={id} className='carousel-item p-0'>
								<div
									className='card lg:hover:-translate-y-4 hover:cursor-pointer duration-500 card-compact w-[15rem] lg:w-72 bg-base-100 shadow-xl'>
									<div
										className='rounded-xl w-full h-[240px] bg-cover bg-center'
										style={{ backgroundImage: `url(${fileUrl})` }}></div>
									<div className='card-body'>
										<h2 className='card-title font-bold capitalize'>{name}</h2>
										<p className='text-stone-500 flex space-x-1 items-center '>
											<span className=''>Price:</span>
											<span>{price} ETH</span>
											<Image
												src={ethCoin}
												alt='ethcoin'
												width={20}
												height={20}
											/>
										</p>
										<p className='flex space-x-1 items-center items-center '>
											<span>Created By:</span>
											<span className='font-semibold'>
												{owner.firstName} {owner.lastName}
											</span>
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</ul>
			</section>
		</>
	);
}
