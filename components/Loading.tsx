import Image from "next/image";
import PropogateLoader from "react-spinners/PropagateLoader";

const Loading = () => {
	return (
		<div className="bg-[#091B18] h-screen flex flex-col items-center justify-center">
			<div className="flex items-center space-x-2 mb-10">
				<Image
					src="https://i.imgur.com/4h7mAu7.png"
					width={800}
					height={800}
					alt="profile"
					className="h-20 w-20 rounded-full"
				/>
				<h1 className="text-lg text-white font-bold">
					Loading the PAPAFAM DRAW
				</h1>
			</div>
			<PropogateLoader color="white" size={30} />
		</div>
	);
};

export default Loading;
