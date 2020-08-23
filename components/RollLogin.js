import React from "react";
import * as Roll from "../utils/Roll";
import Link from "next/link";

export default function RollLogin({ redirectTo }) {
  if (!redirectTo) redirectTo = window.location.href;
  return (
    <div className="container p-6">
      <div className="h-56 w-56 mx-auto mb-16">
        <img src="https://pbs.twimg.com/profile_images/1221640912050294784/XBtcYXED_400x400.jpg" />
      </div>
      <p className="text-5xl font-header text-center -mt-12">
        Roll Social Token Wallet
      </p>
      <div className="mx-auto mt-12">
        <a
          href={Roll.loginUrl(redirectTo)}
          className="flex justify-center w-full p-3 text-center rounded-lg mt-4 bg-blue-500 text-white"
        >
          Open Your Roll Wallet
        </a>
        <Link href="/roll_register">
          <a className="flex justify-center w-full p-3 text-center rounded-lg mt-4 bg-transparent border border-blue-500 text-blue-500">
            Register for a Roll Wallet
          </a>
        </Link>
      </div>
    </div>
  );
}
