
import Image from 'next/image';

export default function NFTCard({ image, price, availability, date }) {
  return (
    <div className="card w-full lg:w-60 bg-base-100 shadow-xl">
      <figure className="px-4 pt-4">
        <Image src={image} alt="NFT Image" width={150} height={150} className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {price} ETH <span className="text-sm">ETH</span>
        </h2>
        <p>Availability: {availability}</p>
        <p>Created: {date}</p>
      </div>
    </div>
  );
}