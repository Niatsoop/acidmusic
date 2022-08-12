const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    const autoplay = queue.toggleAutoplay()
    message.channel.send({embeds: [new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
    ]})
   // message.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
  }
}
