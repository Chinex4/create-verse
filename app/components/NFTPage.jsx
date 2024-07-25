"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ethcoin from "@/public/coins.png";

export default function NFTPage({ nft, isLoggedin }) {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/register/login');
        } else {
            fetch('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                        router.push('/register/login');
                    } else {
                        setUser(data);
                    }
                })
                .catch(() => {
                    toast.error('Failed to fetch user data');
                    router.push('/register/login');
                });
        }
    }, [router]);


    if (!user) {
        return (
            <div className='grid w-full min-h-screen place-items-center'>
                <span className='loading loading-dots loading-lg'></span>
            </div>
        );
    }

    const handleClick = () => {
        if (isLoggedin) {
            user.walletAddress ? router.push('/dashboard/connect-wallet') : router.push('/dashboard/deposit')
        }
        else{
            router.push("/register/login")
        }
    }

    return (
        <div className="my-32 px-6 lg:px-[4rem] flex flex-col md:flex-row justify-between">
            <Image
                src={nft.image}
                alt={nft.creator || "nftcreator"}
                width={400}
                height={400}
                className="rounded-xl shadow-xl w-full md:w-[300px] lg:w-[400px]"
            />
            <div className="md:basis-[50%] lg:basis[60%]">
                <h1 className="text-[2rem] lg:text-[3rem] font-bold">{nft.creator}</h1>
                <p className="flex items-center space-x-2 text-xl font-semibold">
                    <span>{nft.price}ETH</span>
                    <Image src={ethcoin} width={30} height={30} />
                </p>
                <p>{nft.description}</p>
                <button
                    onClick={handleClick}
                    className="px-4 py-2 mt-4 font-bold text-white rounded-lg bg-primary hover:bg-primary-focus"
                >
                    Buy NFT
                </button>
            </div>
        </div>
    );
}