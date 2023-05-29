// Discord.js versions ^13.0 require us to explicitly define client intents
import { Client, Intents, Message } from "discord.js";
import moment from "moment-timezone";
// import { Whitelist, WhitelistModel } from "../graphql/modules/whitelist/whitelist.model";

const runBot = () => {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
  });

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.login(process.env.DISCORDJS_BOT_TOKEN);

  // client.on("messageCreate", (msg) => {
  //   msg.partial;
  //   // You can view the msg object here with console.log(msg)
  //   console.log("msg", msg.content);
  //   if (msg.content === "Hello") {
  //     msg.reply(`Hello ${msg.author.username}`);
  //   }
  // });

  client.on("messageCreate", async (message) => {
    // if (message.content === "savelist") {
    //   const { CHANNEL_PIZZA, CHANNEL_SEED } = process.env;
    //   const messages = await message.channel.messages.fetch();
    //   const msgContentList = messages.map((msg) => msg.content.toLowerCase().trim());
    //   const existedWhitelists = await WhitelistModel.find({
    //     address: {
    //       $in: msgContentList,
    //     },
    //   });
    //   console.log("existedWhitelists", existedWhitelists);
    //   const whitelists: Whitelist[] = messages.map((msg) => {
    //     if (!existedWhitelists.find((wl) => wl.address === msg.content.toLowerCase().trim())) {
    //       if (
    //         [CHANNEL_PIZZA, CHANNEL_SEED].includes(msg.channelId.toString()) &&
    //         !["savelist"].includes(msg.content.toLowerCase().trim())
    //       ) {
    //         return {
    //           address: msg.content.toLowerCase().trim(),
    //           username: msg.author.username,
    //           role: msg.channelId === CHANNEL_PIZZA ? Roles.PIZZA : Roles.SEED,
    //         };
    //       }
    //       return null;
    //     }
    //     return null;
    //   });
    //   const filteredWL = await whitelists.filter((wl) => wl);
    //   // console.log("filteredWL", filteredWL);
    //   if (filteredWL.length > 0) {
    //     await WhitelistModel.insertMany(filteredWL);
    //   }
    // }
  });
};

// (async () => {
//   runBot();
// })();

//https://discord.com/api/oauth2/authorize?client_id=994890372406857780&permissions=17179944960&scope=bot
