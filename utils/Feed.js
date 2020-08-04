import { useState, useEffect } from "react";
import useAddress from "./Address";
import { getVideo } from "./CTS3";
import Box from "3box";
import { ethers } from "ethers";
const shortid = require("shortid");

export function test() {
  return { test: "hello" };
}

const SPACE_APP = "DFAME"; // "fame"
const address = useAddress()
const provider = ethers.getDefaultProvider()

export function getNewVideos() {
  const s = Box.getSpace(
    "0xffaDc07f1BFb127F4312e8652fE94aB0c771b54D",
    SPACE_APP
  );

  return s.public.all().videos || [];
}

// const box = await Box.create(window.ethereum);

export async function useSaveData(video) {
  const [box, setBox] = useState()

  useEffect(() => {
    Box.create().then(box => {
      window.box = box
      setBox(box)
      bauth.disabled = false
      openThread.disabled = false
    })
  }, [])

  console.log(box)

  await box.auth(SPACE_APP, { address, provider })
  await box.syncDone

  await box.public.set(video)

  const id = (shortid.generate()).toString()
  const videoFile = video.title.concat(id)

  await box.public.set(id, videoFile)

}

export function useGetData(id, userAddress) {
  const [space, setSpace] = useState()
  const [videoData, setVideoData] = useState({})

    useEffect(() => {
      const newSpace = Box.getSpace(userAddress, SPACE_APP)
      setSpace(newSpace)
      setVideoData(getVideo(id))
    }, [])

    return videoData
}

export function useGetAllData(id, userAddress) {
  const [space, setSpace] = useState()
  const [videoData, setVideoData] = useState({})

    useEffect(() => {
      const newSpace = Box.getSpace(userAddress, SPACE_APP)
      setSpace(newSpace)
      setVideoData(getVideo(id))
    }, [])

    return space.public.all
}

export class Feed {
  constructor(box) {
    this.box = box;
  }

  async init() {
    this.box.openSpace(SPACE_APP);
    this.space = await this.box.openSpace(SPACE_APP);
    return this.space;
  }

  async save() {
    await this.space.public.set("hello", "world");

    const d = await this.space.public.get("hello");
    console.log("data get:", d);
  }
}
