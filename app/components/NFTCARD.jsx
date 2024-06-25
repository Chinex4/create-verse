'use client'
import Image from 'next/image';
import ethCoin from '@/public/coins.png'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NFTCard({ id, image, creator, price, isLoggedIn }) {
  const router = useRouter()
  const handleClick = () => {
    if (isLoggedIn) {
      router.push(`/dashboard/${id}`)
    } else {
      router.push(`/${id}`)
    }
  }
  return (
    <div onClick={handleClick} className="card lg:hover:-translate-y-4 hover:cursor-pointer duration-500 card-compact w-[15rem] lg:w-72 bg-base-100 shadow-xl">
      <figure className="">
        <Image src={image} alt={creator} className="rounded-xl w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">
          {creator}
        </h2>
        <p className='text-stone-500 flex space-x-1 items-center '>
          <span className=''>Price:</span>
          <span>{price}</span>
          <Image src={ethCoin} alt='ethcoin' width={20} height={20} />
        </p>
      </div>
    </div>
  );
}