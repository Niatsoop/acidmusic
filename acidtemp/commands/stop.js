const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    queue.stop()
    message.channel.send({embeds: [new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`${client.emotes.success} | Stopped!`)
    ]})
    //message.channel.send(`${client.emotes.success} | Stopped!`)
  }
}
