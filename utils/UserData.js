import Box from "3box";
import { ethers } from "ethers";
// const Box = require("3box");

export function test() {
  return { test: "hello" };
}

const SPACE_APP = "DFAME";
const defaultProvider = ethers.getDefaultProvider();

/*
export function getNewVideos(address) {
  const s = Box.getSpace(address, SPACE_APP);

  return s.public.all().videos || [];
}*/

// const box = await Box.create(window.ethereum);

export function getProfile(address) {
  return Box.getProfile(address);
}

let enabled = false;

export class DataStore {
  constructor(readOnly) {
    this.readOnly = readOnly;
    // this.box = box;
  }

  async init(address) {
    if (this.space) return;
    if (this.mutex) {
      console.log("waiting");
      await this.mutex;
      return;
    }
    console.log("opening", address);

    if (!enabled && !this.readOnly) {
      await window.ethereum?.enable();
      enabled = true;
    }

    this.mutex = new Promise(async (res) => {
      if (this.readOnly) {
        this.spaceData = await Box.getSpace(address, SPACE_APP);
        res();
        return;
      }

      const box = await Box.openBox(address, window.ethereum);
      // this.box = box;

      // this.box.openSpace(SPACE_APP);
      this.space = await box.openSpace(SPACE_APP);

      res();
    });

    await this.mutex;

    //addr[0]

    // return this.space;
  }

  async getVideo(id) {
    function applyDefaultVideo(obj) {
      obj.date = obj.date || new Date().getTime();
      obj.tokens = obj.tokens || 1;
      obj.tokenName = obj.tokenName || "TING";
      return obj;
    }

    if (this.spaceData) {
      return applyDefaultVideo(this.spaceData["v_" + id]);
    }

    return applyDefaultVideo(await this.space.public.get("v_" + id));
  }

  async getVideos(address) {
    if (this.spaceData) {
      const vs = this.spaceData["videos-list"] || [];
      return vs.map((key) => this.spaceData[key]);
    }

    const vs = (await this.space.public.get("videos-list")) || [];
    const ps = vs.map((x) => this.space.public.get("v_" + x));
    return await Promise.all(...ps);
  }

  async save(video) {
    if (!video || !video.id) throw new Error("null video");

    video.date = new Date().getTime();

    const videos = (await this.space.public.get("videos-list")) || [];
    videos.push(video.id);
    await this.space.public.set("videos-list", videos);

    await this.space.public.set("v_" + video.id, video);

    // const d = await this.space.public.get("hello");
    // console.log("data get:", d);
  }
}

export const global = new DataStore();

const stores = {};
export async function forUser(address) {
  const cached = stores[address];

  if (cached) {
    await cached.init(address);
    return cached;
  }

  const d = new DataStore(true);
  stores[address] = d;
  await d.init(address);

  return d;
}
