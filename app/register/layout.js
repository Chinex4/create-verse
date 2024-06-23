'use client';
import Link from 'next/link';
import logo2 from '@/public/logo2.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
	const router = useRouter();
	const pathname = router.pathname;

	return (
		<div class='w-full lg:min-h-screen flex flex-col md:flex-row'>
			<div class='w-full md:w-1/2 bg-primary p-8 md:p-10 lg:p-16'>
				<div class='text-white space-y-8 md:space-y-12 lg:space-y-16'>
					<Link
						href='/'
						class='text-xl md:text-2xl lg:text-5xl font-bold flex items-center space-x-2'>
						<Image
							src={logo2}
							width={40}
							alt='logo2'
						/>
						<span className='font-bold'>CreateVerse</span>
					</Link>
					<p class='text-sm md:text-lg lg:text-xl lg:tracking-wide leading-16 text-justify'>
						<span class='block'>Welcome to CreateVerse!</span>
						{
							pathname === "/register/signup" ? (
								"Step into the world where art meets innovation. Create an account to discover exclusive digital treasures, Carefully crafted by talented artists from around the globe."
							) : (
								"Explore, collect, and own a piece of the future. Your Gateway to the NFT universe awaits... Login now and unleash the creativity!"
							)
						}
					</p>
				</div>
			</div>
			<div class='w-full md:w-1/2 bg-white py-8 px-0 lg:px-12 md:py-10 lg:py-16'>
				{children}
			</div>
		</div>
	);
}
