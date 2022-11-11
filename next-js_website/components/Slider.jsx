import React, { useState } from 'react';
import Image from 'next/image';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const Slider = ({ images }) => {
    const [current, setCurrent] = useState(0);

    const length = images.length;

    const nextSlide = () => {
        setCurrent((current + 1) % length);
    }

    const previousSlide = () => {
        setCurrent(current - 1 < 0 ? length - 1 : current - 1);
    }

    if (!Array.isArray(images) || length <= 0) 
        return null;

    return (
        <div className='relative mt-5 max-w-[1440px] m-auto mb-12'>
            {images.map((slide, index) => {
                return (
                    <div
                        key={index}
                        className={index === current
                        ? 'opacity-[1] ease in duration-1000'
                        : 'opacity-0'}
                    >
                        {length > 1 && 
                          (<>
                            <BsChevronCompactLeft 
                                size={60}
                                className="absolute top-[45%] left-[24px] text-white cursor-pointer select-none z-[5]"
                                onClick={previousSlide} 
                            />
                            <BsChevronCompactRight 
                                size={60}
                                className="absolute top-[45%] right-[24px] text-white cursor-pointer select-none z-[5]"
                                onClick={nextSlide}
                            />
                          </>)}
                        {index === current && (
                            <Image 
                            src={slide.image}
                            alt={slide.location}
                            width='1080'
                            height='400'
                            className='object-cover w-[1440px] max-h-[250px] sm:max-h-[330px] md:max-h-[450px] lg:max-h-[630px]'
                            />)}
                    </div>
                );
            })}
        </div>
    )
}

export default Slider;