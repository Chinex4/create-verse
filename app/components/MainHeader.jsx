import Link from 'next/link'
import React from 'react'
import logo from '@/public/logo.png'
import Image from 'next/image'

const MainHeader = () => {
    return (
        <nav className="navbar bg-base-100 fixed top-0 left-0 lg:px-[4rem] z-30 shadow-md">
            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost text-[17px] lg:text-xl hover:bg-transparent">
                    <Image src={logo} width={40} alt="logo"/>
                    <span className='text-primary font-bold'>CreateVerse</span>
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link className='hover:bg-transparent hover:text-secondary lg:text-lg lg:font-semibold' href="/register/login">Login</Link>
                    </li>
                    <li>
                        <Link className='hover:bg-transparent hover:text-secondary lg:text-lg lg:font-semibold' href="/register/signup">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainHeader
