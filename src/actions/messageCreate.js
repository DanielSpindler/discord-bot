import { addUser, getUsers } from "./dbActions.js";

export const messageCreateHandler = async (msg,db) => {
    if (msg.content.startsWith("add") && msg.content.includes("help")) {
        msg.reply("too add a ");
      }
    
      if (
        msg.content.startsWith("add") &&
        !msg.content.includes("help") &&
        msg.content.replace("add", "").trim().length > 5
      ) {
        console.log(msg.author.username);
        console.log(msg.content.replace("add", ""));
    
        await addUser(db, [
          { id: msg.author.username, name: msg.content.replace("add ", "").trim() },
        ]);
      }
    
      if (msg.content === "get") {
        await getUsers(db)
          .then((data) => {
            data.forEach((item) => {
              msg.reply(item);
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
};