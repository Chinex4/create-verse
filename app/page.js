import Image from 'next/image';
import MainHeader from './components/MainHeader';
import HomeCrousel from './components/HomeCrousel';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<MainHeader />

			<section className='my-8 px-6'>
				<div className='flex flex-col lg:flex-row-reverse space-y-6 lg:space-y-0 lg:items-center lg:justify-between'>
					<div>
						<HomeCrousel />
					</div>
					<div className='lg:basis-[40%] text-center lg:text-left space-y-4'>
						<h1 className='text-3xl lg:text-5xl text-primary font-bold'>
							Step into a world of digital creativity and innovation with
							CreateVerse.
						</h1>
						<p>
							Explore a vast array of NFTs from artists around the globe,
							discover a whole new way to own, trade and experience art.
						</p>
            <Link className='btn bg-primary text-white hover:bg-primary/70' href={'/signup'}>Get Started</Link>
					</div>
				</div>
			</section>

			<section className="my-10 px-6">
				<h1 className="text-2xl lg:text-3xl font-[600]">
					Latest Drops
				</h1>
				<hr className="mt-4 border-secondary"/>
			</section>
		</>
	);
}
