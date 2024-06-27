"use client"

import React from 'react'
import Link from 'next/link'
import logo from '@/public/logo.png'
import userDefaultImg from '@/public/user.png';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const DashboardHeader = ({ dp, user }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/register/login');
    }
    return (
        <nav className="navbar bg-base-100 fixed top-0 left-0 lg:px-[4rem] z-30 shadow-md justify-between">
            <div className="flex-1">
                <Link href={'/dashboard'} className="btn btn-ghost text-[17px] lg:text-xl hover:bg-transparent">
                    <Image src={logo} width={40} alt="logo" />
                    <span className='hidden md:block text-primary font-bold'>CreateVerse</span>
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="flex space-x-2 md:space-x-4 items-center">
                    {!user.walletAddress && (
                        <Link href="/dashboard/connect-wallet" className='btn btn-ghost hover:bg-transparent'>
                            Connect Wallet
                        </Link>
                    )}
                    {user.walletAddress && (
                        <div className='flex space-x-2 items-center text-sm'>
                            <h2 className='font-semibold'>Bal:</h2>
                            <p className='font-light text-xs'>0.000ETH</p>
                        </div>
                    )}
                    <p className='text-sm font-bold'>{user.username}</p>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image width={30} height={30} alt="ProfileImg" src={dp || userDefaultImg} priority />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-6">
                        <li>
                            <Link href={"/dashboard/profile"} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link href={"/dashboard/create"}>Create</Link></li>
                        <li><Link href={"/dashboard/deposit"}>Deposit</Link></li>
                        <li><Link href={"/dashboard/withdraw"}>Withdraw</Link></li>
                        <li><Link href={"/dashboard/settings"}>Settings</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default DashboardHeader

