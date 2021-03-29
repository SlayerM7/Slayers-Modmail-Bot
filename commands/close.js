const {staffRole} = require('../index')
const {chs} = require('../utils/models/channelStaff')
const {channels} = require('../utils/models/channels')

module.exports = async(client, message, args) => {
  if (!message.member.roles.cache.has(staffRole)) return;
  if (!chs.has(message.channel.id)) return;
  const userID = chs.get(message.channel.id)
  chs.delete(message.channel.id)
  channels.delete(userID)
  let x = await client.users.fetch(userID)

  x.send('Your ticket has been closed!')
  message.channel.delete();
}
