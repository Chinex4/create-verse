import { notFound } from "next/navigation";
import { getNFTData } from "../lib/data";
import MainHeader from "../components/MainHeader";
import Image from "next/image";
import ethcoin from "@/public/coins.png";

export function generateMetadata({ params }) {
	const nft = getNFTData(params.nftslug);
	if (!nft) {
		notFound();
	}
	return {
		title: nft.creator,
		description: nft.description,
	};
}

export default function Page({params}) {
    const nft = getNFTData(params.nftslug)

    if (!nft) {
        notFound()
    }
    return (
			<div>
				<MainHeader />

				<div className='mt-32 px-6 lg:px-[4rem] flex flex-col md:flex-row justify-between'>
					<Image
						src={nft.image}
						alt={nft.creator}
						width={400}
						height={400}
						className='rounded-xl shadow-xl w-full md:w-[300px] lg:w-[400px]'
					/>
					<div className='md:basis-[50%] lg:basis[60%]'>
						<h1 className='text-[3rem] font-bold'>{nft.creator}</h1>
						<p className="text-xl font-semibold flex items-center space-x-2">
							<span>{nft.price}</span>
							<Image src={ethcoin} width={30} height={30}/>
						</p>
						<p>
							{nft.description}
						</p>
					</div>
				</div>
			</div>
		);
}