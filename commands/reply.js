const {chs} = require('../utils/models/channelStaff')
const {channels} = require('../utils/models/channels')

module.exports = async(client, message, args) => {
  const {channel} = message;
  if (chs.has(channel.id)) {
    let us = chs.get(channel.id)
    let user = await client.users.fetch(us)
    user.send(`\`${message.author.username}\`: ` + args.join(" ")).then(() => {
      channel.send(`\`${message.author.username}\`: ${args.join(" ")}`)
    })
  }
}
