import { useMetamask } from "@thirdweb-dev/react";
import Image from "next/image";

const Login = () => {
	const connectWithMetamask = useMetamask();

	return (
		<div className="bg-[#091B18] min-h-screen flex flex-col items-center justify-center text-center">
			<div className="flex flex-col items-center mb-10">
				<Image
					src="/images/blockchain.png"
					width={1500}
					height={1500}
					alt="profile"
					className="h-56 w-56 mb-10 rounded-full"
				/>
				<h1 className="text-6xl text-white font-bold">THE LOTTERY DRAW</h1>
				<h2 className="text-white">
					Get Started by logging in with your MetaMask
				</h2>

				<button
					onClick={() => connectWithMetamask()}
					className="bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold"
				>
					Login with Metamask
				</button>
			</div>
		</div>
	);
};

export default Login;
