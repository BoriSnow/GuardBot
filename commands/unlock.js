exports.run = (client, message, args) => {

  if (message.member.roles.cache.has('803145290226860113') || message.member.roles.cache.has('803142041105072139')){ //Owner, Admin
    message.channel.overwritePermissions([
      {
        id: '803146571612160040',
        allow: ['SEND_MESSAGES'],
      }
    ])
    message.channel.send("Channel unlocked.");
    return;
  }

  else {
    message.reply("Invalid permissions!");
    return;
  }
}
