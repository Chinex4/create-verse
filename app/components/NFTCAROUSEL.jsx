// components/NFTCarousel.js
import NFTCard from './NFTCard';

const nftData = [
  {
    image: '/public/TRENDING/IMG-20231010-WA0035.jpg',
    price: 2.5,
    availability: 'Available',
    date: '2024-06-01',
  },
	{
    image: '/public/TRENDING/IMG-20231010-WA0036.jpg',
    price: 2.5,
    availability: 'Available',
    date: '2024-06-03'
	},
	{
    image: '/public/TRENDING/IMG-20231010-WA0037.jpg',
    price: 2.5,
    availability: 'Available',
    date: '2024-06-03'
	},
	{
    image: '/public/TRENDING/IMG-20231010-WA0038.jpg',
    price: 2.5,
    availability: 'Available',
    date: '2024-06-03'
	},
	{
    image: '/public/TRENDING/IMG-20231010-WA0039.jpg',
    price: 2.5,
    availability: 'Available',
    date: '2024-06-03'
	},
	{
    image: '/public/TRENDING/IMG-20231010-WA0040.jpg',
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