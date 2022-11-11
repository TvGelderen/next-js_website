import React from 'react';
import Slider from './Slider';

import { SliderData } from '../components/Data'

const Gallery = () => {
    return (
        <div id='gallery'>
            <h3 className='text-center'>Gallery</h3>
            <Slider images={SliderData} />
        </div>
    )
}

export default Gallery;