import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const Slider = ({ images, startIndex = 0, classes, play = false, interval = 5000 }) => {
    const [current, setCurrent] = useState(startIndex);

    const length = images.length;

    const nextSlide = () => {
        setCurrent((current + 1) % length);
    }

    const previousSlide = () => {
        setCurrent(current - 1 < 0 ? length - 1 : current - 1);
    }

    if (!Array.isArray(images) || length === 0) 
        return null;

    useEffect(() => {
        if (play)
            setTimeout(() => {
                nextSlide();
            }, interval);
    }, [current]);

    return (
        <div className='relative mt-5 max-w-[1440px] m-auto'>
            {images.map((slide, index) => {
                return (
                    <div
                        key={index}
                        className={index === current
                        ? 'opacity-[1] ease-in duration-[1500ms]'
                        : 'opacity-0'}
                    >
                        {length > 1 && !play &&
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
                            <>
                                <Image
                                  src={slide.image}
                                  alt={slide.location}
                                  width='1080'
                                  height='600'
                                  className={`object-cover w-[1440px] ${classes}`}
                                />
                                {/* Already start loading next image */}
                                <Image
                                  src={images[(current + 1) % length].image}
                                  alt=''
                                  width='1080'
                                  height='600'
                                  className='hidden'
                                />
                            </>
                            )}
                    </div>
                );
            })}
        </div>
    )
}

export default Slider;