import { addAppointment, appointmentDelete } from "./index.js";

export const messageCreateHandler = async (msg, db) => {
  if (msg.content === "help") {
    msg.reply(`To create a new Appointment ( dont type the Brackets) \n
    add [AppointmentName] [DD/MM/YYYY] [HH:MM] \n
    del [AppointmentName] [DD/MM/YYYY] [HH:MM] \n
    `);
  }

  if (
    msg.content.startsWith("add") &&
    !msg.content.includes("help") &&
    msg.content.replace("add", "").trim().length > 5
  ) {
    addAppointment(db, msg);
  }

  if (
    msg.content.startsWith("del") &&
    !msg.content.includes("help") &&
    msg.content.replace("del", "").trim().length > 5
  ) {
    appointmentDelete(db, msg);
  }
};
