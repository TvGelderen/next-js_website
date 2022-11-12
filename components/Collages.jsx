import Image from "next/image";
import React, { useState } from "react";
import Slider from "./Slider";

import { AiOutlineClose } from 'react-icons/ai'

const Collage = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const handleImageClick = idx => {
        setIndex(idx);
        setOpen(true);
    }

    return (
        <div className="mt-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {images.map((img, idx) => (
                    <div key={idx}>
                        <Image
                          src={img.image}
                          alt={img.location}
                          width='500'
                          height='700'
                          className="object-cover h-[150px] md:h-[200px] lg:h-[250px]"
                          onClick={() => handleImageClick(idx)}
                        />
                    </div>
                ))}
            </div>
            {open && (
                <div 
                  className="fixed z-[10] left-0 top-0 w-full h-full bg-black/60 justify-center align-center flex" 
                  onClick={() => setOpen(false)} 
                >
                    <div 
                      className="max-w-[1560px] w-[95%] fixed top-[12%] bg-white shadow-lg p-4" 
                      onClick={(event) => event.stopPropagation()} 
                      >
                        <div className="flex justify-between pb-2 border-b-4 border-gray-300">
                            <div>
                                <h3>{location.name}</h3>
                                <p className="pt-1">{location.state}</p>
                            </div>
                            <div className="cursor-pointer" onClick={() => setOpen(false)} >
                                <AiOutlineClose size={30}/>
                            </div>
                        </div>
                        <div>
                            <Slider 
                              images={images} 
                              startIndex={index} 
                              classes="h-[350px] sm:h-[450px] md:h-[600px] lg:h-[900px]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collage;