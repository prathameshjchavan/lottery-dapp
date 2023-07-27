import Header from "@/components/Header";
import Head from "next/head";

export default function Home() {
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
