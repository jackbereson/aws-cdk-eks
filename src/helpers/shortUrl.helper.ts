import { BitlyClient } from "bitly-react";
const bitly = new BitlyClient("7ea47901f52f7ee4c2fab6c3a48e592b986d0891", {});

export const createShortUrl = async (url: string) => {
  return await bitly.shorten(url);
};
