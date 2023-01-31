module.exports = (client, message) => {
  if (message.author.bot) return;
  let channel = message.channel.id;

  if (message.guild) {

    if (message.content.indexOf(client.config.prefix) == 0) { //If the message begins with a prefix, i.e is a command
      const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      if (command == "level" || command == "addpoints" || command == "delpoints") return;
      if (command == "prune" || command == "lock" || command == "unlock" || command == "kick") { //These are commands that can be run in any channel
        const cmd = client.commands.get(command);
        cmd.run(client, message, args);
        return;
      }
      else if (channel == "819698049936392222"){ //This is the gatekeeper channel
        if(command === "agree"){
          message.member.roles.add(['803146571612160040']);
          return;
        }
        else {
          message.delete();
          message.reply("Do not use commands in this channel.")
          .then(message => {
            message.delete({timeout:5000});
          })
          return;
        }
      }
      else if (channel == "818196381469900860") //This is the bot channel
      {
          const cmd = client.commands.get(command);
          if (!cmd) {
            message.reply(`That command does not exist!`);
            return;
          }
          else{
          cmd.run(client, message, args);
        }
      }
      else { //if a user tries to run a normal command outside of the bot channel
        if(command.includes("?")) return;
        else{
        message.delete();
        message.reply(`Please use <#818196381469900860> for bot commands!`)
        .then(message => {
          message.delete({timeout:5000});
        })
      };
      }
        return;
      }

    else {
      if(channel == "819698049936392222") //if a user tries to speak normally in the agreement channel
      {
        message.delete();
        message.reply ("Please do not use this channel for conversation.")
        .then(message => {
          message.delete({timeout:5000});
        })
        return;
        }
        else if (channel == "820072948852326420"){ //any message sent in the suggestions channel
          message.react('👍')
          .then(e => {
            message.react('👎');
          });
        }

        //Chat Filter Time!
        //Illegal Worlds Filter
        const logChannel = message.guild.channels.cache.find(channel => channel.name === "automod_logs");
        let words = message.content.toLowerCase();
        const blacklist = ["nigger", "faggot", "fag", "loli", "nigga", "kys", "nudes", "nazi"];
        for( l = 0; l < blacklist.length; l++){
        if(words.includes(blacklist[l])){
          message.delete();
          message.reply("You have spoken **Forbidden Words**!!").then(message => {
            message.delete({timeout:10000});
          })
          logChannel.send({embed: {
            colour: 1108154,
            author: {
              name: message.member.displayName,
              icon_url: message.author.avatarURL()
            },
            description: `${message.member.displayName} has spoken the **bad** word __${blacklist[l]}__!\nTheir message was:\"${message.content}\"`
          }});
        }
        else if (words.includes("kill") && words.includes("yourself")){
          message.delete();
          message.reply("Please do not say that").then(message => {
            message.delete({timeout: 5000});
          })
          logChannel.send({embed: {
            colour: 1108154,
            author: {
              name: message.member.displayName,
              icon_url: message.author.avatarURL()
            },
            description: `${message.member.displayName} has spoken the forbidden phrase __kill yourself__!\nTheir message was:\"${message.content}\"`
          }});
          return;
        }
        else if (words.includes("among") && words.includes("us")){
          message.delete();
          message.reply("i swear to god i am at my fuckfing limit if you continue talking about AMOGUS i will actuall delete server!!");
          logChannel.send({embed: {
            colour: 1108154,
            author: {
              name: message.member.displayName,
              icon_url: message.author.avatarURL()
            },
            description: `${message.member.displayName} has spoken the forbidden phrase __among us__!\nTheir message was:\"${message.content}\"`
          }});
          return;
        }
      }
        //Illegal Words Filter
        //Caps Filter (more than 80%)
        let caps_ratio = 0
        let non_caps;
        const symbols = ['.', ',', '\'', '\"', '[', ']', '(', ')', '{', '}', '!', '?', '^'];
        if (message.content.length < 5) return;
        for (i = 0; i < message.content.length; i++){ //scans through the entire message
          for( x = 0; x < symbols.length; x++){//checks if the character exists
            if(message.content.includes(symbols[x])) caps_ratio--;
          }
          if(message.content[i].toUpperCase() == message.content[i]) caps_ratio++;
          else non_caps++;
        }
        caps_ratio = (caps_ratio / message.content.length) * 100;
        if (caps_ratio >= 80 && !message.member.roles.cache.has('813974279330725922')) {
          if(!message.member.roles.cache.has('818208393625731105')){
            message.delete();
            logChannel.send({embed: {
              colour: 1108154,
              author: {
                name: message.member.displayName,
                icon_url: message.author.avatarURL()
              },
              description: `${message.member.displayName}\s' message \"${message.content}\" had more than 80% capitals!`
            }});
          }
        else return;
        }
        //Caps Filter (more than 80%)
        //Link Filter
        if (message.content.includes('discord.gg/')||message.content.includes('discordapp.com/invite/')) {
          message.delete();
          message.reply("No advertising in this channel!").then(message => {
            message.delete({timeout:5000});
          })
          return;
        }
        //Link Filter
        //Chat Filter End!
    }
  }

  else return;

};
