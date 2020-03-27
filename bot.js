const fs = require("fs");
const Discord = require("discord.js");

require("dotenv").config();
const token = process.env.token;
const prefix = process.env.prefix;

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === `ping`) {
    client.commands.get("ping").execute(msg, args);
  } else if (command === `server`) {
    client.commands.get("server").execute(msg, args);
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
