import dotenv from "dotenv";
import { dbInit,serverInit } from "./src/index.js";
import { Client, GatewayIntentBits } from "discord.js";
import { messageCreateHandler, readyHandler } from "./src/actions/index.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

serverInit();
const db = dbInit();

client.on("ready", () => {
  client.channels.cache.find(channel => channel.name === process.env.channelName).send(`hey @everyone im online! type help to see the commands!`)
  
  readyHandler(db, client);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (msg.channel.name !== process.env.channelName) return
  if (msg.author.bot) return;

  messageCreateHandler(msg, db);
});

client.login(process.env.TOKEN);
