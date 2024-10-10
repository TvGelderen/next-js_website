"use client";

import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Hero from "@/components/Hero";
import { LocationData, SliderData, SliderImage } from "@/components/Data";
import Collage from "@/components/Collages";
import Slider from "@/components/Slider";
import { notFound } from "next/navigation";
import { getParkData, ParkData } from "../actions";

export default function NationalPark({
	params: { national_park },
}: {
	params: { national_park: string };
}) {
	national_park = national_park.replaceAll("%20", " ");

	const location = LocationData.find((loc) => loc.name === national_park);
	const imgs = SliderData.filter((img) => img.location === national_park);
	if (location === undefined || imgs === undefined) {
		return notFound();
	}

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
	});

	const center = useMemo(() => location.coordinates, [location.coordinates]);

	const [parkData, setParkData] = useState<ParkData>();
	const [images, setImages] = useState<SliderImage[]>(imgs);

	useEffect(() => {
		getParkData(location.code).then((data) => {
			setParkData(data);
			setImages(images.concat(data.images as SliderImage[]));
		});
	}, [location.code]);

	return (
		<div>
			<Hero
				heading={location.name}
				message={`A collection of photographs taken at ${location.name} in ${location.state}.`}
				background={images[0].url}
			/>

			<div className="mb-12">
				<h3 className="text-center">Photos</h3>
				<Slider images={images} />
			</div>

			<div className="mb-12 max-w-[1440px] m-auto">
				<h3 className="text-center">Collage</h3>
				<Collage images={images} location={location} />
			</div>

			{parkData !== undefined && (
				<div className="mb-12 max-w-[800px] mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-8">
						Park Information
					</h2>

					<div className="bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="p-6">
							<h3 className="text-2xl font-semibold mb-4">
								About {location.name}
							</h3>
							<p className="mb-4">{parkData.description}</p>

							<h4 className="text-xl font-semibold mb-2">
								Weather
							</h4>
							<p className="mb-4">{parkData.weatherInfo}</p>

							<a
								href={parkData.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
							>
								More Information
							</a>
						</div>
					</div>

					<div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="p-6">
							<h3 className="text-2xl font-semibold mb-4">
								Opening Hours
							</h3>
							{parkData.operatingHours.map((place) => (
								<div
									key={place.name}
									className="mb-4 last:mb-0"
								>
									<h4 className="text-lg font-semibold">
										{place.name}
									</h4>
									<p className="mt-1">{place.description}</p>
								</div>
							))}
						</div>
					</div>

					<div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="p-6">
							<h3 className="text-2xl font-semibold mb-4">
								Entrance Fees & Passes
							</h3>

							<h4 className="text-xl font-semibold mb-2">
								Entrance Fees
							</h4>
							{parkData.entranceFees.map((fee, index) => (
								<div key={index} className="mb-2 last:mb-4">
									<span className="font-semibold">
										${fee.cost}
									</span>{" "}
									- {fee.description || fee.title}
								</div>
							))}

							<h4 className="text-xl font-semibold mb-2">
								Entrance Passes
							</h4>
							{parkData.entrancePasses.map((pass, index) => (
								<div key={index} className="mb-2 last:mb-0">
									<span className="font-semibold">
										{pass.cost === "0.00"
											? "Free"
											: `$${pass.cost}`}
									</span>{" "}
									- {pass.description}
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			<div className="mb-12 max-w-[1240px] m-auto">
				<h3 className="text-center">Map</h3>
				<div className="mt-5 shadow-2xl">
					{!isLoaded ? (
						<h1>Loading....</h1>
					) : (
						<GoogleMap
							zoom={7}
							center={center}
							mapContainerClassName="map-class"
						>
							<Marker position={location.coordinates} />
						</GoogleMap>
					)}
				</div>
			</div>
		</div>
	);
}
