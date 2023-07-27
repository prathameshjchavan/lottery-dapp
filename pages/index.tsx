import Header from "@/components/Header";
import Login from "@/components/Login";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Head from "next/head";
import Loading from "@/components/Loading";

export default function Home() {
	const address = useAddress();
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESSS
	);

	if (!address) return <Login />;

	if (isLoading) return <Loading />;

	return (
		<div className="bg-[#091B18] min-h-screen flex flex-col">
			<Head>
				<title>Lottery App</title>
			</Head>
			<main>
				<Header />
			</main>
		</div>
	);
}
