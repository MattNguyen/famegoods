import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon, InlineIcon } from '@iconify/react';
import playSolid from '@iconify/icons-la/play-solid';
import heartSolid from "@iconify/icons-la/heart-solid";
import commentsSolid from "@iconify/icons-la/comments-solid";
import shareAltSquareSolid from "@iconify/icons-la/share-alt-square-solid";
import baselineShare from "@iconify/icons-ic/baseline-share";

export default function WallCard({ tags, title, video, gif, file }) {
  // Sample file retrieval logic

  // const [images, setImages] = useState([]);
  // const [files, setFiles] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [term, setTerm] = useState('');
  //
  // useEffect(() => {
  //   if (file) {
  //     setFiles(...file.file)
  //   } else {
  //     setFiles(`https://source.unsplash.com/random`)
  //   }
  // }, []);

  //  Parent css removed: h-auto max-w-screen-sm

  return (
    <div className="relative w-screen h-screen snap-center always-stop rounded shadow-xl z-0">
      <Link href="/post/[slug]" as={"/post/" + file.id}>
        <div className="rounded shadow-lg h-full mx-auto w-auto max-w-md cursor-pointer">
          <img className="h-full w-full object-cover" src={gif} />
          <div className="absolute bottom-0 mx-6 mb-24">
            <div className="break-words font-extrabold text-5xl mb-2 p-2 text-white mx-auto w-auto max-w-md">{title}</div>
            <div className="flex py-4">
              <button className="flex bg-white hover:bg-gray-300 text-black font-medium tracking-wide py-2 px-4 w-48 rounded-lg mr-2 items-center">
                <Icon className="m-1" icon={playSolid} color="black" /> Tier 2 Members
              </button>
            </div>
            {/*<div className="inline-block bg-gray-200 bg-opacity-50 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2">
              Tags: {tags}
  </div>*/}

          </div>
        </div>
      </Link>
    </div>
  );
}

// <Icon icon={commentsSolid} height="3em" className="text-white" />
// <Icon icon={baselineShare} height="3em" className="text-blue-600" />

/*
<div className="absolute bottom-0 right-0 space-y-8 mx-6 my-8">
          <Icon
            icon={heartSolid}
            height="3em"
            className="text-red-700 animate-pulse"
          />
        </div>
*/
