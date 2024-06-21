import { notFound } from 'next/navigation';
import { getNFTData } from '../lib/data';
import NFTPage from '../components/NFTPage';
import DashboardFooter from '../components/DashboardFooter';
import DashboardHeader from '../components/DashboardHeader';

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
		<div>
			<NFTPage nft={nft} />
			
		</div>
	);
}
