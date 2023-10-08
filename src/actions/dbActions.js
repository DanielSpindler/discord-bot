import { isCurrentDateTimeClose } from "../index.js";
import { msgMapper } from "../mapper/msgMapper.js";

export const appointmentsGet = async (db) => {
  try {
    return await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${process.env.tableName}`, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  } catch (err_1) {
    console.error(err_1);
  }
};

export const appointmentDelete = (db, data) => {
  const appointment = data.content ? msgMapper(data) : data;

  const query = `
  DELETE FROM ${process.env.tableName}
  WHERE appointment = ? AND date = ?
`;
  try {
    db.all(query, [appointment.appointment, appointment.date], (err) => {
      if (err) {
        console.error("Error deleting record:", err.message);
      } else {
        console.log("Record deleted successfully.");
      }
    });
  } catch (err_1) {
    console.error(err_1);
  }
};

export const addAppointment = async (db, msg) => {
  const mappedMsg = msgMapper(msg);
  const dateTimeRegex = /^(\d{2}\/\d{2}\/\d{4}) (\d{2}:\d{2})$/;

  const stmt = db.prepare(
    `INSERT INTO ${process.env.tableName} VALUES (?, ?, ?)`
  );

  if (isCurrentDateTimeClose(mappedMsg.date) < 0) {
    return msg.reply("Appointment in the past. Must be in the future!");
  }

  if (dateTimeRegex.test(mappedMsg.date)) {
    stmt.run(msg.author.id, mappedMsg.appointment, mappedMsg.date);
    await stmt.finalize();
    msg.reply("New Appointment Created!");
    return;
  } else {
    msg.reply("Wrong format.'DD/MM/YYYY HH:MM'");
  }
};
