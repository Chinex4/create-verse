// components/NFTCarousel.js
import { nftData } from '../lib/data';
import NFTCard from './NFTCARD';


export default function NFTCarousel({isLoggedIn}) {
  return (
    <div className="mt-10 carousel w-full carousel-center p-4 lg:py-8 lg:px-4 space-x-4 bg-base-200 rounded-box">
      {nftData.map((nft, index) => (
        <div key={index} className="carousel-item p-0">
          <NFTCard isLoggedIn={isLoggedIn} {...nft} />
        </div>
      ))}
    </div>
  );
}