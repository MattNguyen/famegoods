import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon, InlineIcon } from "@iconify/react";
import playSolid from "@iconify/icons-la/play-solid";
import lockSolid from "@iconify/icons-la/lock-solid";
import heartSolid from "@iconify/icons-la/heart-solid";
import ellipsisVSolid from "@iconify/icons-la/ellipsis-v-solid";
import commentsSolid from "@iconify/icons-la/comments-solid";
import shareAltSquareSolid from "@iconify/icons-la/share-alt-square-solid";
import baselineShare from "@iconify/icons-ic/baseline-share";
import ProfileHeader from "./profileHeader";

import * as UserData from "../utils/UserData";

export default function WallCard({ tags, title, video, gif, file }) {
  const [videoObj, setVideo] = useState({});

  const address = file.address;

  useEffect((x) => {
    async function run() {
      const box = await UserData.forUser(address);
      // console.log("file.id", file.id);

      box.getVideo(file.id).then((x) => {
        // console.log("video", x);
        if (x) setVideo(x);
      });
    }
    run();
  }, []);

  if (!videoObj) return null;

  return (
    <div className="container h-screen flex items-center justify-center snap-center always-stop px-6">
      <Link href="/post/[slug]" as={"/post/" + file.id}>
        <div
          className="relative rounded-md shadow-lg h-48 w-full justify-center cursor-pointer overflow-hidden"
          style={{
            backgroundImage: `url(${gif})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            height: "75%",
          }}
        >
          <div className="flex absolute top-0 right-0 left-0 p-6">
            <ProfileHeader />
            <Icon
              icon={ellipsisVSolid}
              color="white"
              className="top-0 right-0 h-8 w-8"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Icon className="w-10 h-10" icon={lockSolid} color="white" />
            <div className="break-words font-extrabold text-4xl mb-4 p-2 text-white">
              {videoObj.title || "Loading..."}
            </div>

            <UnlockButton>
              Own {videoObj.tokens} {videoObj.tokenName} to Unlock
            </UnlockButton>
          </div>
        </div>
      </Link>
    </div>
  );
}

function UnlockButton({ children }) {
  return (
    <button className="flex bg-white hover:bg-gray-300 text-black font-medium tracking-wide py-2 px-4 w-9/12 rounded-lg mr-2 items-center button-gradient w-full">
      <Icon className="m-1" icon={playSolid} color="black" />
      <span>{children}</span>
    </button>
  );
}

{
  /*<Link href="/roll_login">
        <div className="mb-8 rounded-md shadow-lg h-full mx-auto w-auto max-w-md w-full cursor-pointer">
          <img
            className="rounded-md h-full w-full object-cover gif-gradient"
            src={gif}
          />
          <style jsx>{`
            .gif-gradient {
              background-image: linear-gradient(
                180deg,
                rgba(0, 0, 0, 1) 0%,
                rgba(0, 0, 0, 0.2) 45.31%,
                rgba(0, 0, 0, 0.4) 60.94%,
                rgba(0, 0, 0, 0.9) 100%
              );
            }
          `}</style>
          <div className="absolute top-0 p-6">
            <ProfileHeader />
          </div>
          <div className="absolute bottom-0 mx-6 mb-24">
            <Icon className="w-10 h-10" icon={lockSolid} color="white" />
            <div className="break-words font-extrabold text-4xl mb-4 p-2 text-white">
              {videoObj.title || "Loading..."}
            </div>
            <div className="w-full">
              <button className="flex bg-white hover:bg-gray-300 text-black font-medium tracking-wide py-2 px-4 w-64 rounded-lg mr-2 items-center button-gradient">
                <Icon className="m-1" icon={playSolid} color="black" />
                <span>
                  Own {videoObj.tokens} {videoObj.tokenName} to Unlock
                </span>
              </button>
            </div>
          </div>
        </div>
      </Link>*/
}
