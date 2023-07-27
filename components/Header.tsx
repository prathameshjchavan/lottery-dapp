import Image from "next/image";
import NavButton from "./NavButton";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";

const Header = () => {
	const address = useAddress();
	const disconnect = useDisconnect();

	return (
		<header className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center p-5">
			{/* Left Side */}
			<div className="flex items-center space-x-2">
				<Image
					src="https://i.imgur.com/4h7mAu7.png"
					width={800}
					height={800}
					alt="profile"
					className="h-20 w-20 rounded-full"
				/>
				<div>
					<h1 className="text-lg text-white font-bold">PAPAFAM DRAW</h1>
					<p className="text-xs text-emerald-500 truncate">
						User: {address?.substring(0, 5)}...
						{address?.substring(address.length, address.length - 5)}
					</p>
				</div>
			</div>

			{/* Center */}
			<div className="hidden md:inline-flex items-center justify-center lg:col-span-2 xl:col-span-3">
				<div className="bg-[#0A1F1C] flex items-center space-x-2 p-4 rounded-md">
					<NavButton isActive={true} title="Buy Tickets" />
					<NavButton onClick={disconnect} title="Logout" />
				</div>
			</div>

			{/* Right Side */}
			<div className="flex flex-col ml-auto">
				<Bars3BottomRightIcon className="h-8 w-8 text-white mx-auto cursor-pointer" />
				<span className="md:hidden">
					<NavButton onClick={disconnect} title="Logout" />
				</span>
			</div>
		</header>
	);
};

export default Header;
