import React from "react";
import Slider from "./Slider";

import { SliderData } from "./Data";

const Gallery = () => {
	return (
		<div id="gallery" className="mt-12">
			<h3 className="text-center">Gallery</h3>
			<div className="max-w-[1440px] m-auto h-[250px] sm:h-[330px] md:h-[450px] lg:h-[630px] shadow-2xl">
				<Slider
					images={SliderData}
					play={true}
					classes="h-[250px] sm:h-[330px] md:h-[450px] lg:h-[630px]"
				/>
			</div>
		</div>
	);
};

export default Gallery;
