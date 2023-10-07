import dotenv from "dotenv";
import { dbInit } from "./src/dbInit.js";
import { serverInit } from "./src/serverInit.js";
import { Client, GatewayIntentBits } from "discord.js";
import { messageCreateHandler } from "./src/actions/messageCreate.js";
import { readyHandler } from "./src/actions/ready.js";

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
  readyHandler();
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  messageCreateHandler(msg, db)
});

client.login(process.env.TOKEN);
