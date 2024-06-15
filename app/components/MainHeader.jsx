import Link from 'next/link'
import React from 'react'
import logo from '@/public/logo.png'
import Image from 'next/image'

const MainHeader = () => {
    return (
        <nav className="navbar lg:px-[4rem] bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">
                    <Image src={logo} width={40}/>
                    <span className='text-primary font-bold'>CreateVerse</span>
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link className='hover:bg-transparent hover:text-secondary' href="/login">Login</Link>
                    </li>
                    <li>
                        <Link className='hover:bg-transparent hover:text-secondary' href="/signup">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainHeader
