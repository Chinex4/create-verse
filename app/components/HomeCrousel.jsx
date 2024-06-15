import React from 'react'
import firstImg from '@/public/carousel/1.jpg'
import secondImg from '@/public/carousel/2.jpg'
import thirdImg from '@/public/carousel/3.jpg'
import Image from 'next/image'

const HomeCrousel = () => {
    return (
        <div className="w-full lg:w-[25rem] carousel rounded-box">
            <div className="carousel-item w-full">
                <Image src={firstImg}/>
            </div>
            <div className="carousel-item w-full">
                <Image src={secondImg}/>
            </div>
            <div className="carousel-item w-full">
                <Image src={thirdImg} />
            </div>
        </div>
    )
}

export default HomeCrousel
