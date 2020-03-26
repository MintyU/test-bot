const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
const token = process.env.token;
const prefix = process.env.prefix;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === `ping`) {
    msg.reply("Pong!");
  } else if (command === `server`) {
    msg.reply(
      `This server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`
    );
  } else if (command === `avatar`) {
    if (!msg.mentions.users.size) {
      return msg.channel.send(
        `Your avatar: <${msg.author.displayAvatarURL({
          format: "png",
          dynamic: true
        })}>`
      );
    }
    const avatarList = msg.mentions.users.map(user => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({
        format: "png",
        dynamic: true
      })}>`;
    });
    msg.channel.send(avatarList);
  }
});

client.login(token);
