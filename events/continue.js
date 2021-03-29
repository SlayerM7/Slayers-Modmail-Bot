const {MessageEmbed} = require('discord.js')
const { mainGuild } = require('../index')
const { channels } = require('../utils/models/channels')
const {chs} = require('../utils/models/channelStaff')

module.exports = (client, message, args) => {
  const msg = message.content;
  const server = client.guilds.cache.get(mainGuild)

server.channels.cache.get(channels.get(message.author.id)).send(`\`${message.author.username}\`: ` + msg).then(() => {
    message.channel.send(
      new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription("The mod team has recieved your message")
      .setFooter(server.name, server.iconURL({dynamic: true}))
    );
  })
}
