import React, { useEffect, useState } from "react";
import * as Roll from "../utils/Roll";

export default function RollLogin() {
	const [windowHost, setWindowHost] = useState('');

	useEffect(() => {
		setWindowHost(window.location.href);
	}, [windowHost]);

	return (
		<div>
			<img src="https://pbs.twimg.com/profile_images/1221640912050294784/XBtcYXED_400x400.jpg" className="-mt-6 mx-auto" />
			<div className="flex justify-center">
				<p className="text-5xl font-header text-center -mt-12">
					Roll Social Token Wallet
        </p>
			</div>
			<div className="flex justify-center mx-auto mt-6">
				<a href={Roll.loginUrl(windowHost)}>
					<button className="flex justify-center mx-auto mt-4 bg-blue-500 rounded-lg p-3 text-white text-center">
						Open Your Roll Wallet
          </button>
				</a>
			</div>
			<div>
				<a href='https://app.tryroll.com/createAccount/no_claim' target='_blank'>
					<button className="flex justify-center mx-auto mt-8 bg-blue-500 rounded-lg p-3 text-white text-center">
						Register for a Roll Wallet
          </button>
				</a>
			</div>
		</div>
	);
}