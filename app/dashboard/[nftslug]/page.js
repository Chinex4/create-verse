import { notFound } from 'next/navigation';
import { getNFTData } from '@/app/lib/data';
import NFTPage from '@/app/components/NFTPage';

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

export default function Page({ params }) {
	const nft = getNFTData(params.nftslug);
	if (!nft) {
		notFound();
	}
	
	return (
		<div className='my-8'>
			<NFTPage
				isLoggedin={true}
				nft={nft}
			/>
		</div>
	);
}
