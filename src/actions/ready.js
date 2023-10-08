import { isCurrentDateTimeClose } from "../index.js";
import { appointmentsGet, appointmentDelete } from "./index.js";

const appointmentData = {}; // Initialize an object to store appointment data
const interval = parseInt(10) * 1000 + 1;

export const readyHandler = (db, client) => {
  const channelName = process.env.channelName;
  const messageToUsers = process.env.messageToUsers;
  const longTimer = parseInt(process.env.longTimer) * 1000 * 60;
  const shortTimer = parseInt(process.env.shortTimer) * 1000 * 60;

  setInterval(async () => {
    console.log(appointmentData);

    const data = await appointmentsGet(db, client);

    for (const appointment of data) {
      const timeDiff = isCurrentDateTimeClose(appointment.date);

      if (timeDiff < 0) {
        appointmentDelete(db, appointment);
        delete appointmentData[appointment.date];
      }

      const notifiedType = appointmentData[appointment.date]?.notified;
      const shouldNotifyLong =
        timeDiff < longTimer &&
        timeDiff > shortTimer &&
        notifiedType !== "long";
      const shouldNotifyShort =
        timeDiff < shortTimer && timeDiff > 0 && notifiedType !== "short";
      console.log("timediff:" + timeDiff);
      console.log(shortTimer);
      if (shouldNotifyLong || shouldNotifyShort) {
        console.log(shouldNotifyLong ? "long timer" : "short timer");
        client.channels.cache
          .find((channel) => channel.name === channelName)
          .send(
            `${messageToUsers}${appointment.appointment}, ${appointment.date}`
          );

        appointmentData[appointment.date] = {
          notified: shouldNotifyLong ? "long" : "short",
        };
      }
    }
  }, interval);
};
