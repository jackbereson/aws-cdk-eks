import Binance from "node-binance-api";

export class BinanceHelper {
  binance: any;
  constructor() {
    this.binance = new Binance().options({
      APIKEY: process.env.BINANCE_API_KEY,
      APISECRET: process.env.BINANCE_SECRET_KEY,
    });
  }

  async getPrice() {
    console.info(await this.binance.futuresPrices());
  }

  async getAccountDetail() {
    this.binance.mgAccount((error, response) => {
      if (error) return console.warn(error);
      console.info("Account details response:", response.data);
    });
  }
}

// (async () => {
//   console.log('start Binance ..........................');
//   const mymoney = new BinanceHelper();
//   await mymoney.getAccountDetail();
// })();
