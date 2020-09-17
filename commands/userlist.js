const { Guild, Client } = require("discord.js");

module.exports = {
  name: "userlist",
  description: "Get all the user ids",

  execute(msg, args) {
    let userData = [];
    let user = {};
    console.log(client.guilds.get("id"));
  },
};
