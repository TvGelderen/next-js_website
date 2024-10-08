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
				<>
					<div className="mb-12 max-w-[700px] px-4 m-auto">
						<h3 className="text-center pb-4">Description</h3>
						<p className="font-semibold">General</p>
						<p>{parkData.description}</p>
						<br />
						<p className="font-semibold">Weather</p>
						<p>{parkData.weatherInfo}</p>
						<br />
						<a
							target="_blank"
							href={parkData.url}
							className="text-blue-600 underline"
						>
							More information
						</a>
					</div>

					<div className="mb-12 max-w-[900px] m-auto">
						<h3 className="text-center">Opening hours</h3>
						{parkData.operatingHours.map((place) => (
							<div key={place.name} className="px-4 py-2">
								<p className="font-semibold pr-4">
									{place.name}
								</p>
								<p>{place.description}</p>
							</div>
						))}
					</div>

					<div className="mb-12 max-w-[700px] m-auto px-4">
						<h3 className="text-center">Price information</h3>
						<h4>Entrance fees</h4>
						{parkData.entranceFees.map((fee, index) => (
							<div key={index} className="flex py-2">
								<p className="font-semibold pr-4">
									${fee.cost}
								</p>
								<p>
									{fee.description === ""
										? fee.title
										: fee.description}
								</p>
							</div>
						))}
						<h4>Entrance passes</h4>
						{parkData.entrancePasses.map((pass, index) => (
							<div key={index} className="flex py-2">
								<p className="font-semibold pr-4">
									{pass.cost === "0.00"
										? "Free"
										: `$${pass.cost}`}
								</p>
								<p>{pass.description}</p>
							</div>
						))}
					</div>
				</>
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
