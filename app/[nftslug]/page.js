import { notFound } from "next/navigation";
import { getNFTData } from "../lib/data";
import MainHeader from "../components/MainHeader";
import NFTPage from "../components/NFTPage";
import Footer from "../components/Footer";

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
            <MainHeader />
            <NFTPage nft={nft} />
								<Footer />
        </div>
    );
}