module.exports = {
  name: "server",
  description: "Information of server",
  execute(msg, args) {
    msg.reply(
      `This server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`
    );
  }
};
