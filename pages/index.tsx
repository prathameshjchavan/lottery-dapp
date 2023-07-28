import Header from "@/components/Header";
import Login from "@/components/Login";
import {
	useAddress,
	useContract,
	useContractRead,
	useContractWrite,
} from "@thirdweb-dev/react";
import Head from "next/head";
import Loading from "@/components/Loading";
import { useState, Fragment, useEffect } from "react";
import { ethers } from "ethers";
import { currency } from "@/constants";
import CountdownTimer from "@/components/CountdownTimer";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Home() {
	const address = useAddress();
	const [quantity, setQuantity] = useState<number>(1);
	const [userTickets, setUserTickets] = useState<number>(0);
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESSS
	);
	const { data: remainingTickets } = useContractRead(
		contract,
		"RemainingTickets"
	);
	const { data: currentWinningReward } = useContractRead(
		contract,
		"CurrentWinningReward"
	);
	const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
	const { data: ticketCommission } = useContractRead(
		contract,
		"ticketCommission"
	);
	const { data: expiration } = useContractRead(contract, "expiration");
	const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets");
	const { data: tickets } = useContractRead(contract, "getTickets");

	const handleClick = async () => {
		if (!ticketPrice) return;

		const notification = toast.loading("Buying you tickets...");

		try {
			const data = await BuyTickets({
				overrides: {
					value: ethers.utils.parseEther(
						(
							Number(ethers.utils.formatEther(ticketPrice)) * quantity
						).toString()
					),
				},
			});

			toast.success("Tickets purchased successfully!", {
				id: notification,
			});

			console.info("contract call success", data);
		} catch (error) {
			toast.error("Whoops something went wrong!", {
				id: notification,
			});

			console.error("contract call failure", error);
		}
	};

	useEffect(() => {
		if (!tickets) return;

		const totalTickets: string[] = tickets;

		const noOfUserTickets = totalTickets.reduce(
			(total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
			0
		);

		setUserTickets(noOfUserTickets);
	}, [tickets, address]);

	if (!address) return <Login />;

	if (isLoading) return <Loading />;

	return (
		<div className="bg-[#091B18] min-h-screen flex flex-col">
			<Head>
				<title>Lottery App</title>
			</Head>
			<main>
				<Header />

				{/* The Next Draw Box */}
				<div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
					<div className="stats-container">
						<h1 className="text-5xl text-white font-semibold text-center">
							The Next Draw
						</h1>
						<div className="flex justify-between p-2 space-x-2">
							<div className="stats">
								<h2 className="text-sm">Total Pool</h2>
								<p className="text-xl">
									{currentWinningReward && (
										<Fragment>
											{ethers.utils.formatEther(
												currentWinningReward.toString()
											)}{" "}
											{currency}
										</Fragment>
									)}
								</p>
							</div>
							<div className="stats">
								<h2 className="text-sm">Tickets Remaining</h2>
								<p className="text-xl">{remainingTickets?.toNumber()}</p>
							</div>
						</div>

						{/* Countdown timer */}
						<div className="mt-5 mb-3">
							<CountdownTimer />
						</div>
					</div>

					<div className="stats-container space-y-2">
						<div className="stats-container min-w-[400px]">
							<div className="flex justify-between items-center text-white pb-2">
								<h2>Price per ticket</h2>
								<p>
									{ticketPrice && (
										<Fragment>
											{ethers.utils.formatEther(ticketPrice.toString())}{" "}
											{currency}
										</Fragment>
									)}
								</p>
							</div>

							<div className="flex text-white items-center space-x-2 bg-[#091B18] border-[#004337] border p-4">
								<p>TICKETS</p>
								<input
									className="flex w-full bg-transparent text-right outline-none"
									type="number"
									min={1}
									max={10}
									value={quantity}
									onChange={(e) => setQuantity(Number(e.target.value))}
								/>
							</div>

							<div className="space-y-2 mt-5">
								<div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
									<p>Total cost of tickets</p>
									<p>
										{ticketPrice && (
											<Fragment>
												{Number(
													ethers.utils.formatEther(ticketPrice.toString())
												) * quantity}{" "}
												{currency}
											</Fragment>
										)}
									</p>
								</div>

								<div className="flex items-center justify-between text-emerald-300 text-xs italic">
									<p>Service fees</p>
									<p>
										{ticketCommission && (
											<Fragment>
												{ethers.utils.formatEther(ticketCommission.toString())}{" "}
												{currency}
											</Fragment>
										)}
									</p>
								</div>

								<div className="flex items-center justify-between text-emerald-300 text-xs italic">
									<p>+ Network Fees</p>
									<p>TBC</p>
								</div>
							</div>

							<button
								disabled={
									expiration?.toString() < Date.now().toString() ||
									remainingTickets?.toNumber() === 0
								}
								onClick={handleClick}
								className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:to-gray-600 disabled:text-gray-100 disabled:cursor-not-allowed font-semibold"
							>
								Buy {quantity} tickets for{" "}
								{ticketPrice &&
									Number(ethers.utils.formatEther(ticketPrice)) * quantity}{" "}
								{currency}
							</button>
						</div>

						{userTickets > 0 && (
							<div className="stats">
								<p className="text-lg mb-2">
									You have {userTickets} Tickets in this draw
								</p>

								<div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
									{Array(userTickets)
										.fill("")
										.map((_, index) => (
											<p
												key={index}
												className="text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic"
											>
												{index + 1}
											</p>
										))}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* The price per ticket box */}
				<div></div>
			</main>
			<footer className="border-t border-emerald-500/20 flex items-center text-white justify-between p-5">
				<Image
					src="https://i.imgur.com/4h7mAu7.png"
					width={800}
					height={800}
					alt="profile"
					className="h-10 w-10 filter hue-rotate-90 opacity-20 rounded-full"
				/>

				<p className="text-xs text-emerald-900 pl-5">
					DISCLAIMER: This video is made for informational and educational
					purposes only. The content of this tutorial is not intended to be a
					lure to gambling. Instead, the information presented is meant for
					nothing more than learning and entertainment purposes. We are not
					liable for any losses that are incurred or problems that arise at
					online casinos or elsewhere after the reading and consideration of
					this tutorials content. If you are gambling online utilizing
					information from this tutorial, you are doing so completely and
					totally at your own risk.
				</p>
			</footer>
		</div>
	);
}
