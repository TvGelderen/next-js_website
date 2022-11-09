import React from 'react';
import { SliderData } from './SliderData';

const Slider = ({ images }) => {
    return (
        <div id='gallery'>
            <h1 className='text-2xl text-bold'>Gallery</h1>
            <div>
                {SliderData.map(slide => (
                    <img src={slide.image} alt="" />
                ))}
            </div>
        </div>
    )
}

export default Slider;