export const isCurrentDateTimeClose = (givenDateString) => {  
  // Create a Date object for the current date in Berlin's timezone
  const currentDate = new Date();
  currentDate.toLocaleString("en-DE", { timeZone: "Europe/Berlin" });
    
  // Split the given date string into its components
  const givenDateParts = givenDateString.split(/[\s/,:]+/);
  
  // Create a Date object for the given date in Berlin's timezone
  const givenDate = new Date(
    parseInt(givenDateParts[2]),
    parseInt(givenDateParts[1]) - 1, // Month is 0-based in JavaScript
    parseInt(givenDateParts[0]),
    parseInt(givenDateParts[3]),
    parseInt(givenDateParts[4])
  );
  givenDate.toLocaleString("en-DE", { timeZone: "Europe/Berlin" });

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = givenDate - currentDate;

  return timeDifferenceMs;
};
