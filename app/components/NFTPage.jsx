"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ethcoin from "@/public/coins.png";

export default function NFTPage({ nft }) {
    const router = useRouter();

    return (
        <div className="mt-32 px-6 lg:px-[4rem] flex flex-col md:flex-row justify-between">
            <Image
                src={nft.image}
                alt={nft.creator}
                width={400}
                height={400}
                className="rounded-xl shadow-xl w-full md:w-[300px] lg:w-[400px]"
            />
            <div className="md:basis-[50%] lg:basis[60%]">
                <h1 className="text-[3rem] font-bold">{nft.creator}</h1>
                <p className="text-xl font-semibold flex items-center space-x-2">
                    <span>{nft.price}ETH</span>
                    <Image src={ethcoin} width={30} height={30} />
                </p>
                <p>{nft.description}</p>
                <button
                    onClick={() => router.push('/register/login')}
                    className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-focus"
                >
                    Buy NFT
                </button>
            </div>
        </div>
    );
}