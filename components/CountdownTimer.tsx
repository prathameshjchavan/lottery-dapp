import { useContract, useContractRead } from "@thirdweb-dev/react";
import Countdown from "react-countdown";

type Props = {
	hours: number;
	minutes: number;
	seconds: number;
	completed: boolean;
};

const CountdownTimer = () => {
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESSS
	);
	const { data: expiration, isLoading: isLoadingExpiration } = useContractRead(
		contract,
		"expiration"
	);

	const renderer = ({ hours, minutes, seconds, completed }: Props) => {
		return (
			<div>
				{completed ? (
					<h2 className="text-white text-xl text-center animate-bounce">
						Ticket Sales have now CLOSED for this draw
					</h2>
				) : (
					<h3 className="text-white text-sm mb-2 italic">Time Remaining</h3>
				)}

				{!Number.isNaN(hours) &&
					!Number.isNaN(minutes) &&
					!Number.isNaN(seconds) && (
						<div className="flex space-x-6">
							<div className="flex-1">
								<div className="countdown">{hours}</div>
								<div className="countdown-label">hours</div>
							</div>

							<div className="flex-1">
								<div className="countdown">{minutes}</div>
								<div className="countdown-label">minutes</div>
							</div>

							<div className="flex-1">
								<div className="countdown">{seconds}</div>
								<div className="countdown-label">seconds</div>
							</div>
						</div>
					)}
			</div>
		);
	};

	return (
		<div>
			<Countdown date={new Date(expiration * 1000)} renderer={renderer} />
		</div>
	);
};

export default CountdownTimer;
