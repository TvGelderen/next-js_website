import { LocationData, SliderData } from "@/components/Data";
import { notFound } from "next/navigation";
import { getParkData } from "../actions";
import ParkContent from "@/components/ParkContent";

type Params = Promise<{
    national_park: string;
}>;

export default async function NationalPark({ params }: { params: Params }) {
    let { national_park } = await params;
    national_park = national_park.replaceAll("%20", " ");

    const location = LocationData.find((loc) => loc.name === national_park);
    const imgs = SliderData.filter((img) => img.location === national_park);

    if (location === undefined || imgs === undefined) {
        return notFound();
    }

    const parkData = await getParkData(location.code);

    return (
        <ParkContent
            location={location}
            initialImages={imgs}
            parkData={parkData}
        />
    );
}
