"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface SlideImage {
    url: string;
    location: string;
    credit: string;
    title: string;
    altText: string;
    caption: string;
}

interface SliderProps {
    images: SlideImage[];
    startIndex?: number;
    onIndexChange?: (index: number) => void;
    classes?: string;
    play?: boolean;
    interval?: number;
}

const Slider = ({
    images,
    startIndex = 0,
    onIndexChange,
    classes = "",
    play = false,
    interval = 4000,
}: SliderProps) => {
    const [current, setCurrent] = useState<number>(startIndex);

    const length = images.length;

    const nextSlide = () => {
        setCurrent((current + 1) % length);
    };

    const previousSlide = () => {
        setCurrent(current - 1 < 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(images) || length === 0) return null;

    useEffect(() => {
        onIndexChange?.(current);
        let timer: NodeJS.Timeout;
        if (play) {
            timer = setTimeout(() => {
                nextSlide();
            }, interval);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [current, play, interval]);

    return (
        <div className="relative mt-5 max-w-[1440px] m-auto">
            {images.map((slide, index) => {
                return (
                    <div
                        key={index}
                        className={
                            index === current
                                ? "opacity-[1] ease-in duration-[400ms]"
                                : "opacity-0"
                        }
                    >
                        {length > 1 && !play && (
                            <>
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
                            </>
                        )}
                        {index === current && (
                            <Image
                                src={slide.url}
                                alt={slide.altText}
                                width={1080}
                                height={600}
                                loading="lazy"
                                className={`object-cover w-[1440px] ${classes}`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Slider;
