import React, { useState, useEffect } from 'react'
import firstImg from '@/public/carousel/1.jpg'
import secondImg from '@/public/carousel/2.jpg'
import thirdImg from '@/public/carousel/3.jpg'
import Image from 'next/image'

const HomeCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [firstImg, secondImg, thirdImg];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="w-full lg:w-[25rem] carousel rounded-box">
            {slides.map((slide, index) => (
                <div key={index} className={`carousel-item w-full ${index === currentSlide ? 'block' : 'hidden'}`}>
                    <Image src={slide} alt={`Slide ${index + 1}`} />
                </div>
            ))}
        </div>
    );
}

export default HomeCarousel;