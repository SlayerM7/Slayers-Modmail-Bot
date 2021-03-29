const { MessageEmbed } = require('discord.js')
const { mainGuild, staffRole } = require('../index')
const {channels} = require('../utils/models/channels')
const moment = require('moment')
const {chs} = require('../utils/models/channelStaff')
module.exports = async(client, message, args) => {
  const msg = message.content
  const server = client.guilds.cache.get(mainGuild);

  const m = await server.members.fetch(message.author.id)

  server.channels.create(`${message.author.username}`, {
    permissionOverwrites: [
      {
        id: mainGuild,
        deny: ['VIEW_CHANNEL']
      },
      {
        id: staffRole,
        allow: ['SEND_MESSAGES', "VIEW_CHANNEL"]
      }
    ]
  }).then((channel) => {
    const newThread = new MessageEmbed()
    .setColor("BLUE")
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`A new thread has been created by **${message.author.username}** \n Users account was made **${moment(message.author.createdAt).fromNow()}**\nThey joined the server **${moment(m.joinedAt).fromNow()}**`)
    channel.send(newThread)
    message.channel.send(
      new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription("New modmail thread created. Please wait for our moderator team to process it.")
    )
    channels.set(message.author.id, channel.id)
    chs.set(channel.id, message.author.id)
  })

}
