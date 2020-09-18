const fs = require("fs");
const Discord = require("discord.js");
const mysql = require("mysql");

require("dotenv").config();
const token = process.env.token;
const prefix = process.env.prefix;
const sqlHost = process.env.host;
const sqlUser = process.env.user;
const sqlPassword = process.env.password;
const sqlDatabase = process.env.database;

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "member-log"
  );
  if (!channel) return;

  channel.send(`Welcome to the server, ${member}!`);
});

function generateXp() {
  let min = 20;
  let max = 30;

  return Math.floor(Math.random() * (max - min + 1) + min);
}

var con = mysql.createConnection({
  host: sqlHost,
  user: sqlUser,
  password: sqlPassword,
  database: sqlDatabase,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(" ");
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});

client.login(token);
