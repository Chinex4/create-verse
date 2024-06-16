
import Image from 'next/image';

export default function NFTCard({ image, price, availability, date }) {
  return (
    <div className="card card-compact w-[15rem] lg:w-72 bg-base-100 shadow-xl">
      <figure className="">
        <Image src={image} alt="NFT Image" className="rounded-xl w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {price} ETH <span className="text-sm">ETH</span>
        </h2>
        <div className={`badge badge-outline ${availability ? 'badge-success' : 'badge-error'}`}>{availability ? 'Available' : 'Not Available'}</div>
        <p>Created: {date}</p>
      </div>
    </div>
  );
}