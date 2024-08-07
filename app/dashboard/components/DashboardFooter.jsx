import React from 'react'
import logo2 from '@/public/logo2.png';
import Image from 'next/image';
import Link from 'next/link';


const DashboardFooter = () => {
    return (
        <section className='w-full py-8 px-4 lg:px-28 lg:py-8 md:p-20 bg-primary'>
            <h1 className='text-2xl md:text-3xl font-bold text-white flex items-center space-x-6'>
                <Image
                    src={logo2}
                    width={50}
                    alt="secondlogo"
                />
                <span>CreateVerse</span>
            </h1>
            <div className='text-center text-white mt-8 space-y-6'>
                <p className='text-sm'>
                    Quality customer support is the cornerstone of our NFT project. We
                    are here to assist you every step of the way, whether you have
                    questions, encounter issues, or simply want to share your thoughts.
                    Your satisfaction and success are our top priorities, and we are
                    committed to providing the best support experience possible. Feel
                    free to reach out to us, and together, we will make your NFT journey
                    a smooth and rewarding one.
                </p>

                <div>
                    <Link
                        href='mailto:createverse@gmail.com'
                        className='block lg:inline-block bg-white hover:bg-white/50 text-primary transition-all hover:shadow-2xl px-6 py-3 rounded-md'>
                        Contact Us
                    </Link>
                </div>

            </div>
            <div className='mt-10 space-y-8'>
                <hr className='bg-gray-50' />
                <p className='text-white text-center'>
                    &copy; 2023 CREATEVERSE. All rights reserved.
                </p>
            </div>
        </section>
    )
}

export default DashboardFooter
