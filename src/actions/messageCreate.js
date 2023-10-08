import { addAppointment, appointmentDelete } from "./index.js";

export const messageCreateHandler = async (msg, db) => {
  const content = msg.content.trim();

  if (content === "!help") {
    msg.reply(`To create a new Appointment (don't type the Brackets):
    !add [AppointmentName] [DD/MM/YYYY] [HH:MM]
    !add [AppointmentName] [DD.MM.YYYY] [HH:MM]

    To delete an Appointment (don't type the Brackets):
    !del [AppointmentName] [DD/MM/YYYY] [HH:MM]
    !del [AppointmentName] [DD.MM.YYYY] [HH:MM]
    `);
  }

  // Define a regular expression to match "!add" or "!del" followed by the required format
  const addDelRegex = /^!(add|del) (.+?) (\d{2}[./]\d{2}[./]\d{4}) (\d{2}:\d{2})$/;
  const match = content.match(addDelRegex);

  if (match) {
    const [, command, /*appointmentName, dateStr, timeStr*/] = match;
    
    if (command === "add") {
      // Handle appointment creation
      addAppointment(db, msg);
    } else if (command === "del") {
      // Handle appointment deletion
      appointmentDelete(db, msg);
    }
  }
};
