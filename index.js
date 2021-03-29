
const Discord = require('discord.js');
const client = new Discord.Client();
const {chs} = require('./utils/models/channelStaff')
const { channels } = require('./utils/models/channels')
const { users } = require('./utils/models/active')
const config = require('./config.json')
const { prefix, token, mainGuild, staffRole } = config

client.on('ready', () => {
  console.log('Bot ready!');
});

client.on('message', async(message) => {
  const { channel, content, author, guild } = message
  if (author.bot) return;
  const args = content.trim().split(/ +/)
  const cmd = args.shift().toLowerCase();

  if (users.has(author.id) && channel.type === 'dm') {
    require('./events/continue')(client, message, args);
  }

  if (message.channel.type === 'dm' && !users.has(author.id)) {
    require('./events/start')(client, message, args)
    users.add(author.id)
  }
      const cmxx = cmd.slice(prefix.length)

    if (cmxx === 'reply' || cmxx === 'r') {
      require('./commands/reply')(client , message, args);
    }

    if (cmxx === 'close') {
      require('./commands/close')(client, message, args)
    }
})

client.login(token);


module.exports = {
  mainGuild,
  prefix,
  staffRole

}
