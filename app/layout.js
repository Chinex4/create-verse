import { Inter } from 'next/font/google';
import './globals.css';
import logo2 from '@/public/logo2.png';
import Image from 'next/image';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Verse',
	description: 'NFT Market Place',
};

export default function RootLayout({ children }) {
	return (
		<html
			data-theme='light'
			lang='en'>
			<body className={`${inter.className}`}>
				<main className='lg:px-[4rem]'>{children}</main>
				<section class='w-full py-8 px-4 lg:px-28 lg:py-8 md:p-20 bg-primary'>
					<h1 class='text-2xl md:text-3xl font-bold text-white flex items-center space-x-6'>
						<Image
							src={logo2}
							width={50}
						/>
						<span>CreateVerse</span>
					</h1>
					<div class='text-center text-white mt-8 space-y-6'>
						<p class='text-sm'>
							Quality customer support is the cornerstone of our NFT project.
							We're here to assist you every step of the way, whether you have
							questions, encounter issues, or simply want to share your
							thoughts. Your satisfaction and success are our top priorities,
							and we're committed to providing the best support experience
							possible. Feel free to reach out to us, and together, we'll make
							your NFT journey a smooth and rewarding one.
						</p>
						<div>
							<a
								href='mailto:createverse@gmail.com'
								class='block lg:inline-block bg-white text-blue-900 transition-all hover:shadow-2xl px-6 py-3 rounded-md'>
								Find Out More
							</a>
						</div>
					</div>
					<div class='mt-10 space-y-8'>
						<hr class='bg-gray-50' />
						<p class='text-white text-center'>
							&copy; 2023 CREATEVERSE. All rights reserved.
						</p>
					</div>
				</section>
			</body>
		</html>
	);
}
