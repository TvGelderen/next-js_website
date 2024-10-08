"use server";

export type ParkData = {
	description: string;
	weatherInfo: string;
	url: string;
	operatingHours: {
		name: string;
		description: string;
	}[];
	entranceFees: {
		cost: string;
		description: string;
		title: string;
	}[];
	entrancePasses: {
		cost: string;
		description: string;
	}[];
	images: {
		credit: string;
		title: string;
		altText: string;
		caption: string;
		url: string;
	}[];
};

export async function getParkData(code: string) {
	const res = await fetch(
		`https://developer.nps.gov/api/v1/parks?parkCode=${code}&api_key=${process.env.NPS_API_KEY}`
	);
	const data = await res.json();
	return data.data[0] as ParkData;
}
