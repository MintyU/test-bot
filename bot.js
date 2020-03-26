const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const token = process.env.token;
const prefix = process.env.prefix;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === `${prefix}ping`) {
    msg.reply('Pong!');
  }
});

client.login(token);