const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    queue.resume()
    message.channel.send({embeds: [new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`Player Had been resumed ▶`)
    ]})
  }
}
