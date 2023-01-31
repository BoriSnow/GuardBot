exports.run = (client, message, args) => {

  if (message.member.roles.cache.has('803145290226860113') || message.member.roles.cache.has('803145342069243944') || message.member.roles.cache.has('803142041105072139')){

    if (isNaN(args)) {
      message.reply("Please enter a numerical value for the number of messages to prune!");
      return;
    }

    else {
      args = parseInt(args) + 1;
      message.channel.bulkDelete(args)
      message.reply("Successfully deleted " + args + " messages!")
      .then(message => {
        message.delete({timeout:5000});
      })
    }}

    else {
      message.reply("Invalid permissions!!")
      .then(message => {
        message.delete({timeout:5000});
      })
      return;
    }

}
