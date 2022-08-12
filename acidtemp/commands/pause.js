const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    // if (queue.pause) {
    //   queue.resume()
    //   return message.channel.send('Resumed the song for you :)')
    // }
    queue.pause()
    message.channel.send({embeds: [new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`Player Had been paused ⏸`)
    ]})
  }
}
