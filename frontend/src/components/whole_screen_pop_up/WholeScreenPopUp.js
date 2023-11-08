import React, { useState } from "react";
import { Link } from "react-router-dom";

 
function WholeScreenPopUp() {
	const [show, setShow] = useState(true);
	const popUpElement = show ? <div class="fixed flex justify-center items-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
	<div class="p-5 w-96 shadow-lg rounded-md bg-third">
	<div class="mt-3 text-center">
		<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-second">
			<svg
				class="h-8 w-8 text-white"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="3"
					d="M5 13l4 4L19 7"
				></path>
			</svg>
		</div>
		<h3 class="text-lg leading-6 font-medium text-white">Congratulations!</h3>
		<div class="mt-2 px-7 py-3">
			<p class="text-sm text-gray-500">
				You have completed all cards for today!
			</p>
		</div>
		<div class="items-center px-4 py-3">
			<Link
				onClick={() => setShow(false)}
				to='/decks'
				class="block px-4 py-2 bg-second text-white text-base font-medium rounded-md w-full shadow-sm"
			>
				OK
			</Link>
		</div>
	</div>
</div>
	</div> : null;
	return (
		<>
		{popUpElement}

		</>
	);
}

export default WholeScreenPopUp;