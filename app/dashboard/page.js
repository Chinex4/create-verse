import HomeCarousel from '../components/HomeCrousel';
import NFTCarousel from '../components/NFTCAROUSEL';

export default function Dashboard() {
	

	return (
		<>
			<section className='my-8 px-6 lg:px-[4rem] mt-[7.5rem]'>
				<div className='flex flex-col lg:flex-row-reverse space-y-6 lg:space-y-0 lg:items-center lg:justify-between'>
					<div>
						<HomeCarousel />
					</div>
					<div className='lg:basis-[40%] text-center lg:text-left space-y-4'>
						<h1 className='text-3xl lg:text-5xl text-primary font-bold'>
							Explore a vast array of NFTs from artists around the
							globe, discover a whole new way to own, trade and experience art.
						</h1>
					</div>
				</div>
			</section>

			{/* Latest Drops */}

			<section className='my-14 lg:my-[8rem] px-6 lg:px-[4rem]'>
				<h1 className='text-3xl lg:text-[3rem] font-bold text-primary text-center'>
					Latest Drops
				</h1>
				<NFTCarousel />
			</section>

		</>
	);
}
