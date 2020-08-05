import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { inject, observer, useObserver } from "mobx-react";
import Clock from "../../components/Clock";
import SortBy from "../../components/SortBy";
import Head from "next/head";
import useScript from "react-script-hook";
import { useRouter } from "next/router";
import { Icon, InlineIcon } from "@iconify/react";
import heartSolid from "@iconify/icons-la/heart-solid";
import commentsSolid from "@iconify/icons-la/comments-solid";
import shareAltSquareSolid from "@iconify/icons-la/share-alt-square-solid";
import baselineShare from "@iconify/icons-ic/baseline-share";
import * as Server from "../../utils/CTS3";
import ProfileHeader from "./profileHeader";

const init = {
  feed: [{ file: "small", refresh: 0 }],
  unlocked: false,
};

// @inject('store')
function Wall() {
  const [state, setState] = useState(init);
  const router = useRouter();
  const slug = router.query.slug;

  const videoRef = useRef();

  function setup() {
    if (!window.videojs) return;
    if (state.setup) return;
    if (!videoRef.current) return;

    var player = window
      .videojs(videoRef.current, {
        autoplay: "any",
      })
      .ready(function () {
        // self.player = this;
        // self.player.on('play', self.handlePlay);
      });
    setState((x) => ({ ...x, setup: true }));
  }

  useScript({
    src: "https://vjs.zencdn.net/7.8.4/video.js",
    checkForExisting: true,
    onload: () => {
      setState((x) => ({ ...x, refresh: x.refresh + 1 }));
      setup();
    },
  });

  useEffect(() => {
    if (!slug) return;
    console.log("slug", slug);
    Server.getVideo(slug).then((o) => {
      console.log("o", o);
      setState((x) => ({ ...x, file: o.video, data: o }));
    });
  }, [slug]);

  useEffect(
    (x) => {
      setup();
    },
    [state, videoRef]
  );

  function unlock() {
    setState((x) => ({ ...x, unlocked: true }));
  }

  return useObserver(() => (
    <>
      <Head>
        <title>Player</title>
        <link
          href="https://vjs.zencdn.net/7.8.4/video-js.css"
          rel="stylesheet"
        />
      </Head>

      <div className="h-screen w-screen">
        <div className="flex h-full justify-center w-screen pb-12">
          {state.unlocked && (
            <div id="video" className="w-screen">
              {state.file && (
                <video
                  width="100%"
                  ref={videoRef}
                  className="h-full w-screen video-js vjs-default-skin vjs-big-play-centered"
                  controls
                  preload="auto"
                >
                  <source src={state.file} type="application/x-mpegURL" />
                </video>
              )}
            </div>
          )}

          {!state.unlocked && state.file && (
            <div onClick={unlock} className="cursor-pointer">
              <img src={state.data.gif} className="w-screen h-full" />
              <div className="absolute top-0 w-full text-center text-white font-bold">
                <h3 className="" style={{ fontSize: "3em" }}>
                  Join Laural's community!
                </h3>
                <h3 className="py-2" style={{ fontSize: "1.5em" }}>
                  click to purchase community access
                </h3>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                  3 $TINGLES
                </button>
              </div>
            </div>
          )}


          <div className="absolute top-0">
            <ProfileHeader />
          </div>
          <div className="absolute bottom-0">
            <div className="mb-20 ml-4">
              <div className="font-bold text-xl mb-2 text-white text-center">
                {state.data && state.data.title}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 space-y-8 mb-20 mr-4">
            <Icon
              icon={heartSolid}
              height="2em"
              className="text-red-700 cursor-pointer"
            />

            <Icon
              icon={baselineShare}
              height="2em"
              className="text-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  ));
}

export default Wall;

/*
<Icon icon={commentsSolid} height="3em" className="text-gray-600" />

<div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2">
                Tags:
              </div>
              */

// Original set up in previous iteration

// <div className="flex h-screen w-screen justify-center">
//   <div id="video" >
//     {state.file && (
//       <video
//         ref={videoRef}
//         id="my-video"
//         className="video-js h-screen"
//         controls
//         preload="auto"
//       >
//         <source src={state.file} type="application/x-mpegURL" />
//       </video>
//     )}
//   </div>
// </div>

// Text in previous iteration

// <div className="text-center">
//   <h1 className="block text-x1 font-bold text-center underline py-4">
//     CONGRATULATIONS!
//   </h1>
//   <h3 className="block text-x1 text-center font-semibold text-gray-800 pb-4">
//     You've Unlocked Exclusive Content Below!
//   </h3>
//   <h3 className="block text-x1 text-center font-semibold text-gray-800 pb-4">
//     Click Below to Claim.
//   </h3>
//
//   <button class="bg-transparent hover:bg-gray-400 text-gray-800 font-bold px-4 rounded inline-flex items-center">
//     <Icon icon={openPadlock} width="70" height="70" />
//     <span className="block">Press to Play</span>
//   </button>
// </div>
