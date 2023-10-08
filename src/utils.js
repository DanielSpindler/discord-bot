import { time } from "discord.js";

export const isCurrentDateTimeClose = (givenDateString) => {  
  const berlinTimezone = "Europe/Berlin";
  const currentDate = new Date().toLocaleString("en-DE", { timeZone: berlinTimezone });
    
  // Convert the given date string to a Date object in Berlin's timezone
  const givenDateParts = givenDateString.split(/[\s/,:]+/);
  const givenDate = new Date(
    parseInt(givenDateParts[2]),
    parseInt(givenDateParts[1]) - 1, // Month is 0-based in JavaScript
    parseInt(givenDateParts[0]),
    parseInt(givenDateParts[3]),
    parseInt(givenDateParts[4])
  ).toLocaleString("en-DE", { timeZone: berlinTimezone });


  const timeDifferenceMs = new Date(givenDate) - new Date(currentDate);

return timeDifferenceMs;
};
