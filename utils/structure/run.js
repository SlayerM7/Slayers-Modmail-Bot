const {prefix} = require('../../index')
const { commands } = require('../models/commands')

module.exports = (client, message, args, command) => {
  console.log('run file registerd')
  if (!message.content.startsWith(prefix)) return


  console.log(`Command is: ${command}`)
  const cmd = commands.get(command);

  console.log(cmd)
  console.log(commands)

  let neededPerms = [];

  if (cmd.permissions) {
    cmd.permissions.forEach((permission) => {
      neededPerms.push(`\`${permission}\``)
    })
  }

  if (neededPerms.length) {
    message.channel.send(`You need ${neededPerms.join(", ")} permissions to use that command`);
    return;
  }

  if (cmd.cooldown)

  function stopCooldown() {
    let output = false
    if (cooldown[message.guild.id]) {
      if (cooldown[message.guild.id][message.author.id]) {
        if (cooldown[message.guild.id][message.author.id][command]) {
        output = true;
      }
      }
    }
    return output;
  }

  if (stopCooldown === true) return message.reply('You are on cooldown')

  command.run(client, message, args);

  if (!cooldown[message.guild.id]) cooldown[message.guild.id] = {}

  if (!cooldown[message.guild.id][message.author.id]) cooldown[message.guild.id][message.author.id] = {}

  cooldown[message.guild.id][message.author.id][command] = Math.floor(Math.random() * 100000)

}
