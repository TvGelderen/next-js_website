import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Locations = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    return (
        <div className="mb-12">
            <h3 className="text-center">Locations</h3>
            <div className="max-w-[1240px] m-auto flex justify-center">
                <GoogleMap 
                    zoom={10} 
                    center={{lat: 44, lng: -110}}
                    mapContainerClassName="map-class"
                ></GoogleMap>
            </div>
        </div>
    );
}

export default Locations;