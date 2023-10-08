import { isCurrentDateTimeClose } from "../index.js";
import { appointmentsGet, appointmentDelete } from "./index.js";
export const readyHandler = (db, client) => {
  setInterval(async () => {
    const data = await appointmentsGet(db, client);
    data.forEach(async (appointment) => {
      //const user = await client.users.fetch(appointment.userId);
      const timeDiff = isCurrentDateTimeClose(appointment.date);

      if (timeDiff < 0) {
        appointmentDelete(db, appointment);
      }
      if (timeDiff > 82800000 && timeDiff < 86400000) {
        client.channels.cache.find(channel => channel.name === process.env.channelName).send(process.env.messageToUsers+ (timeDiff/ 1000 / 60) / 60 + "Hours")
      }
      if (timeDiff < 3600000 && timeDiff > 0) {
        client.channels.cache.find(channel => channel.name === process.env.channelName).send(process.env.messageToUsers+ (timeDiff/ 1000 / 60 / 60) + "Hours")
      }
    });
  }, 3660);
};
