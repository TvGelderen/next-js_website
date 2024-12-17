"use client";

import Image from "next/image";
import React, { useState } from "react";
import Slider from "./Slider";
import { AiOutlineClose } from "react-icons/ai";

interface ImageData {
	url: string;
	location: string;
	credit: string;
	title: string;
	altText: string;
	caption: string;
}

interface CollageProps {
	images: ImageData[];
	location: {
		name: string;
		state: string;
	};
}

const Collage = ({ images, location }: CollageProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(0);
	const [clickedIndex, setClickedIndex] = useState<number>(0);
	const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
		{}
	);

	const handleImageClick = (idx: number) => {
		setClickedIndex(idx);
		setIndex(idx);
		setOpen(true);
	};

	const handleImageError = (idx: number) => {
		setImageErrors((prev) => ({
			...prev,
			[idx]: true,
		}));
	};

	return (
		<div className="mt-5 mx-5">
			<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
				{images.map((img, idx) => (
					<div
						key={idx}
						className="relative group cursor-pointer"
						onClick={() => handleImageClick(idx)}
					>
						{imageErrors[idx] ? (
							<div className="bg-gray-200 h-[200px] md:h-[250px] lg:h-[300px] rounded-lg shadow-md flex items-center justify-center">
								<p className="text-gray-500 text-sm text-center p-4">
									Image not available
								</p>
							</div>
						) : (
							<Image
								src={img.url}
								alt={img.altText}
								width={500}
								height={700}
								loading="lazy"
								className="object-cover h-[200px] md:h-[250px] lg:h-[300px] rounded-lg shadow-md"
								onError={() => handleImageError(idx)}
							/>
						)}
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
							<h4 className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								{img.title}
							</h4>
							<p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								Credit: {img.credit}
							</p>
						</div>
					</div>
				))}
			</div>
			{open && (
				<div
					className="fixed z-[10] left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center"
					onClick={() => setOpen(false)}
				>
					<div
						className="max-w-[90%] w-[1200px] bg-white rounded-lg shadow-2xl overflow-hidden"
						onClick={(event: React.MouseEvent) =>
							event.stopPropagation()
						}
					>
						<div className="flex justify-between items-center p-4 bg-gray-100">
							<div>
								<h3 className="text-xl font-semibold">
									{location.name}
								</h3>
								<p className="text-sm text-gray-600">
									{location.state}
								</p>
							</div>
							<button
								className="text-gray-600 hover:text-gray-800 transition-colors"
								onClick={() => setOpen(false)}
							>
								<AiOutlineClose size={24} />
							</button>
						</div>
						<div className="p-4">
							<Slider
								images={images}
								startIndex={clickedIndex}
								onIndexChange={(idx) => setIndex(idx)}
								classes="h-[350px] sm:h-[450px] md:h-[600px] lg:h-[700px] rounded-lg"
							/>
							<div className="mt-4">
								<h4 className="text-lg font-semibold">
									{images[index].title}
								</h4>
								<p className="text-sm text-gray-600 mt-1">
									{images[index].caption}
								</p>
								<p className="text-xs text-gray-500 mt-2">
									Credit: {images[index].credit}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Collage;
