import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LocationData, SliderData } from "./Data";

const Parks = () => {
	return (
		<div id="parks" className="pt-[90px] mb-24 max-w-[1200px] m-auto px-4">
			<h3 className="text-center text-3xl font-bold mb-8">Parks</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{LocationData.map((location) => {
					const image = SliderData.find(
						(img) => img.location === location.name
					);

					return (
						<div
							key={location.name}
							className="bg-white rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105"
						>
							<Link
								href={`parks/${location.name}`}
								className="block"
							>
								<Image
									src={image?.url || ""}
									alt={location.name}
									width={1080}
									height={600}
									className="object-cover w-full h-48 md:h-64"
								/>
								<h4 className="text-center text-xl font-semibold p-4">
									{location.name}
								</h4>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Parks;
