"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [color, setColor] = useState("transparent");
	const [textColor, setTextColor] = useState("white");

	const handleOpen = () => {
		setOpen(!open);
	};

	useEffect(() => {
		const changeColor = () => {
			if (window.scrollY >= 90) {
				setColor("white");
				setTextColor("black");
			} else {
				setColor("transparent");
				setTextColor("white");
			}
		};

		window.addEventListener("scroll", changeColor);
	}, []);

	return (
		<div
			className={`fixed left-0 top-0 w-full z-10 ease-in duration-300 ${
				textColor !== "white" ? "shadow-2xl" : ""
			}`}
			style={{ backgroundColor: `${color}` }}
		>
			<div className="max-w-[1440px] m-auto flex justify-between items-center p-2 text-white">
				<Link href="/">
					<h1
						className="text-4xl font-bold"
						style={{ color: `${textColor}` }}
					>
						National Parks
					</h1>
				</Link>
				<ul
					className="hidden sm:flex"
					style={{ color: `${textColor}` }}
				>
					<li className="p-4">
						<Link href="/">Home</Link>
					</li>
					<li className="p-4">
						<Link href="#gallery">Gallery</Link>
					</li>
					<li className="p-4">
						<Link href="/#map">Map</Link>
					</li>
					<li className="p-4">
						<Link href="/#parks">Parks</Link>
					</li>
				</ul>

				<div className="block sm:hidden z-10" onClick={handleOpen}>
					{open ? (
						<AiOutlineClose size={20} />
					) : (
						<AiOutlineMenu
							size={20}
							style={{ color: `${textColor}` }}
						/>
					)}
				</div>
				<div
					className={`sm:hidden absolute top-0 ${
						open ? "left-0" : "left-[-100%]"
					} right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300`}
				>
					<ul>
						<li className="p-4 text-3xl hover:text-gray-500">
							<Link href="/" onClick={handleOpen}>
								Home
							</Link>
						</li>
						<li className="p-4 text-3xl hover:text-gray-500">
							<Link href="/#gallery" onClick={handleOpen}>
								Gallery
							</Link>
						</li>
						<li className="p-4 text-3xl hover:text-gray-500">
							<Link href="/#locations" onClick={handleOpen}>
								Locations
							</Link>
						</li>
						<li className="p-4 text-3xl hover:text-gray-500">
							<Link href="/#parks" onClick={handleOpen}>
								Parks
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
