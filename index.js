const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const token = process.env.token;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token);