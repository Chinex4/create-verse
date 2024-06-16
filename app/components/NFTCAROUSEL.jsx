// components/NFTCarousel.js
import NFTCard from './NFTCARD';
import firstimg from '@/public/TRENDING/IMG-20231010-WA0035.jpg'
import secondimg from '@/public/TRENDING/IMG-20231010-WA0036.jpg'
import thirdimg from '@/public/TRENDING/IMG-20231010-WA0037.jpg'
import fourthimg from '@/public/TRENDING/IMG-20231010-WA0038.jpg'
import fifthimg from '@/public/TRENDING/IMG-20231010-WA0039.jpg'
import sixthimg from '@/public/TRENDING/IMG-20231010-WA0040.jpg'

const nftData = [
  {
    image: firstimg,
    price: 2.5,
    availability: 'Available',
    date: '2024-06-01',
  },
	{
    image: secondimg,
    price: 2.5,
    availability: 'Available',
    date: '2024-06-03'
	},
	{
    image: thirdimg,
    price: 2.5,
    availability: 'Available',
    date: '2024-06-03'
	},
	{
    image: fourthimg,
    price: 2.5,
    availability: 'Available',
    date: '2024-06-03'
	},
	{
    image: fifthimg,
    price: 2.5,
    availability: 'Available',
    date: '2024-06-03'
	},
	{
    image: sixthimg,
    price: 2.5,
    availability: 'Available',
    date: '2024-06-03'
	},
	
  // Add 7 more items with the same structure
];

export default function NFTCarousel() {
  return (
    <div className="carousel carousel-center p-4 space-x-4 bg-base-200 rounded-box">
      {nftData.map((nft, index) => (
        <div key={index} className="carousel-item">
          <NFTCard {...nft} />
        </div>
      ))}
    </div>
  );
}