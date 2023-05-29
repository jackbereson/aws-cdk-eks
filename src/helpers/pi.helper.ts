import Axios from "axios";

// const host = `https://api.testnet.minepi.com`;
const host = `https://api.mainnet.minepi.com`;

export class PiHelper {
  getAccount(piWallet: string) {
    return Axios.get(`${host}/accounts/${piWallet.toUpperCase()}`);
  }

  getTransactionByAccount(piWallet: string, limit = 10, order="desc") {
    return Axios.get(`${host}/accounts/${piWallet.toUpperCase()}/payments?limit=${limit}&order=${order}`);
  }
}

// (async () => {
//   console.log("start Pi hepler ..........................");
//   const helper = new PiHelper();
//   const res = await helper.getTransactionByAccount(
//     "GDKKYQBFSU5WXNRB5GF5YE2ST4V7BQWMNKCQCHLFFYBNFBLU7ZWWYBEX"
//   );
//   console.log("wallet", res.data._embedded.records);
// })();
