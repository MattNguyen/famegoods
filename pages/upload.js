import React, { useState, useRef, useEffect } from "react";
import Page from "../components/Page";
import { TextField, Slider, Typography, Button } from "@material-ui/core";
import { addVideo } from "../utils/CTS3";
import { Alert, AlertTitle } from "@material-ui/lab";
import Lottie from 'react-lottie';
// import { createGif } from "../utils/GifUtil";
// npm install --save-dev @iconify/react @iconify/icons-la
import { Icon, InlineIcon } from '@iconify/react';
import LoadingOverlay from "../components/LoadingOverlay";
import timesSolid from '@iconify/icons-la/times-solid';
import windowRestoreSolid from '@iconify/icons-la/window-restore-solid';
import windowRestore from '@iconify/icons-la/window-restore';
import Link from "next/link";
import SetTicket from "../components/upload/SetTicket";
import useAddress from "../utils/Address";
import { useOvermind } from "../stores/Overmind";

export default function Other() {
  const address = useAddress();

  const [state, setState] = useState({ progress: 0 });
  const [formdata, setFormData] = useState({ tokens: 1 });

  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    if (ostate.user.balances.length === 0) actions.refreshUser();
  }, [ostate.user.balances, ostate.user]);

  async function onSubmit() {
    const _files = hiddenFileInput.current; // document.getElementById("videoupload");
    if (!_files.files || _files.files.length === 0) {
      alert("Please add a video");
      return;
    }
    console.log(_files.files);

    const title = window.document.getElementById("videoTitle").value;
    // console.log("title", title);

    if (!title || title.length === 0) {
      alert("please add a title");
      return;
    }

    // const gif = await createGif(_files.files[0]);
    // console.log("gif finished", gif);
    // setState(gif);

    const onProgress = (p) => {
      setState((x) => ({ ...x, progress: p || 0 }));
    };

    try {
      setState((x) => ({ ...x, loading: true, progress: 0 }));

      const videoObj = {
        title: title,
        tokenSet: formdata.tokens,
        tokens: formdata.tokens["1"].amount,
        tokenName: formdata.tokens["1"].name,
      };

      // console.log("videoObj", videoObj);
      // return;
      addVideo(_files.files, address, videoObj, onProgress)
        .then((x) => {
          // if() setState((x) => ({ ...x, progress: 99 }));
          setTimeout((_) => {
            setState((x) => ({ ...x, loading: false }));
            alert(
              "Video uploaded! After processing completes in a few minutes it will be publically available."
            );
          }, 100);
        })
        .catch((e) => {
          throw new Error(e);
        });
    } catch (e) {
      //window.alert(e);
      setState((x) => ({ ...x, error: e.toString(), loading: false }));
      return;
    }
  }

  // These variables can't be referenced/identified by the functions being rendered below because they are trapped inside FileUploader's local scope. I broke them out just so the page would work, but this may not be optimal.

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // The structure of FileUploader breaks the rules of hooks and can result in the error referenced here: https://reactjs.org/warnings/invalid-hook-call-warning.html

  // TL;DR: The solution is to not include hooks like useRed inside event handlers. The #2 reason listed in the above mentioned documentation.

  // const FileUploader = props => {
  //   const hiddenFileInput = React.useRef(null);
  //
  //   const handleClick = event => {
  //     hiddenFileInput.current.click();
  //   };
  //
  // }

  function onFileChange() {
    const fileUploaded = hiddenFileInput.current.files;
    if (!fileUploaded || fileUploaded.length === 0) return;

    setState((x) => ({ ...x, uploadFilename: fileUploaded[0].name }));
  }

  function onTokenChange(tokens) {
    // console.log("onTokenChange", tokens);

    setFormData((x) => ({ ...x, tokens }));
  }

  if (!address) {
    return <div className="overflow-hidden">
      <div className="absolute top-0 right-0">
        <Link href="post/[slug]">
          <Icon icon={timesSolid} className="h-8 w-8 mt-4 mr-4" />
        </Link>
      </div>
      <h1 className="mt-32 tracking-wider text-center font-extrabold text-3xl text-gray-900 text-opacity-100">Authorize Metamask</h1>
      <p className="mt-4 text-gray-700 text-center tracking-wide text-normal ml-6 mr-6">Use the Metamask popup to allow access</p>
      <div className="flex flex-col items-center justify-center mt-10">
        <img src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
          alt="Metamask Logo"
          className="h-48 w-48" />
      </div>
    </div>;
  }

  return (
    <>
      {state.loading && (
        <LoadingOverlay open={state.loading} progress={state.progress} />
      )}
      <div className="h-screen flex justify-center align-middle">
        <figure className="flex-auto bg-white rounded-md m-2 p-4 max-w-md mx-auto">
          {state.error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {state.error}
            </Alert>
          )}
          {state.gif && <img src={state.gif} width="200" height="200" />}
          <div className="w-full h-full">
            <div className="my-2">
              <h1 className="ml-2 my-4 font-extrabold text-2xl text-gray-900 text-opacity-100 pb-2">
                <span alt="camera-emoji">📷</span> Upload Video
              </h1>

              <input
                className="sm:h-16 text-xl appearance-none border-2 rounded w-full py-2 px-3 placeholder-gray-400 font-extrabold leading-tight focus:outline-none focus:shadow-outline m-1"
                id="videoTitle"
                type="text"
                placeholder="Video Title"
              ></input>
            </div>

            <textarea
              style={{}}
              name="description"
              placeholder="Add a video description"
              cols="40"
              rows="5"
              className="hidden sm:h-48 my-2 appearance-none border-2 rounded w-full py-2 px-3 placeholder-gray-600 font-normal leading-tight focus:outline-none focus:shadow-outline m-1"
            ></textarea>

            <div>
              {/*<div className="upload-btn-wrapper">*/}
              <button
                onClick={handleClick}
                className="sm:h-16 my-1 bg-white hover:bg-gray-400 text-black font-semibold w-full py-2 px-4 border-2 border-gray-400 rounded m-1"
              >
                <i className="las la-photo-video"></i>
                <span>Choose a video</span>
                {state.uploadFilename && (
                  <>
                    <br />
                    {state.uploadFilename}
                  </>
                )}
              </button>
              <input
                ref={hiddenFileInput}
                style={{
                  display: "none",
                }}
                onChange={onFileChange}
                id="videoupload"
                type="file"
                name="myfile"
                accept="video/*;capture=camcorder"
              />
            </div>
            {/*</div>*/}

            {ostate.user.balances.length > 0 && (
              <SetTicket
                tokens={ostate.user.balances}
                onChange={onTokenChange}
              ></SetTicket>
            )}
            {ostate.user.balances.length === 0 && <p>Loading tokens...</p>}

            <div className="flex justify-start">
              <button
                onClick={onSubmit}
                className="flex-auto h-12 m-12 bg-black rounded-lg hover:bg-gray-700 text-white font-semibold w-full py-2 px-4 rounded shadow-lg m-1 sm:h-16"
              >
                Publish Video
              </button>
            </div>
          </div>
        </figure>
      </div>
      <style jsx>{`
        .upload-btn-wrapper {
          position: relative;
          overflow: hidden;
          display: inline-block;
          margin-right: 1rem;
        }

        .btn {
          border: 2px solid gray;
          color: gray;
          background-color: white;
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 20px;
          font-weight: bold;
        }

        .upload-btn-wrapper input[type="file"] {
          font-size: 100px;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
