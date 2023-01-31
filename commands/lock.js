exports.run = (client, message, args) => {
  let category = message.categoryChannel.id;
  //check for which channel the command is being used in
  if (
    category == "803142499274326026" || //Administration Category
    category == "803141265209688085") // Welcome Category
    {
      message.delete();
      message.reply("You can't **lock** this channel!").then(message => {
          message.delete({timeout:5000});
        })
        return;
    }
    else {
    if (
      message.member.roles.cache.has('803142041105072139') || //Owner
      message.member.roles.cache.has('803145290226860113') { //Admin
        message.channel.overwritePermissions([
            {
              id: '803146571612160040',
              deny: ['SEND_MESSAGES'],
            }
          ])
            message.channel.send("Channel locked.");
            return;
          }
    else {
      message.reply("Invalid permissions!");
      return;
    }
  }
}
