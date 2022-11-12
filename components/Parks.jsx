import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LocationData, SliderData } from "./Data";

const Parks = () => {
    return (
        <div id="parks" className="mt-12 max-w-[850px] m-auto">
            <h3 className="text-center">Parks</h3>
            <div>
                {LocationData.map(location => {
                    const image = SliderData.find(img => img.location === location.name)

                    return (
                        <div className="flex justify-center m-4">
                            <Link href={`parks/${location.name}`}>
                                <h4 className="text-center">{location.name}</h4>
                                <Image
                                  src={image.image}
                                  alt={location.name}
                                  width='1080'
                                  height='600'
                                  className="object-cover h-[200px] md:h-[300px]"
                                />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Parks;