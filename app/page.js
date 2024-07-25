// pages/index.js
import MainHeader from './components/MainHeader';
import HomeCrousel from './components/HomeCrousel';
import NFTCarousel from './components/NFTCAROUSEL';
import Link from 'next/link';
import StepsContainer from './components/StepsContainer';
import Footer from './components/Footer';
// import { motion } from 'framer-motion';

export default function Home() {
	return (
		<>
			<MainHeader />

			<section className='my-8 px-6 lg:px-[4rem] mt-[7.5rem]'>
				<div className='flex flex-col space-y-6 lg:flex-row-reverse lg:space-y-0 lg:items-center lg:justify-between'>
					<div
						// initial={{ y: 100, opacity: 0 }}
						// animate={{ y: 0, opacity: 1 }}
						// transition={{ type: 'spring', stiffness: 120, duration: 0.8 }}
						>
						<HomeCrousel />
					</div>
					<div
						// initial={{ x: -200, opacity: 0 }}
						// animate={{ x: 0, opacity: 1 }}
						// transition={{ type: 'tween', duration: 1, delay: 0.3 }}
						className='lg:basis-[40%] text-center lg:text-left space-y-4'>
						<h1 className='text-3xl font-bold lg:text-5xl text-primary'>
							Step into a world of digital creativity and innovation with
							CreateVerse.
						</h1>
						<p>
							Explore a vast array of NFTs from artists around the globe,
							discover a whole new way to own, trade and experience art.
						</p>
						<Link
							className='text-white btn bg-primary hover:bg-primary/70'
							href={'/register/signup'}>
							Get Started
						</Link>
					</div>
				</div>
			</section>

			{/* Create and sell your NFTs */}

			<section className='my-14 lg:my-[8rem] px-6 lg:px-[4rem]'>
				<div className='space-y-4 text-center'>
					<h1 className='text-3xl lg:text-[3rem] font-bold text-primary'>
						Create and sell your NFTs
					</h1>
					<p className='text-stone-500'>
						Steps on how to easily create and sell your NFTs in CreateVerse
						Market
					</p>
				</div>

				<StepsContainer />
			</section>

			{/* Latest Drops */}

			<section className='my-14 lg:my-[8rem] px-6 lg:px-[4rem]'>
				<h1 className='text-3xl lg:text-[3rem] font-bold text-primary text-center'>
					Latest Drops
				</h1>
				<NFTCarousel isLoggedIn={false} />
			</section>

			<Footer />
		</>
	);
}
