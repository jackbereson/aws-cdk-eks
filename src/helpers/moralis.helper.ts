import Moralis from "moralis/node";

const serverUrl = "https://yqb41np38x3j.usemoralis.com:2053/server";
const appId = "Vz4NCvQ7OCtpEfEMmbzJesqHa7iSfeoMnhTH1fcN";
const masterKey = "QTpvgE3551ojuObIDe6YTdUKQJvLIB8jy4FjCbmq";

class MoralisHelper {
  apikey = null;
  constructor() {}

  getNfts = async ({ address }) => {
    await Moralis.start({ serverUrl, appId, masterKey });

    const options: any = {
      address,
      chain: "mumbai",
    };
    const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
    return nftOwners;
  };
}

export const moralisHelper = new MoralisHelper();
