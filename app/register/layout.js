import Link from "next/link";
import logo2 from '@/public/logo2.png';
import Image from "next/image";

export default function Layout({ children }) {
	return (
		<div class='w-full lg:min-h-screen flex flex-col md:flex-row'>
			<div class='w-full md:w-1/2 bg-primary p-8 md:p-10 lg:p-16'>
				<div class='text-white space-y-8 md:space-y-12 lg:space-y-16'>
					<Link
						href='/'
						class='text-xl md:text-2xl lg:text-6xl font-bold flex items-center space-x-2'>
						<Image
							src={logo2}
							width={40}
						/>
						<span className='font-bold'>CreateVerse</span>
					</Link>
					<p class='text-sm md:text-lg lg:text-xl lg:tracking-wide leading-16 text-justify'>
						<span class='block'>Welcome to CreateVerse!</span>
						Are you ready to embark on a journey into the world of digital art
						and collectibles? Join our vibrant community of artists, collectors,
						and enthusiasts by signing up for a free account today. Becoming a
						member of CreateVerse unlocks a world of creative possibilities and
						unique opportunities.
					</p>
				</div>
			</div>
			<div class='w-full md:w-1/2 bg-white p-8 md:p-10 lg:p-16'>
                {children}
			</div>
		</div>
	);
}
