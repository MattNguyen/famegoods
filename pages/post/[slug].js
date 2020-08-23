import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SortBy from "../../components/SortBy";
import Head from "next/head";
import useScript from "react-script-hook";
import { useRouter } from "next/router";
import { Icon, InlineIcon } from "@iconify/react";
import dollarSignSolid from "@iconify/icons-la/dollar-sign-solid";
import redoAltSolid from "@iconify/icons-la/redo-alt-solid";
import heartSolid from "@iconify/icons-la/heart-solid";
import commentsSolid from "@iconify/icons-la/comments-solid";
import shareAltSquareSolid from "@iconify/icons-la/share-alt-square-solid";
import angleRightSolid from "@iconify/icons-la/angle-right-solid";
import timesCircle from "@iconify/icons-la/times-circle";
import timesSolid from "@iconify/icons-la/times-solid";
import storeSolid from "@iconify/icons-la/store-solid";
import windowClose from "@iconify/icons-la/window-close";
import baselineShare from "@iconify/icons-ic/baseline-share";
import * as Server from "../../utils/CTS3";
import ProfileHeader from "../../components/profileHeader";
import * as UserData from "../../utils/UserData";
import * as Roll from "../../utils/Roll";
import RollLogin from "../../components/RollLogin";

import { useOvermind } from "../../stores/Overmind";

const init = {
  feed: [{ file: "small", refresh: 0 }],
  unlocked: false,
};

// @inject('store')
export default function Slug() {
  const [state, setState] = useState(init);
  const [videoObj, setVideo] = useState({});

  const router = useRouter();
  const slug = router.query.slug;

  const videoRef = useRef();

  // Overmind
  const { state: ostate, actions } = useOvermind();

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

  useEffect(
    (x) => {
      if (!state.data) return;
      if (videoObj.title) return;

      async function run() {
        const addr = state.data.address;

        const box = await UserData.forUser(addr);
        // console.log("file.id", file.id);

        box.getVideo(state.data.id).then((x) => {
          // console.log("video", x);
          if (x) setVideo(x);
        });
      }
      run();
    },
    [slug, state, state.file]
  );

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
      console.log("Server.getVideo", o);
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

  useEffect(() => {
    if (ostate.user.balances.length === 0) actions.refreshUser();
  }, [ostate.user.isAuthenticated, ostate.user.balances, ostate.user]);

  let hasEnough = false;
  let balance = 0;
  if (ostate.user.balances.length > 0 && videoObj.tokenName) {
    const tokenBalance = Roll.getBalanceObject(
      ostate.user.balances,
      videoObj.tokenName
    );

    if (tokenBalance) {
      balance = tokenBalance.decAmount;
      hasEnough = Roll.hasEnough(
        ostate.user.balances,
        videoObj.tokenName,
        videoObj.tokens
      );
    }
  }

  return (
    <>
      <Head>
        <title>Player</title>
        <link
          href="https://vjs.zencdn.net/7.8.4/video-js.css"
          rel="stylesheet"
        />
      </Head>

      <div className="h-screen w-screen">
        <div className="flex h-full justify-center w-screen pb-16">
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

          {!ostate.user.isAuthenticated && state.file && (
            <>
              <div className="absolute top-0 right-0 mt-4 mr-4">
                <Link href="/">
                  <Icon icon={timesSolid} className="h-8 w-8 text-gray-700" />
                </Link>
              </div>
              <RollLogin />
            </>
          )}

          {ostate.user.isAuthenticated && state.file && hasEnough && (
            <div onClick={unlock}>
              <div className="bg-black bg-opacity-100">
                <img
                  src={state.data.gif}
                  className="h-screen w-screen object-cover"
                />
              </div>
              <div className="absolute top-0 left-0 w-screen h-screen">
                <div className="flex ml-4 mt-6">
                  <ProfileHeader />
                  <Link href="../">
                    <div>
                      <Icon
                        className="fixed top-0 right-0 w-12 h-12 ml-4 mt-6 mr-6"
                        icon={timesCircle}
                        color="white"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              {/*<div className="fixed top-0 right-0 w-screen h-screen">
                  <div className="ml-4 mt-6">
                    <Icon className="top-0 right-0 w-12 h-12" icon={timesCircle} color="white" />
                  </div>
          </div>*/}
              <div className="w-full fixed bottom-0">
                <div className="w-full ml-8 text-white mb-4 font-bold break-words text-4xl text-opacity-100">
                  {videoObj.title}
                </div>
                <button className="mr-6 mb-20 text-white font-bold text-3xl rounded shadow content-center uppercase shadow focus:shadow-outline focus:outline-none tracking-wide py-1 px-auto rounded-lg items-center button-gradient transition duration-500 ease-in-out hover:bg-indigo-400 ">
                  <style jsx>
                    {`
                      .button-gradient {
                        background: linear-gradient(
                          90deg,
                          #3bdeff 0%,
                          #635bff 100%
                        );
                        box-shadow: 0px 2px 10px rgba(11, 3, 32, 0.05);
                        width: 90%;
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                      }
                    `}
                  </style>
                  <div className="w-full content-center">Watch Now</div>
                  <div className="font-medium text-sm tracking-wide">
                    Must Hold: {videoObj.tokens} {videoObj.tokenName}
                  </div>
                  <div className="font-medium text-sm tracking-wide">
                    Current Balance: {balance} TING
                  </div>
                </button>
              </div>
            </div>
          )}

          {ostate.user.isAuthenticated && state.file && !hasEnough && (
            <div>
              <a href="https://exchange.tryroll.com/#/swap" target="_blank">
                <div className="bg-black bg-opacity-100">
                  <img
                    src={state.data.gif}
                    className="h-screen w-screen object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 w-screen h-screen">
                  <div className="flex ml-4 mt-6">
                    <ProfileHeader />
                    <Link href="../">
                      <div>
                        <Icon
                          className="fixed top-0 right-0 w-12 h-12 ml-4 mt-6 mr-6"
                          icon={timesCircle}
                          color="white"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                {/*<div className="fixed top-0 right-0 w-screen h-screen">
                    <div className="ml-4 mt-6">
                      <Icon className="top-0 right-0 w-12 h-12" icon={timesCircle} color="white" />
                    </div>
            </div>*/}
                <div className="w-full fixed bottom-0">
                  <div className="w-full ml-8 text-white mb-4 font-bold break-words text-4xl text-opacity-100">
                    {videoObj.title}
                  </div>
                  <button className="mr-6 mb-20 text-white font-bold text-3xl rounded shadow content-center uppercase shadow focus:shadow-outline focus:outline-none tracking-wide py-1 px-auto rounded-lg items-center button-gradient transition duration-500 ease-in-out hover:bg-indigo-400 ">
                    <style jsx>
                      {`
                        .button-gradient {
                          background: linear-gradient(
                            90deg,
                            #3bdeff 0%,
                            #635bff 100%
                          );
                          box-shadow: 0px 2px 10px rgba(11, 3, 32, 0.05);
                          width: 90%;
                          display: block;
                          margin-left: auto;
                          margin-right: auto;
                        }
                      `}
                    </style>
                    <div className="w-full content-center">
                      Not Enough Tokens
                    </div>
                    <div className="font-medium text-sm tracking-wide">
                      Must Hold: {videoObj.tokens} {videoObj.tokenName}
                    </div>
                    <div className="font-medium text-sm tracking-wide">
                      Current Balance: {balance} TING
                    </div>
                    <div className="font-medium text-base tracking-wide mt-1 underline">
                      Click to Buy More!
                    </div>
                  </button>
                </div>
              </a>
            </div>
          )}

          {state.unlocked && state.file && (
            <div className="h-screen w-screen object-cover">
              <div className="absolute bottom-0 right-0 space-y-8 mb-32 mr-4">
                <Icon
                  icon={heartSolid}
                  height="2em"
                  className="animate-pulse text-red-700 cursor-pointer"
                />

                <Icon
                  icon={baselineShare}
                  height="2em"
                  className="text-blue-600 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
