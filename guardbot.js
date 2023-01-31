const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

client.config = config;

client.on("ready", () => {
  console.log("Bot time!");
});

client.on('guildMemberAdd', member => {
  let memberUsername = member.user.username.toLowerCase();
  if (memberUsername.includes("twitter.com/h0nde")) {
    const logChannel = message.guild.channels.cache.find(channel => channel.name === "automod_logs");
    member.ban();
    logChannel.send({embed: {
      colour: 1108154,
      author: {
        name: member.user.username,
        icon_url: member.avatarURL()
      },
      description: `${member.user.username} has been autobanned!"`
    }});
  }
  else return;
})

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
