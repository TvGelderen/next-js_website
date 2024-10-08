import React from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "USA National Parks",
	description: "Explore the beauty of USA National Parks",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
