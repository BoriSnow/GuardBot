exports.run = (client, message, args) => {
  if (message.member.roles.cache.has('803142041105072139')) {

    if(!args || args.length < 1) return message.reply("Please specify which command to reload.");
    const commandName = args[0];

    if(!client.commands.has(commandName)) {
      return message.reply("This command does not exist!");
    }

    delete require.cache[require.resolve(`./${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`Command ${commandName} has been reloaded successfully!`)
  }

  else {
    message.reply("Invalid permissions!!")
    .then(message => {
      message.delete({timeout:5000});
    })
    return;
  }
  }
