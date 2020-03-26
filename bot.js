const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const token = process.env.token;
const prefix = process.env.prefix;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!msg.content.startsWith(prefix)||msg.author.bot) return;
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (command === `ping`) {
    msg.reply('Pong!');
  } else if (command === `server`) {
    msg.reply(`This server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`)
  } 
});

client.login(token);