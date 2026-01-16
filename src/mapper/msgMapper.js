export const msgMapper = (msgToMap) => {
    const msgArray = msgToMap.content.split(" ");
    console.log(msgToMap);
    if (msgArray[4]) {
      return msgToMap.reply(
        "Format not supported! Supported format: add SomeAppointmentName 09/10/2023 15:00"
      );
    }
  
    return {
      userId: msgToMap.author.userId,
      appointment: msgArray[1],
      date: msgArray[2] + " " + msgArray[3],
      channel: msgToMap.channelId,
    };
  };
