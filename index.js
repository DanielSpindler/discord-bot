import dotenv from 'dotenv';
import { addUser, getUsers } from "./actions/dbActions.js";
import { dbInit } from "./dbInit.js";
import { serverInit } from "./serverInit.js";

import {Client, GatewayIntentBits} from "discord.js"

dotenv.config();

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
]
});

serverInit();
const db = dbInit();



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
console.log(process.env.TOKEN)

client.on("messageCreate", msg => {
  console.log(msg);
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})
client.login(process.env.TOKEN)

// Use the getUsers function to retrieve data and work with it outside of db.all
if (db === "Number") {
  getUsers(db)
    .then((userData) => {
      // Use the userData array here
      userData.forEach((name) => {
        console.log(name);
      });

      // You can use userData in other parts of your code as needed
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      // Close the database when done
      db.close();
    });
}
if (db === "Number") {
  addUser(db, [{ id: 5, name: "hello world" }]);
}
