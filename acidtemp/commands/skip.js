const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    try {
      const song = await queue.skip()
      message.channel.send({embeds: [new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`)
      ]})
    } catch (e) {
      message.channel.send({embeds: [new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${client.emotes.error} | ${e}`)
      ]})
    }
  }
}
