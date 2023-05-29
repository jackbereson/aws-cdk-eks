import TelegramBot from "node-telegram-bot-api";

export class TelegramChatBotHelper {
  public token: string;
  public chatId: string;
  public bot: TelegramBot;

  constructor() {
    const token = "1791170849:AAHujHy5i7vt9urRGiUXZeGS7B4aARMWr20";
    this.chatId = "833607734";
    this.bot = new TelegramBot(token, { polling: false });
  }

  sendReply = (message: string) => {
    this.bot.on("message", function (msg) {
      const chatId = msg.chat.id;
      console.log("chatId", chatId);
      this.bot.sendMessage(chatId, message);
    });
  };

  sendMessage = (message: string) => {
    console.log("message", message);
    this.bot.startPolling();
    this.bot.sendMessage(this.chatId, message);
    this.bot.stopPolling();
  };
}

// (async () => {
//   console.log('start telegram ..........................');
//   //833607734
// })();
