exports.run = (client, message, args) => {
  const logChannel = message.guild.channels.cache.find(channel => channel.name === "action_logs");
  message.delete();
  if (
  message.member.roles.cache.has('803142041105072139') || //Owner
  message.member.roles.cache.has('803145290226860113') || //Admin
  message.member.roles.cache.has('803145342069243944')) { //Mod
    let user;
    user = message.guild.members.cache.get(args[0]);
    user.kick();
    message.channel.send(`${user.username} was successfully kicked!`)
    .then(message => {
      message.delete({timeout:10000});
        })
        .then(user => {
          logChannel.send({embed: {
            colour: 1108154,
            author: {
              name: message.member.displayName,
              icon_url: message.member.avatarURL()
            },
            description: `${user.username} was kicked by ${message.member.displayName}!`
          }});
        })
      .catch(error => {
        console.log(error);
        message.channel.send("Exception Occurred!")
        .then(message => {
          message.delete({timeout:10000});
        })
      })
  }

  else {
    message.reply("Invalid permissions!").then(message => {
      message.delete({timeout:5000});
    })
    return;
  }
}
