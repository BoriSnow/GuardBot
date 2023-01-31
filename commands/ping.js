exports.run = (client, message, args) => {
  message.channel.send("Ping?")
  .then(message => {
    message.edit(`Pong! (took: ${Date.now() - message.createdTimestamp}ms)`);
  });
}
